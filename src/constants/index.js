import React, { useState, useEffect, useRef, useLayoutEffect, } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ImageBackground, SafeAreaView, StyleSheet, ScrollView, DeviceEventEmitter, AppState } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, NavigationContext, useIsFocused, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Splash from './src/Others/Splash'
import Login from './src/Authentication/Login';
import Signup from './src/Authentication/Signup';
import ForgotPassword from './src/Authentication/ForgotPassword';
import Otp from './src/Authentication/Otp'
import Newpassword from './src/Authentication/Newpassword';
import Interest from './src/Others/Interest'
import * as Font from 'expo-font';
import SelectInterest from './src/Others/SelectInterest';
import FindConnections from './src/Others/FindConnections';
import HomeScreen from './src/Tabfile/Home';
import Cennecpage from './src/Tabfile/CennecPage';
// import Message from './src/Screens/Message'
import DetailChat from './src/Chat/DetailChat';
import Profile from './src/Tabfile/Profile';
import Generalsetting from './src/Others/Generalsetting'
import Sentmatch from './src/Others/Sentmatch'
import Favourite from './src/Others/Favourite'
import EditMyProfile from './src/Others/EditMyProfile';
import FavoriteCennections from './src/Tabfile/FavoriteCennection';
import InterestPage from './src/Others/InterestPage';
import Preference from './src/Filter/Preference';
import UserProfile from './src/Others/UserProfile';
import SearchPage from './src/Tabfile/SearchPage';
import Notification from './src/Others/Notification';
import UserProfileOther from './src/Others/UserprofileOther';
import Location1 from './src/Others/Location1'
import Favourited from './src/Others/Favourited';
import Privcypolicy from './src/Others/Privcypolicy'
import TermsCondition from './src/Others/TermsCondition';
import ChangePassword from './src/Authentication/ChangePassword'
import { requestUserPermission, NotificationLister, onMessageListener, NotifyPage } from './src/Others/NotificationService';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { base_url } from './src/Constant/BaseUrl';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const navigationRef = React.createRef();


