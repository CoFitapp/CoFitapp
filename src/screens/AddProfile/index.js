import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import styles from './style'
import Header from '../../components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputComponent } from '../../components/TextInput'
import { TextRegular } from '../../components/AppText'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { TouchableOpacity } from 'react-native'
import { AppMainButton } from '../../components/AppButton'
import colors from '../../constants/colors'
import CheckBox from 'react-native-check-box'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import Toast from 'react-native-simple-toast';
import DatePicker from "react-native-date-picker";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { login, updateUser } from '../../redux/slices/userSlice'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'

const AddProfile = ({navigation, route}) => {
  const bottomSheet = useRef();
  const [dob, setDob] = useState('')
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [selectedGender, setSelectedGender] = useState('')
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('')
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log('userInfouserInfo', userInfo)

  // const isDisable = firstName.trim().length == 0 || lastName.trim().length == 0 || selectedDate.trim().length ==0 || selectedGender.trim().length ==0 || phoneNumber.trim().length == 0 || !isChecked
  const isDisable = firstName.trim().length == 0 || lastName.trim().length == 0 || !isChecked
  const gender = [
    {id: 1, name: 'Female', image: images.female},
    {id: 2, name: 'Male', image: images.male},
    {id: 3, name: 'Non-Binary', image: images.non_binary},
    {id: 4, name: 'Other', image: images.other},
    {id: 5, name: 'Prefer not to say', image: images.prohibition},
  ]

   useEffect(()=>{
     if(route?.params?.firstName && route?.params.firstName != null) {
      setFirstName(route?.params.firstName)
     }
     if(route?.params?.lastName && route?.params.lastName != null) {
      setLastName(route?.params.lastName)
     }
   },[])

  const onContinue =async()=> {
    if (!firstName.trim().length) {
      Toast.show('Please enter first name.')
    }
    else if (!lastName.trim().length) {
      Toast.show('Please enter last name.')
    }
    // else if (!selectedDate.length) {
    //   Toast.show('Please select your date of birth.')
    // }
    // else if (!selectedGender.length) {
    //   Toast.show('Please select your gender.')
    // }
    // else if (!phoneNumber.length) {
    //   Toast.show('Please enter phone number.')
    // }
    else {
      setIsLoading(true)
      const data = new FormData()
      data.append('firstName', firstName)
      data.append('lastName', lastName)
      if(selectedDate.length) {
        data.append('dob', selectedDate)
      }
      if(selectedGender.length) {
        data.append('gender', selectedGender)
      }
      if(phoneNumber.length){
        data.append('phoneNo', phoneNumber)
      }

      console.log('bodyyyyy', data);
      let url = `${Url.ADD_PROFILE}/${userInfo.id}`
      console.log('urllllll', url);
      const response = await services.post(url, "", data, 'formdata')
      setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        dispatch(updateUser(response.user));
        navigation.navigate("AddProfilePhoto")
      }
      console.log('Add PROFILE API RESPONSE1111111111', response)
    }
  }

  const formatPhoneNumber = (number) => {
    // Remove all non-digit characters
    number = number.replace(/\D/g, '');
    // Format the number
    let formattedNumber = '';
    if (number.length > 0) {
      formattedNumber += '(' + number.substring(0, 3);
    }
    if (number.length > 3) {
      formattedNumber += ') ' + number.substring(3, 6);
    }
    if (number.length > 6) {
      formattedNumber += '-' + number.substring(6, 10);
    }
    return formattedNumber;
  };


  return (
    <View style={{height: '100%'}}>
    <KeyboardAwareScrollView  contentContainerStyle={{flexGrow: 1,backgroundColor: '#fff'}}>
     <View style={{height: '90%'}}>
     <Header title="Profile"/>
     <Text style={[styles.locationText, { marginLeft: "5%", }]}>Name</Text>
     <View style={{flexDirection: 'row'}}>
     <TextInputComponent placeholder="First Name" value={firstName} onChangeText={setFirstName} styles={{width: '42%'}}/>
     <TextInputComponent placeholder="Last Name" value={lastName} onChangeText={setLastName} styles={{width: '42%'}}/>
     </View>

     <Text style={[styles.locationText, { marginLeft: "5%",paddingTop: 15 }]}>Date of Birth</Text>
     <TouchableOpacity onPress={()=> setOpen(true)} style={styles.view}>
       <TextRegular text={selectedDate.length ? selectedDate : "MM/DD/YY"} styles={{color: selectedDate.length ? colors.black : colors.placeholderColor}}/>
     </TouchableOpacity>

     <DatePicker
                modal
                mode="date"
                open={open}
                maximumDate={new Date()}
                date={date}
                onConfirm={(date) => {
                  console.log("saduiauijgajdgjca", moment(date).format('MM/DD/YY'));
                  setOpen(false);
                  setDate(date);
                  setSelectedDate(moment(date).format('MM/DD/YY'))
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

     <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Gender</Text>
     <TouchableOpacity onPress={()=> bottomSheet.current.show()} style={styles.view}>
       <TextRegular text={selectedGender.length ? selectedGender : "Select Your Gender"} styles={{color: selectedGender.length ? colors.black : colors.placeholderColor}}/>
     </TouchableOpacity>
     <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Phone Number</Text>
     <TextInputComponent maxLength={14} placeholder="Enter Phone Number" keyboardType="number-pad" value={phoneNumber} onChangeText={(value)=> setPhoneNumber(formatPhoneNumber(value))}/>

     <View style={styles.checkBoxView}>
          <CheckBox
            style={{marginTop:2  }}
            onClick={() => {
              setIsChecked(!isChecked)
            }}
            checkedImage={<Image source={images.checkbox} style={styles.checkbox}/>}
            unCheckedImage={<View style={styles.uncheck}/>}
            isChecked={isChecked}
          />
         <View style={styles.terms}>
          <Text style={styles.term1}>I have read and accept CoFit’s </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('TermService')}>
          <Text style={styles.term2}>Terms of Use </Text>
          </TouchableOpacity>
          <Text style={styles.term1}>and </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.term2}>Privacy Policy.</Text>
          </TouchableOpacity>
         </View>

        </View>


     </View>
     <View style={styles.bottom}>
      <AppMainButton title="Continue" isLoading={isLoading} disable={isDisable} onPress={onContinue}/>
     </View>
    </KeyboardAwareScrollView>
    <BottomSheet draggable={false} ref={bottomSheet} height={400} width={100} sheetBackgroundColor={"#fff"}>
        <View style={{ flex: 1 }}>
          <View style={styles.handle}/>
          <Text style={styles.pickCity}>Choose Your Gender</Text>
          <View style={styles.seperator} />
          <FlatList
          data={gender}
          ItemSeparatorComponent={()=> <View style={styles.seperator} />}
          renderItem={({item, index})=>{
            return(
              <TouchableOpacity onPress={()=>{ setSelectedGender(item.name), bottomSheet.current.close() }} style={styles.list}>
                <FastImage source={item.image} resizeMode='contain' style={{height: 20, width: 20}}/>
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          />

        </View>
      </BottomSheet>
    </View>
  )
}

export default AddProfile
