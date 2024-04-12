import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image, ScrollView, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import { PlatformPayButton, isPlatformPaySupported,confirmPlatformPayPayment, PlatformPay} from '@stripe/stripe-react-native';
import { useIsFocused } from '@react-navigation/native'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import fonts from '../../constants/fonts'
import { useSelector } from 'react-redux'

const PaymentMethod1 = ({navigation}) => {

  const isFocused = useIsFocused();
  const [savedCards,setSavedCards]=useState([])
  const [loader,setLoader] = useState(true)
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(()=>{
    async function checkApplePayAvailable(){
      console.log('dasjdhdhjashkjahk',await isPlatformPaySupported());
    }
    checkApplePayAvailable();
  },[])

  useEffect(()=>{
    if(isFocused){
      fetchCustomerPaymentMethods();
    }
  },[isFocused])

  const fetchCustomerPaymentMethods=async()=>{

    let customerId = userInfo?.stripeCustomerId
    let url = `${Url.GET_CARDS}/${customerId}`
    let response = await services.get(url)
    console.log('responsedasaseee',JSON.stringify(response.cards) );
    if(response.success){
      setLoader(false)
      setSavedCards(response.cards)
    }else{
      setLoader(false)
      setSavedCards([])
    }
  }

  const removePaymentMethod = async (paymentMethodId) => {
    console.log('daskasdhjhdkhak',paymentMethodId.id);
    // return;
    let obj = {
      customerId: userInfo?.stripeCustomerId,
      payment_method: paymentMethodId.id
    }
    let response = await services.post(Url.REMOVE_PAYMENT_METHODS, "", obj, "json")
    console.log('remove payment method api response',response);
    if(response.status){
      alert("card removed successfully.")
      fetchCustomerPaymentMethods()
    }else{
      alert(response.message)
    }
  }

  const pay = async () => {
    return;
    // const clientSecret = await fetchPaymentIntentClientSecret()
    const { error } = await confirmPlatformPayPayment(
      'pi_3OhRm0AKIHWXp3cZ1EYzfMAQ_secret_ykuoNSD3qFkOHyNWAQ52EYZuX',
      {
        applePay: {
          cartItems: [
            {
              label: 'Example item name',
              amount: '14.00',
              paymentType: PlatformPay.PaymentType.Immediate,
            },
            {
              label: 'Total',
              amount: '12.75',
              paymentType: PlatformPay.PaymentType.Immediate,
            },
          ],
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          requiredShippingAddressFields: [
            PlatformPay.ContactField.PostalAddress,
          ],
          requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
        },
      }
    );
    if (error) {
      // handle error
    } else {
      // Alert.alert('Success', 'Check the logs for payment intent details.');
      console.log(JSON.stringify(paymentIntent, null, 2));
    }
  };

  const renderBrandImage=(brand)=>{
    let image = images.Visa;
    if(brand=="mastercard"){
      image = images.Mastercard
    }else if(brand=="visa"){
      image = images.Visa
    }else if(brand=='amex'){
      image = images.Amex
    }else if(brand=='discover'){
      image = images.Discover
    }
   return(
    <Image source={image} style={styles.cardView1}/>
   )
  }

    return (
    <View style={styles.mainView}>
        <Header title="Payment Methods"/>
       <ScrollView>
        <Text style={styles.saveText}>Saved Payment Methods</Text>
        {
          loader
          ?
          <ActivityIndicator size={'small'} color={"#000"} style={{alignSelf:"center",marginVertical:20}}/>
          :
          <>
          {

            savedCards?.length!=0 ?
            <FlatList
            data={savedCards}
            style={{marginVertical:20}}
            ItemSeparatorComponent={()=> <View style={styles.seperator}/>}
            renderItem={({item,index})=>{
              return(
                <View>
  <View style={[styles.cardView]}>
          <View style={styles.subView1}>
            {renderBrandImage(item?.card?.brand)}

            <View>
            <Text style={styles.text}>{`${item?.card?.brand} ...${item?.card?.last4}`}</Text>
            <Text style={styles.expiry}>{`Expiration: ${item?.card?.exp_month}/${item?.card?.exp_year}`}</Text>
            </View>
          </View>
          <View style={styles.subView2}>
           <TouchableOpacity onPress={()=>removePaymentMethod(item)} style={styles.editView}>
            <Text style={styles.editText}>Delete</Text>
           </TouchableOpacity>
          </View>
         </View>
                </View>
              )
            }}
            />
            :
            <Text style={{textAlign:"center",marginVertical:20,fontFamily:fonts.SfPro_Medium}}>No saved payment method found.</Text>

          }
         </>
        }
        {/* <View style={[styles.cardView,{marginTop:20}]}>
        <View style={styles.subView1}>
          <Image source={images.Mastercard} style={styles.cardView1}/>
          <View>
          <Text style={styles.text}>Mastercard ...8767</Text>
          <Text style={styles.expiry}>Expiration: 01/2026</Text>
          </View>
        </View>
        <View style={styles.subView2}>
         <TouchableOpacity style={styles.editView}>
          <Text style={styles.editText}>Edit</Text>
         </TouchableOpacity>
        </View>
       </View>
       <View style={styles.seperator}/>

       <View style={[styles.cardView]}>
        <View style={styles.subView1}>
          <Image source={images.Visa} style={styles.cardView1}/>
          <View>
          <Text style={styles.text}>Visa ...8767</Text>
          <Text style={styles.expiry}>Expiration: 01/2026</Text>
          </View>
        </View>
        <View style={styles.subView2}>
         <TouchableOpacity style={styles.editView}>
          <Text style={styles.editText}>Edit</Text>
         </TouchableOpacity>
        </View>
       </View>
       <View style={styles.seperator}/>

       <View style={[styles.cardView]}>
        <View style={styles.subView1}>
          <Image source={images.Mastercard} style={styles.cardView1}/>
          <View>
          <Text style={styles.text}>Mastercard ...7575</Text>
          <Text style={styles.expiry}>Expiration: 01/2026</Text>
          </View>
        </View>
        <View style={styles.subView2}>
         <TouchableOpacity style={styles.editView}>
          <Text style={styles.editText}>Edit</Text>
         </TouchableOpacity>
        </View>
       </View>
       <View style={styles.seperator1}/> */}


        <Text style={styles.saveText}>Add Payment Method</Text>
       <TouchableOpacity onPress={()=>navigation.navigate("AddCard")} style={[styles.cardView,{marginTop:20}]}>
        <View style={styles.subView1}>
          <Image source={images.creditCard} style={styles.cardView1}/>
          <Text style={styles.text}>Add Debit/Credit card</Text>
        </View>
        <View style={styles.subView2}>
        <Image source={images.backArrow} style={styles.nextIcon}/>
        </View>
       </TouchableOpacity>
       <View style={styles.seperator}/>

       {/* <TouchableOpacity style={styles.cardView}>
        <View style={styles.subView1}>
          <Image source={images.paypal1} style={styles.cardView1}/>
          <Text style={styles.text}>Add a Paypal account</Text>
        </View>
        <View style={styles.subView2}>
        <Image source={images.backArrow} style={styles.nextIcon}/>
        </View>
       </TouchableOpacity>
       <View style={styles.seperator}/>

       <TouchableOpacity onPress={()=>pay()} style={styles.cardView}>
        <View style={styles.subView1}>
          <Image source={images.applePay} style={styles.cardView1}/>
          <Text style={styles.text}>Add a Apple Pay account</Text>
        </View>
        <View style={styles.subView2}>
        <Image source={images.backArrow} style={styles.nextIcon}/>
        </View>
       </TouchableOpacity>
       <View style={styles.seperator}/> */}
       </ScrollView>
    </View>
  )
}

export default PaymentMethod1;