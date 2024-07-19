import { StyleSheet, Text, View, StatusBar, LogBox } from 'react-native'
import React, { useEffect, useState } from "react";
import MainApp from "./src/navigations/index"
import { Amplify, Auth } from 'aws-amplify';
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen'
import { StripeProvider } from '@stripe/stripe-react-native';

const persistor = persistStore(store);
LogBox.ignoreAllLogs()
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('statua11111',adapterStatuses);
  });

// Amplify.configure({
//   Auth: {
//     region: "us-east-2",
//     userPoolId: 'us-east-2_rs9hTqWrU',
//     userPoolWebClientId: '1rfgemn6htog4af1e7mlqpcetd',
//     identityPoolId:'us-east-2:9a9091c6-94cd-43fc-a9b7-d387e8391dc8',
//     // authenticationFlowType:"USER_PASSWORD_AUTH",
//     oauth: {
//       domain: 'cofit.auth.us-east-2.amazoncognito.com',
//       scope: [
//         'email',
//         'openid',
//         'profile'
//       ],
//       redirectSignIn: 'cofit://',
//       redirectSignOut: 'cofit://',
//       responseType: 'token',
//     },
//   },
// });

export default function App() {

  useEffect(()=>{
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000);

  },[])

  return (
    <>
    <StripeProvider
      publishableKey="pk_test_CWOYTf4SJERP6VyJTChjifbg"
      merchantIdentifier="merchant.com.cofitnew.app"
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainApp />
          <StatusBar />
        </PersistGate>
      </Provider>
      </StripeProvider>
    </>

  )
}

const styles = StyleSheet.create({})