export default function App() {

  global.NotificationStatus = '';
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showNotifications, setShowNotifications] = useState();
  const [isConnected, setIsConnected] = useState(null);
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  const [main, setmain] = useState('')
  useEffect(() => {
    _doFontLoad();
    requestUserPermission()
    NotificationListen();
    // NotificationLister(navigationRef)
    checkFirstNotification()

  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        background();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };

  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isInitialCheckDone) {
      if (isConnected === false) {
        // Internet disconnected alert
        Alert.alert('No Internet Connection', 'Please check your internet connection.');
      }
      // else if (isConnected === true) {
      //   // Internet connected alert
      //   Alert.alert('Internet Connection Restored', 'You are now connected to the internet.');
      // }
    } else {
      setIsInitialCheckDone(true);
    }
  }, [isConnected]);

  async function checkFirstNotification() {
    var user_id = await AsyncStorage.getItem('User_id')
    var initialNotification = await notifee.getInitialNotification();
    console.log("IIIIIIIIIII", initialNotification);
    const clear = async () => {
      await notifee.cancelAllNotifications();
    }
    let data = initialNotification?.notification?.data
    if (initialNotification && user_id) {
      console.log("this is initail notification", initialNotification?.notification);
      setTimeout(() => {
        if (initialNotification?.notification?.data?.sendMatch == 'true' || initialNotification?.notification?.title == 'Connection Request') {
          navigationRef?.current?.navigate('Notification');
          clear()
        }
        // } else{
        //   console.log('to chat')
        // }

        if (
          initialNotification?.notification?.title !== 'Connection Request' &&
          Object.keys(data.length == 0)
        ) {
          // alert("second_notitcations")

          navigationRef?.current?.navigate('FavoriteCennections', initialNotification?.notification?.title);
          clear()
          initialNotification = null;
        }
        else if (
          initialNotification?.notification?.title !== 'Connection Request' &&
          Object.keys(data.length > 0)
        ) {
          //  alert("First_Notification")

          navigationRef?.current?.navigate('DetailChat', initialNotification?.notification?.data);
          clear()
          initialNotification = null;
        }
      }, 4000);

    }

  }

  async function background() {
    var user_id = await AsyncStorage.getItem('User_id')
    // alert('backback')
    const initialNotification = await notifee.getInitialNotification();
    if (Object.keys(initialNotification.notification.data).length > 0 && user_id) {
      //  setTimeout(() => {
      if (initialNotification?.notification?.data?.sendMatch == 'true' && initialNotification?.notification?.title == 'Connection Request') {
        navigationRef?.current?.navigate('Notification');
        await notifee.cancelAllNotifications()
      }
      if (initialNotification?.notification?.title !== 'Connection Request' && initialNotification?.notification?.data && Object.keys(initialNotification.notification.data).length > 0) {
        //  alert("Background_Notification")
        /////
        navigationRef?.current?.navigate('DetailChat', initialNotification?.notification?.data);
        await notifee.cancelAllNotifications()
      }
      //  }, 1000);

    }
    else {
      // await notifee.cancelAllNotifications()
      console.log("no data");
    }
    console.log("******", initialNotification);
  }

  // setTimeout(async() => {
  //   var notifyMe = await AsyncStorage.getItem('notify_me');
  //   setShowNotifications(notifyMe)
  // }, 1000);

  const handleNavigation = (screen, data) => {
    clearTimeout(navigationTimeout);
    navigationTimeout = setTimeout(() => {
      navigationRef?.current?.navigate(screen, data);
      navigationTimeout = null;
      notifee.cancelAllNotifications()
    }, 2000); // 500ms delay
  };
  async function NotificationListen() {
    // var notifyMe = await AsyncStorage.getItem('notify_me');
    // alert(notifyMe)
  
    messaging().onMessage(async (remoteMessage) => {
      // currentRemoteMessage = remoteMessage;
       
      console.log("this is data remote message", remoteMessage);
      let data = remoteMessage?.notification?.body;
      console.log("1010101010101010110010001",  remoteMessage?.notification?.title);
 
      const chatRoom = await AsyncStorage.getItem('ChatRoom')
      const isCurrentUserInChatRoom = chatRoom == JSON.stringify(remoteMessage?.notification?.title);
      console.log('rrrrrrrr', remoteMessage?.notification?.title);
      console.log("ccccccrrrroo", chatRoom, 'isisisicurent user', isCurrentUserInChatRoom);
      var user_id = await AsyncStorage.getItem('User_id')
      try {

        if (chatRoom && isCurrentUserInChatRoom) {
        } else {
          user_id && notifee.displayNotification({
            data:remoteMessage?.data,
            title: remoteMessage?.notification?.title,
            body: data,
            // data:remoteMessage?.data?.groupID.toString()
          })
          notifee.onForegroundEvent(async ({ type, detail }) => {
            console.log("@@@@type", type, "@@@@details", detail);
            // return false;
            const nameRoute = navigationRef.current.getCurrentRoute();
            var user_id = await AsyncStorage.getItem('User_id')
            switch (type) {
              case EventType.DISMISSED:
                break;
              case EventType.PRESS:
                 notifee.hideNotificationDrawer();
                // console.log("@@@@@@@@@@@@@@", remoteMessage?.notification?.title);
                if (remoteMessage?.notification?.title == 'Connection Request' && user_id) {
                  navigationRef?.current?.navigate('Notification');
                  notifee.cancelAllNotifications()
                }
             if (remoteMessage?.data?.sendMatch !== "true" && Object.keys(detail.notification.data.length > 0) && user_id) {
                  // if (nameRoute.name == "DetailChat") {
                    console.log("DetailChatDetailChatDetailChat_chat");
                    console.log("this time:::", Number(detail?.notification?.data?.groupID));
              
                    // return false
                    //  handleNavigation('DetailChat',  detail?.notification?.data);
                       handleNavigation('UserProfileOther',  { id: Number(detail?.notification?.data?.groupID), FAV_vall: 'false', page_name: 'DetailChat',highlight: true });
                    // navigationRef?.current?.navigate('UserProfileOther', { id: Number(newData?.data?.groupID), FAV_vall: 'false', page_name: 'DetailChat' })
                      // navigationRef?.current?.navigate('FavoriteCennections', detail?.notification?.title);
                    notifee.cancelAllNotifications()
                  // }
                  // else {
                  //   //  navigationRef?.current?.navigate('DetailChat', detail?.notification?.data);
                  //   console.log("this time:::::::::", Number(newData?.data?.groupID));
                  //   handleNavigation('UserProfileOther',  { id: Number(detail?.notification?.data?.groupID), FAV_vall: 'false', page_name: 'DetailChat',highlight:true });
                  //     // handleNavigation('DetailChat', newData);
                  //   // return false
                  //   // handleNavigation('UserProfileOther',  { id: Number(newData?.data?.groupID), FAV_vall: 'false', page_name: 'DetailChat' });
                  //   // navigationRef?.current?.navigate('FavoriteCennections', detail?.notification?.title);
                  //   // navigationRef?.current?.navigate('UserProfileOther', { id: Number(newData?.data?.groupID), FAV_vall: 'false', page_name: 'AnyOther' })
                  //   notifee.cancelAllNotifications()
                  // }
                 }
                break;
            }
          });
  
        }

     
      } catch (error) {

      }
    })
  }

  const _doFontLoad = async () => {
    try {
      ``
      await Font.loadAsync({
        'yans-std': require('./assets/fonts/d.ttf'),
        'yans-regular': require('./assets/fonts/regular.ttf'),
        'yans-regular': require('./assets/fonts/regular.ttf'),
        'LibraSans-Bold': require('./assets/fonts/LibraSans-Bold.ttf'),
        'LibraSans-regular': require('./assets/fonts/LibraSans.ttf'),
        'visby': require('./assets/fonts/Heavybold.otf'),
        'VisbyRegular': require('./assets/fonts/VisbyRegular.otf'),
        'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')

      });

      var main1 = await AsyncStorage.getItem('main_image');
      setmain(main1)
    }
    catch (e) {
    }

    setFontLoaded(true);

  }

  return (
    <NavigationContainer ref={navigationRef}>
      <MyStack />
    </NavigationContainer>
  )
}

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>

      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name='HomeScreen' component={MyTabs} />
      <Stack.Screen name='SelectInterest' component={SelectInterest} />
      <Stack.Screen name='FindConnections' component={FindConnections} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name='Newpassword' component={Newpassword} />
      <Stack.Screen name='Interest' component={Interest} />
       <Stack.Screen name='Message' component={MyTabs}/> 
      <Stack.Screen name='DetailChat' component={DetailChat} ref={navigationRef} />
      <Stack.Screen name='Profile' component={MyTabs} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name='Generalsetting' component={Generalsetting} />
      <Stack.Screen name='Sentmatch' component={Sentmatch} />
      <Stack.Screen name='Favourite' component={Favourite} />
      <Stack.Screen name='EditMyProfile' component={EditMyProfile} />
      <Stack.Screen name='FavoriteCennections' component={FavoriteCennections} />
      <Stack.Screen name='InterestPage' component={InterestPage} />
      <Stack.Screen name='Preference' component={Preference} />
      <Stack.Screen name='UserProfile' component={UserProfile} />
      <Stack.Screen name='Cennecpage' component={Cennecpage} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='UserProfileOther' component={UserProfileOther} />
      <Stack.Screen name='Location1' component={Location1} />
      <Stack.Screen name='Favourited' component={Favourited} />
      <Stack.Screen name='Privcypolicy' component={Privcypolicy} />
      <Stack.Screen name='TermsCondition' component={TermsCondition} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />

    </Stack.Navigator>

  )
}

