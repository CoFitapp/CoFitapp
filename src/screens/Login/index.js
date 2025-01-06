import { NativeModules, StyleSheet, Text, View, useWindowDimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import images from '../../constants/images'
import colors from '../../constants/colors'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { login } from '../../redux/slices/userSlice'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Amplify, Auth, Hub, Cache } from "aws-amplify";
import { useDispatch } from 'react-redux'

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   // scopes: ['email', 'profile'],
//   // androidClientId: '809945505628-cjj77mrft9m3q2lt93rnctficqp34hgn.apps.googleusercontent.com',
//   // webClientId: '809945505628-cjj77mrft9m3q2lt93rnctficqp34hgn.apps.googleusercontent.com',
//   // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   iosClientId: '809945505628-vif52k6aie79821cahnqjjoatmfcooke.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
// });

const LoginScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState({})
  const dispatch = useDispatch();


  // useEffect(() => {
  //   GoogleSignin.configure();

  // }, [])

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
  //     console.log('sdasdsdasdasdadsadsadas', JSON.stringify(data));
  //     // console.log('dsnu8g23dxszs238gdsafdfds32d23d23', data.signInUserSession.idToken.payload.profile);
  //     console.log('event', event);
  //     switch (event) {
  //       case "signIn":
  //         console.log('dadgqwgdu8821gdssa87dsd1278t128',data.signInUserSession.idToken.payload.given_name);
  //         let userObject = {
  //           "name":data.signInUserSession.idToken.payload.given_name + " " + data.signInUserSession.idToken.payload.family_name,
  //           "first_name":data.signInUserSession.idToken.payload.given_name,
  //           "last_name":data.signInUserSession.idToken.payload.family_name,
  //           "email":data.signInUserSession.idToken.payload.email,
  //           "google_id":data.username
  //       }
  //         // dispatch(login(true))
  //         navigation.navigate("SelectLocation",{userDetails:userObject})
  //         break;
  //       case "cognitoHostedUI":
  //         // dispatch(login(true))
  //         // navigation.navigate("SelectLocation")
  //         break;
  //       case "signOut":
  //         break;
  //       case "customOAuthState":
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFOOOOOOOOO', userInfo);
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

    return;
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google})
  }

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>
        <View style={{ marginTop: statusBarHeight, flex: 1, }}>
          {/* <View style={styles.skipView}>
            <TouchableOpacity onPress={() => navigation.navigate("SelectLocation")} style={styles.skipbtn}>
              <Text style={{ fontSize: 14, color: "#363C49" }}>Skip</Text>
              <Image style={styles.skipimg} source={images.skip}></Image>
            </TouchableOpacity>
          </View> */}
          <View style={styles.logoView}>
            <Image source={images.cofitLogo} style={styles.cofitImage} />
          </View>
          <View style={styles.backView}>

          </View>
          <View style={styles.startedView}>
            <Text style={styles.startedText}>Let's get started</Text>
            <View style={styles.signUpView}>
              <Text style={styles.signUpText}>
                Signup or login to see what's happening near you.
              </Text>
            </View>
            <View style={styles.logoView1}>
              <Image style={styles.logoimage1} source={images.logo}>

              </Image>
            </View>
          </View>
        </View>
        <View style={styles.bottomView} >
          <TouchableOpacity onPress={() => googleLogin()} style={styles.loginBtn}>
            <Image source={images.google} style={styles.googleIcon1}></Image>
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    </View>
  )
}

export default LoginScreen
