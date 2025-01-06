import { StyleSheet, Text, View,Platform } from 'react-native'
import React, { useState } from 'react'
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
import Toast from 'react-native-simple-toast';
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { location, login } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/><.,])(?=.*[a-zA-Z]).{8,}$/
const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const SignUp1 = ({navigation, route}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(route.params.email)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)
  const [isSecureTextEntry1, setIsSecureTextEntry1] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const isDisable = email.trim().length == 0 || confirmEmail.trim().length == 0 || password.trim().length ==0 || cPassword.trim().length == 0
  const isValidPassword = passwordRegex.test(password)
  const isValidEmail = mailFormat.test(email)
  const isValidConEmail = mailFormat.test(confirmEmail)
  const lengthCriteria = password.length >= 8;
    const containsNumeric = /\d/.test(password);
    const containsUppercase = /[A-Z]/.test(password);
    const containsSymbol = /[!@#$%^&*()_+}{:;'?/><.,]/.test(password);

  const onPressContinue =async()=> {
    const email1 = email.toLowerCase()
    const confirmEmail1 = email.toLowerCase()
    if(!isValidEmail) {
      Toast.show('Please enter valid email.')
    } else if (confirmEmail1 !== email1) {
      Toast.show('Email mismatch. Email and confirm email should be same.')
    } else if (!lengthCriteria || !containsNumeric || !containsUppercase || !containsSymbol) {
      Toast.show('Password must include: uppercase letters, lowercase letters, numbers, and special characters.')
    } else if (cPassword !== password) {
      Toast.show('Password and Confirm password should be same.')
    } else {
      // navigation.navigate("ChooseLocation")
      // return
      setIsLoading(true)
      const data = {
        'email': email1,
        'password': password,
      }
      const response = await services.post(Url.SIGN_UP, "", data, 'json')
      setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        dispatch(login(response, response.status));
        navigation.navigate("AddProfile")
      }
      console.log('SIGN UP API RESPONSE1111111111', response)
    }
  }
  return (
    <KeyboardAwareScrollView  contentContainerStyle={{flexGrow: 1,backgroundColor: '#fff'}}>
     <View style={{height: '90%'}}>
     <Header title="Sign Up"/>
     <Text style={[styles.locationText, { marginLeft: "5%", }]}>Email</Text>
     <TextInputComponent keyboardType='email-address' placeholder="Enter your email" value={email} onChangeText={setEmail}/>
     <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Confirm Your Email</Text>
     <TextInputComponent keyboardType='email-address' placeholder="Re-enter your email address" value={confirmEmail} onChangeText={setConfirmEmail}/>

     <View style={styles.password}>
     <Text style={[styles.locationText, { marginLeft: "5%"}]}>Password</Text>
     <TouchableOpacity onPress={()=> setIsSecureTextEntry(!isSecureTextEntry)}>
     <Text style={styles.login}>{isSecureTextEntry ? 'show' : 'hide'}</Text>
     </TouchableOpacity>
     </View>
     <TextInputComponent placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry={isSecureTextEntry}/>

     <TextRegular text="Your password must include at least" styles={styles.pText}/>
     <View style={styles.passwordCheckView}>
       <FastImage resizeMode='contain' source={images.tick} style={styles.tick}/>
       <TextRegular text="8 characters" styles={{fontSize: 12, paddingLeft: 5, color: password.length == 0 ? colors.textRegular : lengthCriteria ? colors.green : colors.orange_dark}}/>
     </View>
     <View style={styles.passwordCheckView}>
       <FastImage resizeMode='contain' source={images.tick} style={styles.tick}/>
       <TextRegular text="1 numeric character" styles={{fontSize: 12, paddingLeft: 5, color: password.length == 0 ? colors.textRegular : containsNumeric ? colors.green : colors.orange_dark}}/>
     </View>
     <View style={styles.passwordCheckView}>
       <FastImage resizeMode='contain' source={images.tick} style={styles.tick}/>
       <TextRegular text="1 capital letter" styles={{fontSize: 12, paddingLeft: 5, color: password.length == 0 ? colors.textRegular : containsUppercase ? colors.green : colors.orange_dark}}/>
     </View>
     <View style={styles.passwordCheckView}>
       <FastImage resizeMode='contain' source={images.tick} style={styles.tick}/>
       <TextRegular text="1 symbol" styles={{fontSize: 12, paddingLeft: 5, color: password.length == 0 ? colors.textRegular : containsSymbol ? colors.green : colors.orange_dark}}/>
     </View>
     <View style={styles.password}>
     <Text style={[styles.locationText, { marginLeft: "5%"}]}>Confirm Password</Text>
     <TouchableOpacity onPress={()=> setIsSecureTextEntry1(!isSecureTextEntry1)}>
     <Text style={styles.login}>{isSecureTextEntry1 ? 'show' : 'hide'}</Text>
     </TouchableOpacity>
     </View>
     <TextInputComponent placeholder="Confirm Password" value={cPassword} onChangeText={setCPassword} secureTextEntry={isSecureTextEntry1}/>
     </View>
     <View style={styles.bottom}>
      <AppMainButton isLoading={isLoading} title="Continue" disable={isDisable} onPress={onPressContinue}/>
     </View>
    </KeyboardAwareScrollView>
  )
}

export default SignUp1