const MyTabs = ({ navigation }) => {
  const [main_img, setmain] = useState('')
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setimage()
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const setimage = async () => {
    var main1 = await AsyncStorage.getItem('main_image');
    setmain(main1)

  }
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarStyle: {
        height: '10%',
        backgroundColor: "#202945"
      }
    }}>


      <Tab.Screen
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ tintColor, focused, color, }) => (
            <Image resizeMode="contain"
              style={{ height: 26.07, width: 26.07, tintColor: focused ? "#fff" : "#909090" }}
              source={require('./assets/Home.png')


              } />
          ),

        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ tintColor, focused, color, }) => (
            <Image resizeMode="contain"
              style={{ height: 27, width: 27, tintColor: focused ? "#fff" : "#909090" }}
              source={require('./assets/Search.png')


              } />
          ),

        }}
        name="SearchPage"
        component={SearchPage}
      />
      <Tab.Screen

        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ tintColor, focused, color, }) => (
            focused ?
              <Image resizeMode="contain"
                style={{ height: '100%', width: '50%' }}
                source={require('./AssetsOFCennec/Connection.png')} /> : <Image resizeMode="contain"
                  style={{ height: 25, width: 36, tintColor: "#909090" }}
                  source={require('./assets/middle.png')


                  } />
          ),

        }}
        name="Cennecpage"
        component={Cennecpage}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ tintColor, focused, color, }) => (
            <Image resizeMode="contain"
              style={{ height: 30.39, width: 36.98, tintColor: focused ? "#fff" : "#909090" }}
              source={require('./assets/comment1.png')


              } />
          ),

        }}
        name="FavoriteCennections"
        component={FavoriteCennections}
      />
      <Tab.Screen
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ tintColor, focused, color, }) => (
            <Image style={{ width: 31, height: 31, borderRadius: 22 }} source={{ uri: main_img }}></Image>
          ),

        }}
        name="Profile"
        component={Profile}
      />

    </Tab.Navigator>)
}