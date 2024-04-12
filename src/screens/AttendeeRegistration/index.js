import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import { Dropdown } from 'react-native-element-dropdown'
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useEffect } from 'react'


const { height, width } = Dimensions.get("window");

const AttendeeRegistration = ({navigation,route}) => {
  const [eventType, setEventType] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNo, setPhoneNo] = useState(null)
  const [email, setEmail] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const countryArr = [
    { label: "United States", value: "United States" },
    { label: "India", value: "India" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Russia", value: "Russia" },
    { label: "Mexico", value: "Mexico" },
  ];

  useEffect(()=>{
    console.log('routtteteeee',route.params);
  },[])

  const onProceed=()=>{
    let user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNo,
      ...route.params
    }
    console.log('dsakjdhasjkhdjkhjdkahjkha',user);
    // return;
    navigation.navigate("OrderDetails",{userObj:user})
  }
  return (
    <View style={styles.mainView}>
      <Header title="Registration" />
      <KeyboardAwareScrollView>
        <Text style={[styles.saveText, { marginTop: 5 }]}>Name</Text>
        {/* <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 15 }]}>Name</Text> */}
        <View style={styles.textInputView}>
          <View style={styles.inputInnerView}>
            <TextInput
              placeholder='First Name'
              placeholderTextColor={"#A1A5AC"}
              value={firstName}
              onChangeText={(val) => setFirstName(val)}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Regular, color: colors.textBlack }}
            />
          </View>
          <View style={styles.inputInnerView}>
            <TextInput
              placeholder='Last Name'
              value={lastName}
              onChangeText={(val) => setLastName(val)}
              placeholderTextColor={"#A1A5AC"}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Regular, color: colors.textBlack }}
            />
          </View>
        </View>


        <Text style={[styles.saveText, { marginTop: 25 }]}>Email</Text>
        <View style={styles.textInputView}>

          <View style={styles.inputInnerView1}>
            <TextInput
              placeholder='Enter your email'
              value={email}
              onChangeText={(val) => setEmail(val)}
              placeholderTextColor={"#A1A5AC"}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Regular, color: colors.textBlack }}
            />
          </View>
        </View>
        <Text style={styles.eText}>This email address will receive the e-tickets</Text>

        <Text style={[styles.saveText, { marginTop: 25 }]}>Phone Number</Text>
        <View style={styles.textInputView}>
          <View style={styles.phoneInputView1}>
            <Text>+1 (US)</Text>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "90deg" }], marginLeft: 5 }]} />
          </View>
          <View style={styles.phoneInputView2}>
            <TextInput
              editable={true}
              placeholder='Phone number'
              placeholderTextColor={"#A1A5AC"}
              maxLength={10}
              keyboardType='number-pad'
              returnKeyType='done'
              value={phoneNo}
              onChangeText={(val) => setPhoneNo(val)}
              style={{ flex: 1, paddingLeft: 10, fontFamily: fonts.SfPro_Medium, color: "#020A23" }}
            />
          </View>
        </View>
        <View style={styles.checkBoxView}>
          <CheckBox
            style={{marginTop:2  }}
            onClick={() => {
              setIsChecked(!isChecked)
            }}
            checkedImage={<Image source={images.checkbox} style={{height:16,width:16,resizeMode:"contain"}}/>}
            unCheckedImage={<View style={{height:16,width:16,borderWidth:1.2,borderColor:"#C9C9C9"}}/>}
            isChecked={isChecked}
          // leftText={"CheckBox"}
          />
         <View style={{flexDirection:"row",width:"94%",marginLeft:10,flexWrap:"wrap"}}>
          <Text>I have read and accept CoFit’s </Text>
          <TouchableOpacity>
          <Text style={styles.term2}>Terms of Use </Text>
          </TouchableOpacity>
          <Text style={styles.term1}>and </Text>
          <TouchableOpacity>
          <Text style={styles.term2}>Privacy Policy.</Text>
          </TouchableOpacity>
         </View>
        {/* <Text style={styles.term1}>I have read and accept CoFit’s <TouchableOpacity><Text style={styles.term2}>Terms of Use <Text style={styles.term1}>and <Text style={styles.term2}>Privacy Policy.</Text></Text></Text></TouchableOpacity></Text> */}

        </View>


      </KeyboardAwareScrollView>
      <View style={styles.seperator} />

      <View style={styles.attendEventMainView1}>

                <View>
                  <Text style={styles.totalAmount}>${route.params.totalAmount}</Text>
                  <Text style={styles.noOfTicket}>{`${route.params.selectedTicketQuantity} Ticket`}</Text>
                </View>

              <TouchableOpacity
              disabled={(firstName?.length!=0 && lastName?.length!=0 && email?.length!=0 && phoneNo?.length!=0 && isChecked) ? false : true}
              onPress={()=>onProceed()}
              style={[styles.bottomBtn1,
              {width:"45%" ,
              backgroundColor:(firstName?.length!=0 && lastName?.length!=0 && email?.length!=0 && phoneNo?.length!=0 && isChecked) ? colors.orange_dark :  colors.buttonUnselect
              }]}>
                <Text style={styles.btnText}>Proceed</Text>
              </TouchableOpacity>
            </View>


      {/* <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetails")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default AttendeeRegistration;