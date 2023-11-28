import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Linking, StatusBar } from 'react-native';
import LoginScreen from "../screens/Login/index";
import OnBoardingScreen from "../screens/OnBoarding"
import SplashScreen from "../screens/Splash/index";
import MapScreen from "../screens/Map/index";
import Profile from "../screens/Profile/index";
import DashboardScreen from "../screens/Dashboard/index";
import SelectLocation from "../screens/SelectLocation";
import ChangeLocation from "../screens/ChangeLocation";
import EventDetail from "../screens/EventDetail/index";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const SignedInStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,

                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0
                    // shadowColor: '#171717',
                    // shadowOffset: { width: 5, height: 4 },
                    // shadowOpacity: 0.7,
                    // shadowRadius: 5,

                },
                tabBarLabelStyle: { fontSize: 12, fontFamily: fonts.SfPro_Regular, paddingBottom: 5, }
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
                                    resizeMode: "contain"
                                }}
                                source={focused ? images.home3 : images.home2}
                            ></Image>
                            <Text style={{ fontFamily: fonts.SfPro_Medium, color: focused ? colors.orange_light : 'grey' }}>Home</Text>
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
                                    resizeMode: "contain"
                                }}
                                source={focused ? images.map_active : images.map} />
                            <Text style={{ fontFamily: fonts.SfPro_Medium, color: focused ? colors.orange_light : 'grey' }}>Map</Text>

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
                                    resizeMode: "contain"
                                }}
                                source={focused ? images.home_active : images.home}
                            ></Image>
                            <Text style={{ fontFamily: fonts.SfPro_Medium, color: focused ? colors.orange_light : 'grey' }}>My Events</Text>

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
                                    resizeMode: "contain"
                                }}
                                source={focused ? images.profile_active : images.profile}
                            ></Image>
                            <Text style={{ fontFamily: fonts.SfPro_Medium, color: focused ? colors.orange_light : 'grey' }}>Profile</Text>

                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default function navigation() {
    const isLoggedIn = useSelector(state => state.user.status)
    const navigationRef = useNavigationContainerRef();

    useEffect(() => {
        const linkingEvent = Linking.addEventListener('url', handleDeepLink);
        Linking.getInitialURL().then(url => {
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
        let eventId = url.url.split("id=")[1]
        if (url != null && eventId != undefined) {
            // let url = url.url

            console.log('dsjkhfweihuhfffffdsuihgiuiuoui', eventId);
            if (isLoggedIn) {
                navigationRef.navigate("ShareEvent", { item: eventId })
            }

        }

        console.log('dsajdxaasjhkhkhajk', url);
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar backgroundColor={'gray'} />
            <Stack.Navigator initialRouteName={isLoggedIn ? 'SignedInStack' : 'OnBoardingScreen'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="SignedInStack" component={SignedInStack} options={{ gestureEnabled: false }} />
                <Stack.Screen name="SelectLocation" component={SelectLocation} />
                <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
                <Stack.Screen name="EventDetail" component={EventDetail} />
                <Stack.Screen name="ShareEvent" component={ShareEvent} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="AddEvent" component={AddEvent} />
                <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
                <Stack.Screen name="TicketInfo" component={TicketInfo} />
                <Stack.Screen name="EventReview" component={EventReview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}