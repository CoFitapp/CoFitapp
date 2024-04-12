import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import { Dropdown } from 'react-native-element-dropdown'
import CheckBox from 'react-native-check-box'
import { CardField, useStripe, CardForm, presentPaymentSheet, createToken, initPaymentSheet ,createPaymentMethod} from '@stripe/stripe-react-native';
import { useEffect } from 'react'
import * as services from "../../constants/services";
import * as Url from "../../constants/url";
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window");

const AddCard = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [eventType, setEventType] = useState("");
  const [firstName, setFirstName] = useState("")
  const [cardNo, setCardNo] = useState("")
  const [loader,setLoader] = useState(false)
  const [lastName, setLastName] = useState("")
  const [phoneNo, setPhoneNo] = useState(null)
  const [email, setEmail] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [showCvv, setShowCvv] = useState(true)
  const [cardDetails, setCardDetails] = useState(null)
  const [expiry1, setExpiry1] = useState('')
  const [isCardDetailsCompleted,setIsCardDetailsCompleted]= useState(false)
  const countryArr = [
    { label: "United States", value: "United States" },
    { label: "India", value: "India" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Russia", value: "Russia" },
    { label: "Mexico", value: "Mexico" },
  ];

  // useEffect(()=>{
  //  initPaymentSheet1();
  // },[])

  // const initPaymentSheet1=async()=>{
  //   const { error,paymentOption } = await initPaymentSheet({
  //     merchantDisplayName: "Example, Inc.",
  //     customerId: "cus_PdymhgdRm6TpzI",
  //     // customerEphemeralKeySecret: ephemeralKey,
  //     setupIntentClientSecret: 'seti_1OogpwSAkAIYDuQTJSamyrr3_secret_PdynyrPfGPxfIDWCam7RsdBLRocqslu',
  //     returnURL:"https://apple.cofitapp.com?id=1212"
  //   });
  //   if (error) {
  //       console.log('dsjkajkkjhkahdkhkda',error);
  //     // setLoading(true);
  //   }
  //   console.log('paymentOption',paymentOption);
  // }

  // const openPaymentSheet = async () => {
  //   const { error,paymentOption } = await presentPaymentSheet();
  //   if (error) {
  //     console.log('dasjahkjahskjds', error);
  //   }
  //   console.log('resultttttttt',paymentOption);
  // }

  const onAddCard = async () => {
    setLoader(true)
    let {paymentMethod,error} = await  createPaymentMethod({
      paymentMethodType:"Card",
     })
     if(error){
      console.log('error creating payment method',error);
      alert(error.message)
      setLoader(false)
     }else{
      // setLoader(true)
      console.log('paymentMethodResponse',paymentMethod);
      attachPaymentMethodWithCustomerId(paymentMethod.id)
     }

     return;
    // console.log('carddetails  1111 ', cardDetails);

    if (cardNo?.length < 15) {
      alert("Please add card number.")
    } else if (expiry.length < 5) {
      alert("Please add expiry month and year.")
    } else if (cvv?.length < 3) {
      alert("Please add cvv.")
    } else {
      setLoader(true)

      let cardObject = {
        card: {
          number: cardNo,
          exp_date: expiry.split('/')[0],
          exp_year: expiry.split('/')[1],
          cvc: cvv
        }
      }
      let response = await services.post(Url.ADD_PAYMENT_METHODS, "", cardObject, "json")
      console.log('response of payment method api11', response);
      if (response.status) {
        alert("card saved successfully.")
        attachPaymentMethodWithCustomerId(response.payment_method.id)

      } else {
        alert(response.message)
        setLoader(false)
      }
      // console.log('cardObject',cardObject);
    }
  }

  const attachPaymentMethodWithCustomerId = async (paymentMethodId) => {
    let obj = {
      customerId: userInfo?.stripeCustomerId,
      payment_method: paymentMethodId
    }
    let response = await services.post(Url.ATTACH_PAYMENT_METHODS, "", obj, "json")
    if(response.status){
      navigation.goBack()
      setLoader(false)
    }else{
      alert(response.message)
      setLoader(false)
    }
   console.log('attach payment method api',response);
  }

  const formatExpiry = (input) => {

    console.log('input length', input.length);
    console.log('expiry length', expiry.length);
    if (input.length == 2 && expiry.length == 1) {
      setExpiry(input + '/');
    } else if (expiry.length == 3 && input.length == 2) {
      let newExpiry = expiry.replace('/', '')
      setExpiry(newExpiry)
    } else if (expiry.length == 4 && input.length == 3) {
      let newExpiry = input.replace('/', '')
      setExpiry(newExpiry)
    }
    else {
      setExpiry(input);
    }
  };

  const onChangeExpiry = (val) => {
    console.log("valueeeerr", val);

    // if(val?.length==2){
    //   let newValue = `${val}/`
    //   setExpiry(newValue)
    // }else{
    //   setExpiry1(val)
    // }
  }

  return (
    <View style={styles.mainView}>
      <Header title="Add Card" />
      <ScrollView>


        {/* <View>
<CardForm
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            onFormComplete={(cardDetails) => {
              console.log("card details", cardDetails)
              setCardDetails(cardDetails)
            }}
            placeholderTextColor={"#fff"}
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            cardStyle={{
              backgroundColor: "#fff",
              textAlign: "center",
              textColor: "pink",
              marginTop:20
            }}
          />
</View> */}


        <Text style={[styles.saveText, { marginTop: 50 }]}>Card Number</Text>
        <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 10,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
          setCardDetails(cardDetails)
          setIsCardDetailsCompleted(cardDetails.complete)
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
    </View>

        {/* <View style={styles.textInputView}>
          <View style={[styles.inputInnerView, { width: "80%" }]}>
            <TextInput
              placeholder='0000 0000 0000 0000'
              placeholderTextColor={"#A1A5AC"}
              value={cardNo}
              returnKeyType='done'
              blurOnSubmit={true}
              maxLength={16}
              keyboardType='number-pad'
              onChangeText={(val) => setCardNo(val)}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Regular, color: colors.textBlack }}
            />
          </View>
          <View style={[styles.inputInnerView2]}>
            <Image source={images.camera} style={styles.cameraIcon} />
          </View>
        </View>

        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <View style={{ flexDirection: "column", width: "50%", }}>
            <Text style={[styles.saveText, { marginTop: 25 }]}>Expiry</Text>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, width: "90%", borderWidth: 1, borderRadius: 11, height: 45, borderColor: '#A1A5AC', marginLeft: 20, marginTop: 15 }}>
              <TextInput
                style={{ flex: 1, paddingEnd: 10 }}
                placeholder='MM/YY'
                maxLength={5}
                keyboardType='number-pad'
                value={expiry}
                returnKeyType='done'
                blurOnSubmit={true}
                onChangeText={(val) => formatExpiry(val)}
              />
              <Image source={images.calendar1} style={{ height: 20, width: 20, resizeMode: "contain" }} />
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "50%", }}>
            <Text style={[styles.saveText, { marginTop: 25 }]}>CVV</Text>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, width: "90%", borderWidth: 1, borderRadius: 11, height: 45, borderColor: '#A1A5AC', marginLeft: 20, marginTop: 15 }}>
              <TextInput
                style={{ flex: 1, paddingEnd: 10 }}
                placeholder='123'
                secureTextEntry={showCvv}
                value={cvv}
                keyboardType='number-pad'
                maxLength={3}
                returnKeyType='done'
                blurOnSubmit={true}
                onChangeText={(val) => setCvv(val)}
              />
              <TouchableOpacity onPress={() => setShowCvv(!showCvv)}>
                <Image source={images.info1} style={{ height: 20, width: 20, resizeMode: "contain" }} />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}



        <Text style={styles.secureText}>We will store and use your card details for smooth and secure future purchases.</Text>
        <Text style={styles.acceptText}>We accept.</Text>
        <View style={styles.cardsView}>
          <Image source={images.Visa} style={styles.cardIcon} />
          <Image source={images.Mastercard} style={styles.cardIcon} />
          <Image source={images.Amex} style={styles.cardIcon} />
          <Image source={images.Discover} style={styles.cardIcon} />
        </View>
      </ScrollView>
      <View style={styles.seperator} />
      <TouchableOpacity
        onPress={() => onAddCard()}
        style={[styles.button,{backgroundColor:isCardDetailsCompleted ? colors.orange_dark : colors.buttonUnselect}]}
      >
        {
          loader
          ?
          <ActivityIndicator size={'small'} color={"#fff"}/>
          :
          <Text style={styles.buttonText}>Add Card</Text>
        }

      </TouchableOpacity>
    </View>
  )
}

export default AddCard;