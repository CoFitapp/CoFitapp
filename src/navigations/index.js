import React from "react";
import { View, Text } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Linking, StatusBar } from "react-native";
import LoginScreen from "../screens/Login/index";
import OnBoardingScreen from "../screens/OnBoarding";
import SplashScreen from "../screens/Splash/index";
import MapScreen from "../screens/Map/index";
import Profile from "../screens/Profile/index";
import DashboardScreen from "../screens/Dashboard/index";
import SelectLocation from "../screens/SelectLocation";
import ChangeLocation from "../screens/ChangeLocation";
import EventDetail from "../screens/EventDetail/index";
import MyEventDetail from "../screens/MyEvents Detail/index";
import ShareEvent from "../screens/ShareEvent/index";
import images from "../constants/images";
import Map from "../screens/ExploreMap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddEvent from "../screens/AddEvent";
import TicketInfo from "../screens/TicketInfo";
import MyEvents from "../screens/MyEvents";
import EventReview from "../screens/EventReview";
import fonts from "../constants/fonts";
import colors from "../constants/colors";
import UpdateEvent from "../screens/UpdateEvent";
import StepsScreen from "../screens/StepsScreen";
import AddPhotos from "../screens/AddPhotos";
import FreeOrPaid from "../screens/FreeorPaid";
import AddTicket from "../screens/AddTicket";
import StandardTicketAdd from "../screens/StandardTicketAdd";
import PaymentCollectionSetup from "../screens/PaymentCollectionSetup";
import EventInstructions from "../screens/EventInstructions";
import StandardTicketAddAdvance from "../screens/StandardTicketAddAdvance";
import UserDetails from "../screens/UserDetail";
import PickLocation from "../screens/PickLocation";
import EventScreen from "../screens/EventScreen";
import SelectActivity from "../screens/SelectActivity";
import EnterName from "../screens/EnterName";
import EnterDescription from "../screens/EnterDescription";
import EditProfile from "../screens/EditProfile";
import TransactionHistory from "../screens/TransactionHistory";
import PaymentMethod from "../screens/Payment&PayoutMethod";
import PaymentMethod1 from "../screens/PaymentMethods";
import PayoutMethod from "../screens/PayoutMethods";
import AttendeeRegistration from "../screens/AttendeeRegistration";
import OrderDetails from "../screens/OrderDetails";
import AddCard from "../screens/AddCard";
import ViewTicket from "../screens/ViewTicket";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SignedInStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.7,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.SfPro_Regular,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{
                  height: 23,
                  width: 23,
                  resizeMode: "contain",
                }}
                source={focused ? images.home3 : images.home2}
              ></Image>
              <Text
                style={{
                  fontFamily: fonts.SfPro_Regular,
                  color: focused ? colors.orange_dark : "#020A23",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{
                  height: 23,
                  width: 23,
                  resizeMode: "contain",
                }}
                source={focused ? images.map_active : images.map}
              />
              <Text
                style={{
                  fontFamily: fonts.SfPro_Regular,
                  color: focused ? colors.orange_dark : "#020A23",
                }}
              >
                Map
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyEvents"
        component={MyEvents}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{
                  height: 23,
                  width: 23,
                  resizeMode: "contain",
                }}
                source={focused ? images.home_active : images.home}
              ></Image>
              <Text
                style={{
                  fontFamily: fonts.SfPro_Regular,
                  color: focused ? colors.orange_dark : "#020A23",
                }}
              >
                My Events
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{
                  height: 23,
                  width: 23,
                  resizeMode: "contain",
                }}
                source={focused ? images.profile_active : images.profile}
              ></Image>
              <Text
                style={{
                  fontFamily: fonts.SfPro_Regular,
                  color: focused ? colors.orange_dark : "#020A23",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function navigation() {
  const isLoggedIn = useSelector((state) => state.user.status);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const linkingEvent = Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink]);

  const handleDeepLink = async (url) => {
    // add your code here
    console.log(url, "dwkjhkjhkjhkjhkhrwerwe");
    let eventId = url.url.split("id=")[1];
    if (url != null && eventId != undefined && eventId?.length!=0) {
      // let url = url.url

      console.log("dsjkhfweihuhfffffdsuihgiuiuoui", eventId);
      if (isLoggedIn) {
        if(eventId=="assdf"){
          navigationRef.navigate("PayoutMethods", { item: eventId });
        }else{
          navigationRef.navigate("ShareEvent", { item: eventId });
        }

      }
    }

    console.log("dsajdxaasjhkhkhajk", url);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={"gray"} />
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "SignedInStack" : "OnBoardingScreen"}
        screenOptions={{ headerShown: false, }}
      >
        <Stack.Screen name="StepsScreen" component={StepsScreen} />
        <Stack.Screen name="SelectActivity" component={SelectActivity} />
        <Stack.Screen name="EnterName" component={EnterName} />
        <Stack.Screen name="EnterDescription" component={EnterDescription} />
        <Stack.Screen name="AddPhotos" component={AddPhotos} />
        <Stack.Screen name="PickLocation" component={PickLocation} />
        <Stack.Screen name="FreeOrPaid" component={FreeOrPaid} />
        <Stack.Screen name="AddTicket" component={AddTicket} />
        <Stack.Screen name="StandardTicketAdd" component={StandardTicketAdd} />
        <Stack.Screen name="PaymentCollectionSetup" component={PaymentCollectionSetup} />
        <Stack.Screen name="EventInstructions" component={EventInstructions} />
        <Stack.Screen name="StandardTicketAddAdvance" component={StandardTicketAddAdvance} />
        <Stack.Screen name="EventScreen" component={EventScreen} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignedInStack" component={SignedInStack} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="MyEventDetail" component={MyEventDetail} />
        <Stack.Screen name="ShareEvent" component={ShareEvent} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
        <Stack.Screen name="TicketInfo" component={TicketInfo} />
        <Stack.Screen name="EventReview" component={EventReview} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="Payment&PayoutMethod" component={PaymentMethod} />
        <Stack.Screen name="PaymentMethod1" component={PaymentMethod1} />
        <Stack.Screen name="PayoutMethod" component={PayoutMethod} />
        <Stack.Screen name="AttendeeRegistration" component={AttendeeRegistration} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="ViewTicket" component={ViewTicket} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
