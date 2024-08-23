import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, Touchable, TouchableOpacity, TextInput, ImageBackground, Platform, Alert } from 'react-native'
import React from 'react'
import styles from './style'
import images from '../../constants/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import fonts from '../../constants/fonts'
import FastImage from 'react-native-fast-image'
import { TextRegular } from '../../components/AppText'
import { TextInputComponent } from '../../components/TextInput'
import { AppMainButton, AppSocialButton } from '../../components/AppButton'
import Toast from 'react-native-simple-toast';
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { location, login } from '../../redux/slices/userSlice'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import colors from '../../constants/colors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import appleAuth from '@invertase/react-native-apple-authentication'

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const LoginNew = ({ navigation }) => {
  const bottomSheet = useRef();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('')
  const [forgotEmail, setForgotEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)
  const isDisable = (email.trim().length === 0 || password.trim().length === 0) || false
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onPress =async()=> {
    // alert('yes')
    // navigation.navigate("SignUp1")
    if(email.trim().length === 0) {
      Toast.show('Please enter your email.')
    } else if (password.trim().length === 0 ) {
      Toast.show('Please enter your password.')
    } else {
      setIsLoading(true)
      const data = {
        'email': email.toLowerCase(),
        'password': password
      }
      const response = await services.post(Url.LOGIN, '', data, 'json')
      console.log('response111>>>>>', response);
      Toast.show(response.message)
      setIsLoading(false)
      if(response.status) {
        dispatch(login(response.user, response.status));
        dispatch(location(response.user.location));
        navigation.navigate("SignedInStack", { screen: "Home" })
      }
    }

  }

  const onForgotPassword=async()=>{
    console.log('dsdasdasdas');
    setIsLoading(true)
    let data = {
      email: forgotEmail.toLowerCase()
    }
    const response = await services.post(Url.FORGOT_PASSWORD , '' , data , 'json')
    Toast.show(response.message)
    setIsLoading(false)
    if(response.status) {
      bottomSheet?.current.close()
      setForgotEmail('')
    }
  }

  const onPressGoogleLogin =async()=> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFOOOOOOOOO', userInfo);
              let body = {
            "email":userInfo.user.email,
            "googleId":userInfo.user.id,
            'provider': 'google',
            'access_token': userInfo.idToken,
            'useNewClientId': true
        }
        console.log('bodybodybody', body)
      let response = await services.post(Url.GOOGLE_LOGIN, "", body, "json");

     console.log('responseresponse', response);
    //  return;
     if (response.status) {
      console.log("REGISTER API RESPOMNSE11", response);
      dispatch(login(response.user, response.status));
      // dispatch(location('Chicago'));
      if(response.newUser) {
        navigation.navigate("AddProfile")
      } else {
        navigation.navigate("SignedInStack", { screen: "Home" })
      }
    }else{
      alert(response?.error)
    }

      // setState({ userInfo });
    } catch (error) {
      console.log('ERRORRRRRRRRRRRRRR', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  }

  const onPressAppleLogin =async()=>{
    console.log('3213232312312312', appleAuth.isSupported);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      })
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      console.log('appleAuthRequestResponse111', appleAuthRequestResponse)
      const { email, fullName, identityToken, user } = appleAuthRequestResponse
      let data = {
        "provider": 'apple',
        'email': email,
        'appleId': user
      }
      console.log('431414321113', data)
      const response = await services.post(Url.APPLE_LOGIN, '', data, 'json')
      console.log('Apple login response>>>>>>', response)
      Toast.show(response?.message)
      if (response.status) {
        dispatch(login(response.user, response.status));
        if(response.newUser) {
          navigation.navigate("AddProfile", {firstName: fullName.givenName, lastName: fullName.familyName})
        } else {
          navigation.navigate("SignedInStack", { screen: "Home" })
        }
      }
    } catch (error) {
      console.log('errorrrrr111', error)
    }
  }

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>

        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate("SignedInStack", { screen: "Home" })}>
            <Text  style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>
        <FastImage
          source={images.cofit}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.account}>Welcome Back!</Text>
        <TextRegular styles={{paddingTop: 8, paddingHorizontal: 15}} text="Welcome back to CoFit! Log in to continue your journey towards health and wellness."/>

        <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Email</Text>
        <TextInputComponent placeholder="Enter your email address" value={email} onChangeText={setEmail}/>
        <View style={styles.password}>
     <Text style={[styles.locationText, { marginLeft: "5%"}]}>Password</Text>
     <TouchableOpacity onPress={()=> setIsSecureTextEntry(!isSecureTextEntry)}>
     <Text style={styles.login}>{isSecureTextEntry ? 'show' : 'hide'}</Text>
     </TouchableOpacity>
     </View>
     <TextInputComponent placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry={isSecureTextEntry}/>
     <TouchableOpacity onPress={()=> bottomSheet.current.show()} style={styles.forgotView}>
       <Text style={styles.forgot}>Forgot Password?</Text>
     </TouchableOpacity>
        <AppMainButton title="Log In" isLoading={isLoading} disable={isDisable} onPress={onPress}/>
        <View style={styles.orView}>
          <View style={styles.line}></View>
          <Text>or</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.socialView}>
          <TouchableOpacity onPress={onPressGoogleLogin} style={styles.socialView1}>
            <FastImage
              resizeMode='contain'
              source={images.google}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressAppleLogin} style={styles.socialView1}>
            <FastImage
              resizeMode='contain'
              source={images.apple}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.socialView1}>
            <FastImage
              resizeMode='contain'
              source={images.facebook}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.haveAccount}>
        <TextRegular text="Don't have an account? "/>
        <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
        <Text style={styles.login}>SignUp</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>


      <BottomSheet draggable={false} ref={bottomSheet} height={height * 0.9} width={100} sheetBackgroundColor={"#fff"}>
        <View style={{ flex: 1 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', paddingTop: 10}}>
         <TouchableOpacity onPress={()=> bottomSheet?.current.close()} style={{width: '20%', paddingLeft: 15}}>
           <Image source={images.close} style={{height: 16, width: 16, resizeMode:'contain'}}/>
         </TouchableOpacity>
         <View style={{width: '60%'}}>
          <Text style={{textAlign: 'center', fontFamily: fonts.SfPro_Semibold, fontSize: 20, color: colors.textBlack}}>Reset Password</Text>
         </View>
         <View style={{width: '20%' , backgroundColor: 'green'}}></View>
        </View>
        <View style={{width: '90%', height: 1, marginLeft: '5%', backgroundColor: colors.gray, marginTop: 15}}/>
        <TextRegular styles={{paddingTop: 30, paddingHorizontal: 20, paddingBottom: 10}} text="We’ll send information on how to reset your password to your email address"/>
        <TextInputComponent placeholder="Email" value={forgotEmail} onChangeText={setForgotEmail}/>
        <AppMainButton title="Reset Password" isLoading={isLoading} disable={forgotEmail.trim().length == 0 ? true : false} onPress={onForgotPassword}/>
        </View>
      </BottomSheet>

    </View>
  )
}

export default LoginNew;