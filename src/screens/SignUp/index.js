import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, TextInput, ImageBackground, Platform, Alert ,PermissionsAndroid} from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import images from '../../constants/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { useRef } from 'react'
import FastImage from 'react-native-fast-image'
import { TextRegular } from '../../components/AppText'
import { TextInputComponent } from '../../components/TextInput'
import { AppMainButton, AppSocialButton } from '../../components/AppButton'
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin'
import Toast from 'react-native-simple-toast';
import { location, login } from "../../redux/slices/userSlice";
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { isIOS } from '../../utils/platform'
// import Geolocation from "react-native-geolocation-service";
import { useIsFocused } from '@react-navigation/native';


// import moment from 'moment'

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// GoogleSignin.configure({
//   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile

//   // androidClientId: '809945505628-cjj77mrft9m3q2lt93rnctficqp34hgn.apps.googleusercontent.com',
//   webClientId: '809945505628-j2kh6ptj2dbgm7oibj55g9lf2jlvqn6n.apps.googleusercontent.com',
//   // webClientId: '809945505628-vif52k6aie79821cahnqjjoatmfcooke.apps.googleusercontent.com',

//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   iosClientId: '809945505628-vif52k6aie79821cahnqjjoatmfcooke.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
// });

const SignUp = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.user.status);

  // useEffect(()=>{
  //   const arr1 = {
  //     duration: 45,
  //     timeslot_length: 30,
  //     timesheet_arr:{
  //       startTime: '08:00', endTime: '18:00'
  //     }
  //   }
  //   let date = moment().format('DD MMM YYYY')
  //   const dateWithTime = date + ' ' + arr1.timesheet_arr.startTime
  //   let startTimeTimeStamp = moment(dateWithTime).unix()

  //   const durationInMil = arr1.duration * 60
  //   const timeSlotLengthInMil = arr1.timeslot_length * 60
  //   console.log('timeSlotLengthInMil', timeSlotLengthInMil);
  //   const endTimeWithDate = date + ' ' + arr1.timesheet_arr.endTime
  //   const endTimeTimeStamp = moment(endTimeWithDate).unix()

  //   let slots = []
  //   while(startTimeTimeStamp + durationInMil <= endTimeTimeStamp) {
  //       let slot = {
  //         start: moment.unix(startTimeTimeStamp).format('HH:mm') ,
  //         end: moment.unix(startTimeTimeStamp + durationInMil).format('HH:mm')
  //       }
  //       slots.push(slot)
  //       startTimeTimeStamp = startTimeTimeStamp + timeSlotLengthInMil
  //       console.log('startTimeTimeStamp', startTimeTimeStamp);

  //   }
  //   console.log('9328ye3y923', slots);
  // },[])


  const bottomSheet = useRef();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const isValidEmail = mailFormat.test(email)
  console.log('isValidEmailisValidEmail', isValidEmail)
  const onPress =()=> {
    // alert('yes')
    if(isValidEmail) {
      navigation.navigate("SignUp1",{ email: email.toLowerCase() })
    } else {
      Toast.show('Please enter valid email.')
    }

  }
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     if (Platform.OS == "android") {
  //       requestLocationPermission();
  //     }
  //   }
  // }, [isFocused]);

  // const requestLocationPermission = async() =>{
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Location Permission",
  //         message:
  //           "This app needs access to your location to provide location-based services.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("Location permission granted.");
  //       Geolocation.getCurrentPosition((position) => {
  //         // setLatitude(position.coords.latitude);
  //         // setLongitude(position.coords.longitude);
  //         Geocoder.from(position.coords.latitude, position.coords.longitude)
  //           .then((json) => {
  //             console.log(
  //               "asnbmbmbnmbmbnkljmbmnbmdasd",
  //               json.results[0].address_components
  //             );
  //             const addressComponent = json.plus_code.compound_code;
  //             console.log("sdfsfs", addressComponent);
  //             // setAddress(addressComponent);
  //             // setMapVisible(true);
  //             // setLoader(false);
  //           })
  //           .catch((error) => {
  //             console.warn("Geocoder error:", error);
  //             // setLoader(false);
  //           });

  //       });
  //     } else {
  //       console.log("Location permission denied.");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  const onPressGoogleLogin =async()=> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFOOOOOOOOO', userInfo);
      const getToken = await GoogleSignin.getTokens()
      console.log('dddddddd',getToken);
      const platform = Platform.OS === 'ios'
      
              let body = {
            "email":userInfo.user.email,
            "googleId":userInfo.user.id,
            'provider': 'google',
            'access_token': userInfo.idToken,
            'useNewClientId': true,
            'platform': platform === 'ios' ? 'ios' : 'android'

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
      if(response.message) {
        alert(response.message)
      } else {
        alert(response?.error)
      }

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
      const { email, fullName, identityToken, user  } = appleAuthRequestResponse
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
      <KeyboardAwareScrollView keyboardShouldPersistTaps={true}>

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
        <Text style={styles.account}>Create Your Account</Text>
        <TextRegular styles={{paddingTop: 8, paddingHorizontal: 15}} text="Get started on CoFit by creating your account. Simple, fast, and your gateway to fitness."/>

        <Text style={[styles.locationText, { marginLeft: "5%", marginTop: 20 }]}>Email</Text>
        <TextInputComponent keyboardType='email-address' placeholder="Enter your email" value={email} onChangeText={setEmail}/>
        <AppMainButton title="Continue" disable={email.trim().length ? false : true} onPress={onPress}/>
        <View style={styles.orView}>
          <View style={styles.line}></View>
          <Text>or</Text>
          <View style={styles.line}></View>
        </View>
        <AppSocialButton image={images.google} title="Continue with Google" onPress={onPressGoogleLogin}/>
        {isIOS ?
        <AppSocialButton image={images.apple} title="Continue with Apple" onPress={onPressAppleLogin}/>
        :
        <></>
        }
        {/* <AppSocialButton image={images.facebook} title="Continue with Facebook"/> */}
        <View style={styles.haveAccount}>
        <TextRegular text="Already have an account? "/>
        <TouchableOpacity onPress={()=> navigation.navigate('LoginNew')}>
        <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default SignUp;