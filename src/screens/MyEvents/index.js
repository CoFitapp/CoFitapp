import {
  NativeModules,
  PixelRatio,
  Share,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../constants/images";
import fonts from "../../constants/fonts";
import styles from "./styles";
import axios from "axios";
import moment from "moment";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import getDistance from "../../api/getDistance";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import colors from "../../constants/colors";
import * as services from "../../constants/services";
import * as Url from "../../constants/url";
import FastImage from "react-native-fast-image";
// import * as Animatable from "react-native-animatable";

const adUnitId = "ca-app-pub-3940256099942544/2435281174";

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = (size) => size / fontScale;
// let ind = 0;

const MyEvents = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.user.location);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [newEvents, setNewEvents] = useState([]);
  const [newEvents1, setNewEvents1] = useState([]);
  const [bookedUpcomingEvents, setBookedUpcomingEvents] = useState([])
  const [bookedPastEvents, setBookedPastEvents] = useState([])
  const [isFetchingBookedEvents, setIsFetchingBookedEvents] = useState(true)
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const scrollRef = useRef(null);
  const [preciseLocation, setPreciseLocation] = useState("");
  const [isShowUpcomingEvents, setIsShowUpcomingEvents] = useState(true);
  const [isShowBookedEvents, setIsBookedEvents] = useState(true);
  const [accountInfo, setAccountInfo] = useState(null)
  console.log('dsajkdsahkhshdkjah', userInfo.id);
  useScrollToTop(scrollRef);

  useEffect(() => {
    if (isFocused) {
      // getEvents();
      getBookedEvents()
      getCurrentLocation();
    }
  }, [isFocused]);

  // useEffect(() => {

  //   setInterval(() => {

  //       setIsContentVisible(false)

  //   }, 5000);

  //   setTimeout(() => {
  //     setInterval(() => {
  //       console.log('current Index',ind);
  //       console.log('image array length',imagesArr.length);
  //       if (ind == imagesArr.length-1) {
  //         setCurrentIndex(0)
  //         ind=0;
  //         setActiveImage(imagesArr[0].image)
  //       } else {
  //        console.log('iewuyriyw');
  //         setActiveImage(imagesArr[ind + 1].image)
  //         setCurrentIndex(currentIndex + 1)
  //         ind=ind+1;
  //       }

  //         setIsContentVisible(true)

  //     }, 5000);
  //   }, 500);

  // }, [])

  const getBookedEvents = async () => {
    let url = `${Url.GET_BOOKED_EVENT}/${userInfo.id}`
    let res = await services.get(url)
    console.log('dssdddsdsadsadas', res);
    if (res.status && res?.bookedEvents && res?.bookedEvents?.length != 0) {
      let upcomingEvents = res.bookedEvents.filter(item => moment(item.eventDetails.events.endDate).isAfter())
      let pastEvents = res.bookedEvents.filter(item => !moment(item.eventDetails.events.endDate).isAfter())
      setBookedUpcomingEvents(upcomingEvents)
      // setBookedUpcomingEvents([])
      setBookedPastEvents(pastEvents)
    }
    setIsFetchingBookedEvents(false)
    console.log('dskjhsahddaskjkjhkad', JSON.stringify(res));
  }

  const getCurrentLocation = async () => {
    let cityName = "";
    let state = "";
    if (Platform.OS == "ios") {
      await Geolocation.requestAuthorization("always");
    }

    Geolocation.getCurrentPosition((position) => {
      console.log("dshjgfsdgjhs", position.coords);
      Geocoder.from(position.coords.latitude, position.coords.longitude).then(
        (json) => {
          console.log(
            "eg7t23t87tet3t82t",
            JSON.stringify(json.results[0].address_components)
          );
          let addressComponent = json.results[0].address_components;
          for (const component of addressComponent) {
            if (component.types.includes("locality")) {
              cityName = component.long_name;
              console.log("bvdfhjgjhjhgjhgjbbdfbdfs", cityName);
              // break;
            }
            if (component.types.includes("administrative_area_level_1")) {
              console.log("fewfadsczxfewadsczx", component.long_name);
              state = component.long_name;
              //  break;
            }
          }
          let location = cityName + ", " + state;
          setPreciseLocation(cityName + ", " + state);
          getEvents(location);
          // console.log('dsfewdsewdsavdsrefdga',add);
          // getEventCoords(cityName)
        }
      );
    });
  };

  useEffect(() => {
    if(isFocused) {
      retreiveAccount()
    }
  }, [isFocused])

  const retreiveAccount = async () => {
    console.log('userInfooooooo', userInfo);
    let url = `${Url.RETRIVE_STRIPE_ACCOUNT}/${userInfo?.stripeAccountId}`
    let res = await services.get(url)
    setAccountInfo(res)
    console.log('ressss11112222', res);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    //  let info = await Auth.currentAuthenticatedUser({bypassCache:true});
    let info = await Auth.currentAuthenticatedUser();
    console.log("12dds3143465474", JSON.stringify(info));
    //  setToken(info.signInUserSession.idToken.payload.profile)
  };

  const getEvents = async (location) => {
    console.log("dwh872xsadsadasdsadast8dt82t8dt", userInfo);

    let url = `${Url.GET_USER_EVENTS}/${userInfo.id}`;
    let res = await services.get(url);
    console.log('dasD23QW341E1', res.events);
    if (res.status && res.events.length != 0) {
      let newArr = [];
      let pastEvents1 = [];
      let promises = res.events.map(async (item, index) => {

        let eventDate = moment(item.startDate).format("YYYY-MM-DD");

        let currentDay = moment().format("YYYY-MM-DD");
        let isSameOrAfter = moment(eventDate).isSameOrAfter(currentDay);
        // console.log("1234454saqw>>>>>>>>>>>>>",moment(item.startDate).format("YYYY-MM-DD"));
        console.log('issame or after', isSameOrAfter);
        let destination = item.address[0] + " " + item.address[1];
        // console.log("fdsjfkhkshfhjhdasaksssd", preciseLocation);
        let dis = await getDistance(location, destination);
        item.distance = dis;
        item.isShow = isSameOrAfter;
        item.timeStampVal = item.startDate;
        if (isSameOrAfter) {
          newArr.push(item);
        } else {
          pastEvents1.push(item);
        }
      });

      await Promise.all(promises).then(() => {
        setTimeout(() => {
          // console.log('hiuewh983y928ye8y23ye2', response.data);
          newArr.sort((a, b) => {
            if (a.timeStampVal === b.timeStampVal) {
              // If two elements have same number, then the one who has larger rating.average wins
              return b.timeStampVal - a.timeStampVal;
            } else {
              // If two elements have different number, then the one who has larger number wins
              return b.timeStampVal - a.timeStampVal;
            }
          });
          pastEvents1.sort((a, b) => {
            if (a.timeStampVal === b.timeStampVal) {
              // If two elements have same number, then the one who has larger rating.average wins
              return b.timeStampVal - a.timeStampVal;
            } else {
              // If two elements have different number, then the one who has larger number wins
              return b.timeStampVal - a.timeStampVal;
            }
          });
          console.log("sjkfhdfsasawsfsasasassdssadzsdfshkhkshk", newArr);
          setNewEvents(newArr);
          setNewEvents1(newArr);
          setPastEvents(pastEvents1);
          // setPastEvents()
          setLoader(false);
        }, 500);
      });
    } else {
      setNewEvents([]);
      setNewEvents1([]);
      setPastEvents([]);
      setLoader(false);
    }
    console.log("dskjhhkhaksdsjhjkhjkdas", JSON.stringify(res));
    return;
    let data2 = JSON.stringify({
      city_name: userInfo.location,
    });

    let config3 = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.cofitapp.com/api/get-event",
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    };

    axios
      .request(config3)
      .then(async (response) => {
        let newArr = [];
        let promises = response.data.map(async (item, index) => {
          let eventDate1 = item.date.start_date + " " + item.year;
          let eventDate = moment(eventDate1).format("YYYY-MM-DD");
          let eventDate2 = moment(eventDate).unix();
          let currentDay = moment().format("YYYY-MM-DD");
          let isSameOrAfter = moment(eventDate).isSameOrAfter(currentDay);

          let destination = item.address[0] + " " + item.address[1];
          console.log("fdsjfkhkshfhjhdasaksssd", preciseLocation);
          let dis = await getDistance(location, destination);
          item.distance = dis;
          item.isShow = isSameOrAfter;
          item.timeStampVal = eventDate2;
          if (isSameOrAfter) {
            newArr.push(item);
          }
        });

        await Promise.all(promises).then(() => {
          setTimeout(() => {
            console.log("hiuewh983y928ye8y23ye2", response.data);
            newArr.sort((a, b) => {
              if (a.timeStampVal === b.timeStampVal) {
                // If two elements have same number, then the one who has larger rating.average wins
                return a.timeStampVal - b.timeStampVal;
              } else {
                // If two elements have different number, then the one who has larger number wins
                return a.timeStampVal - b.timeStampVal;
              }
            });
            console.log("sjkfhdfwsfsdzsdfshkhkshk", newArr);
            setNewEvents(newArr);
            setNewEvents1(newArr);
            setLoader(false);
          }, 500);
        });
      })
      .catch((error) => {
        setLoader(false);
        setNewEvents([]);
        setNewEvents1([]);
        console.log("errrriiiiiiiiddai", error);
      });
  };

  const onPressAdd =()=> {
    console.log('ACCOUNT INFOOOO>>>>>>', accountInfo);
    if(accountInfo?.account?.capabilities?.transfers != "active") {
      Alert.alert("Cofit App",
      "Please complete your account setup to create any event.", [
      { 'text': "Cancel", style: "cancel", onPress: () => console.log('cancel pressed') },
      { 'text': 'Ok', onPress: () => navigation.navigate('PayoutMethod') }
    ])
    }else{
      navigation.navigate("StepsScreen")
    }
  }

  const onAddFilter = (value) => {
    setSelectedIndex(value);
    setSearchText("");
    if (value == 0) {
      setNewEvents(newEvents1);
    } else if (value == 1) {
      let today = moment().format("MM-DD-YYYY");
      let arr = [];
      newEvents1.map((item, index) => {
        const eventdate = moment(item.date.start_date, "MMM D");
        console.log("dsahfsagjgjaj", eventdate);
        const currentDate = moment();
        const isSameDay = eventdate.isSame(currentDate, "day");
        if (isSameDay) {
          arr.push(item);
        }
      });
      setNewEvents(arr);
    } else if (value == 2) {
      const currentDate = moment();
      const date1 = currentDate.endOf("week");
      const formattedDate1 = moment(date1).format("MMM D");
      const date2 = currentDate.endOf("week").add(1, "day");
      const formattedDate2 = moment(date2).format("MMM D");

      let arr = [];
      newEvents1.map((item, index) => {
        let eventdate = moment(item.date.start_date).format("MMM D");
        if (eventdate == formattedDate1 || eventdate == formattedDate2) {
          arr.push(item);
          console.log("same week same week");
        }
      });
      setNewEvents(arr);
    } else if (value == 3) {
      let week = moment();
      let arr = [];
      newEvents1.map((item, index) => {
        let eventDate = moment(item.date.start_date, "MMM D");
        const isSameYear = week.year() === eventDate.year();
        const isSameWeek = isSameYear && week.isoWeek() == eventDate.isoWeek();
        if (isSameWeek) {
          console.log("same week111w111111111");
          arr.push(item);
        }
      });
      setNewEvents(arr);
    } else if (value == 4) {
      let currentMonth = moment().format("MMM YYYY");
      let arr = [];
      newEvents1.map((item, index) => {
        let eventMonth = moment(item.date.start_date, "MMM D YYYY").format(
          "MMM YYYY"
        );
        if (eventMonth == currentMonth) {
          arr.push(item);
        }
      });
      setNewEvents(arr);
    }
  };

  const onSearchEvent = (value) => {
    setSearchText(value);
    if (value == "" || value.length == 0) {
      setNewEvents(newEvents1);
    } else {
      const newData = newEvents1.filter((item) => {
        try {
          const itemData = item.title.toUpperCase();
          const textData = value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } catch (error) { }
      });
      setNewEvents(newData);
    }
  };

  const onShareEvent = async (item) => {
    let shareLink = `https://apple.cofitapp.com?id=${item.id}`;
    console.log("share event link", shareLink);
    // return;
    if (Platform.OS == "android") {
      Share.share({ url: shareLink, message: shareLink, title: shareLink });
    } else {
      Share.share({ url: shareLink });
    }
  };

  return (
    <View style={styles.mainView}>

      <Text style={{ textAlign: "center", fontSize: 18, fontFamily: fonts.SfPro_Bold, color: "#0D131F" }}>My Events</Text>
      {/* <View style={styles.view1}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.findText}>Find events in</Text>
          <View style={{ width: '80%', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate("ChangeLocation")} style={{ flexDirection: "row", marginTop: 5 }}>
              <Image source={images.location} style={styles.locicon} />
              <Text style={styles.newJersyText}>{userInfo.location}</Text>
            </TouchableOpacity>

          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignedInStack", { screen: "Profile" })}>
          <FastImage
            style={styles.profileImg}
            source={
              (userInfo.profile_image == null || userInfo.profile_image == 'null')
                ?
                images.backimg
                :
                {
                  uri: userInfo.profile_image,
                  priority: FastImage.priority.high,
                }}
          />
        </TouchableOpacity>


      </View> */}

      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginLeft: width * 0.03,
          width: width * 0.94,
          justifyContent: "flex-end",
        }}
      >
        {/* <TouchableOpacity
          // onPress={() => navigation.navigate("AddEvent")}
          onPress={() => navigation.navigate("StepsScreen")}
          style={{
            paddingHorizontal: 10,
            height: 40,
            alignItems: "center",
            backgroundColor: colors.orange_light,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: "row",
            borderColor: "#DCE1E9",
          }}
        >
          <Image
            source={images.add}
            style={{
              height: 15,
              width: 15,
              resizeMode: "contain",
              tintColor: "#fff",
            }}
          />
          <Text
            style={{
              fontFamily: fonts.SfPro_Bold,
              color: "#fff",
              marginLeft: 5,
            }}
          >
            Add Events
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: width * 0.04,
          justifyContent: "space-between",
          marginBottom: 10,
          height: 32, alignItems: "center",
          backgroundColor: "#e3e1e1",
          borderRadius: 8,
          // paddingHorizontal:3,

        }}
      >
        <TouchableOpacity
          onPress={() => setIsBookedEvents(true)}
          style={{
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: width * 0.44,
            marginLeft: 3,
            backgroundColor: isShowBookedEvents ? "#fff" : undefined,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: fonts.SfPro_Medium,
            }}
          >
            Booked
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsBookedEvents(false)}
          style={{
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            width: width * 0.44,
            marginRight: 3,
            backgroundColor: !isShowBookedEvents ? "#fff" : undefined,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: fonts.SfPro_Medium,
            }}
          >
            Hosted
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginLeft: width * 0.03, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => setIsShowUpcomingEvents(true)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isShowUpcomingEvents ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: isShowUpcomingEvents ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            height: 37
          }}>
          <Text
            style={{
              color: isShowUpcomingEvents ? "#fff" : "#000",
              fontFamily: isShowUpcomingEvents ? fonts.SfPro_Semibold : fonts.SfPro_Regular,
              paddingHorizontal: 15,
              // paddingVertical: 10
            }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsShowUpcomingEvents(false)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: !isShowUpcomingEvents ? "#25C3F4" : undefined,
            borderWidth: 1,
            borderColor: !isShowUpcomingEvents ? "#25C3F4" : "#e3e1e1",
            borderRadius: 8,
            marginLeft: 15,
            height: 37
          }}>
          <Text style={{ color: !isShowUpcomingEvents ? "#fff" : "#000", fontFamily: !isShowUpcomingEvents ? fonts.SfPro_Semibold : fonts.SfPro_Regular, paddingHorizontal: 12, }}>Past</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        height: 20, width: "100%", backgroundColor: "#fff", marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
      }}>

      </View>
      <ScrollView style={{ backgroundColor: "#E7ECF0" }} ref={scrollRef}>

        {loader && (
          <ActivityIndicator
            color={"#000"}
            size={"large"}
            style={{ marginTop: 50 }}
          />
        )}

        {!loader && newEvents.length == 0 && isShowUpcomingEvents && !isShowBookedEvents && (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: fonts.SfPro_Medium,
              marginTop: 50,
            }}
          >
            no upcoming event found
          </Text>
        )}

        {/* {!isFetchingBookedEvents && bookedUpcomingEvents.length == 0 && isShowUpcomingEvents && isShowBookedEvents && (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: fonts.SfPro_Medium,
              marginTop: 50,
            }}
          >
            no upcoming event found1
          </Text>
        )} */}

        {!isFetchingBookedEvents && bookedPastEvents.length == 0 && !isShowUpcomingEvents && isShowBookedEvents && (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: fonts.SfPro_Medium,
              marginTop: 50,
            }}
          >
            no past event found
          </Text>
        )}

        {!loader && pastEvents.length == 0 && !isShowUpcomingEvents && !isShowBookedEvents && (
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: fonts.SfPro_Medium,
              marginTop: 50,
            }}
          >
            no past event found
          </Text>
        )}

        {!isFetchingBookedEvents && bookedUpcomingEvents.length == 0 && isShowBookedEvents && isShowUpcomingEvents && (
          <View>
            <FastImage source={images.noevent} style={styles.noEventImage} />
            <Text style={styles.noEventText}>No Upcoming Events</Text>
            <Text style={styles.exploreText}>Explore events near you</Text>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Home")}
              style={{ justifyContent: "center", alignItems: "center", height: 40, width: "94%", backgroundColor: colors.orange_dark, borderRadius: 8, marginTop: 35, alignSelf: "center" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 16, color: "#fff" }}>Explore events on Cofit</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loader && newEvents.length != 0 && isShowUpcomingEvents && !isShowBookedEvents && (
          <View style={{ marginHorizontal: '5%' }}>
            <Text style={{ fontFamily: fonts.SfPro_Heavy, fontSize: 18, marginVertical: 25, }}>{isShowBookedEvents ? "My Bookings" : "Events Organized"}</Text>

            <FlatList
              data={newEvents}
              style={{}}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', padding: '5%', backgroundColor: "#fff", borderRadius: 11 }}>
                    <View style={{ flexDirection: "row", height: 75 }}>
                      <View style={{ width: "30%", }}>
                        <FastImage
                        source={{ uri: item.image }}
                        style={{ height: '100%', width: '100%', borderRadius: 6 }}
                        />
                        {/* <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%', borderRadius: 6 }} /> */}
                      </View>
                      <View style={{ width: "70%", flexDirection: "column", paddingLeft: 10 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, color: colors.textBlack, fontFamily: fonts.SfPro_Bold }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.date.when}</Text>
                        <Text numberOfLines={2} style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.address[0] + " " + (item.address[1] ? item.address[1] : "")}</Text>

                      </View>

                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EventScreen", {
                          item: item,
                          preciseLocation: preciseLocation,
                        })
                      }
                      style={{ justifyContent: "center", alignItems: "center", height: 40, width: "100%", backgroundColor: colors.orange_dark, borderRadius: 11, marginTop: 35 }}>
                      <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 16, color: "#fff" }}>Manage Event</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row', width: "100%", paddingTop: 10 }}>
                      <View style={{ width: '50%', }}>
                        <View style={{ width: '90%' }}>
                          <Image source={{ uri: item.image }} style={{ height: 130, width: '100%', borderRadius: 10 }} />
                        </View>
                      </View>
                      <View style={{ width: '50%', padding: 5 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, color: '#020A23', fontFamily: fonts.SfPro_Bold }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, color: '#333333', marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.date.when}</Text>
                        <Text numberOfLines={3} style={{ fontSize: 12, color: '#333333', marginTop: 5 }}>{item.address[0] + " " + (item.address[1] ? item.address[1] : "")}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '10%', width: '100%', padding: 5 }}>
                          <View style={{ width: '20%', }}>

                          </View>
                          <TouchableOpacity
                          onPress={()=>
                                navigation.navigate("EventScreen", {
                          item: item,
                          preciseLocation: preciseLocation,
                        })
                          }
                          style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" }}>
                            <Image source={images.pen3} style={{ height: 20, width: 20, resizeMode: 'contain', marginRight: 3 }}></Image>

                            <Text style={{ textAlign: 'right', alignSelf: "flex-end", textDecorationLine: 'underline', marginLeft: '3%', fontFamily: fonts.SfPro_Semibold,fontSize:14,color:"#000000" }}>Manage event</Text>

                          </TouchableOpacity>

                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                      <View style={{ width: '20%', borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Price</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontFamily: fonts.SfPro_Bold, }}>$ {("eventTickets" in item==true  && item.eventTickets.length != 0) ? item?.eventTickets[0].price : 0}</Text>
                      </View>
                      <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '20%', marginLeft: '2%', padding: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Sold</Text>
                        <Text style={{ color: '#468847', fontSize: 15, fontFamily: fonts.SfPro_Bold }}>0</Text>
                      </View>
                      <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '23%', marginLeft: '2%', padding: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Unsold</Text>
                        <Text style={{ color: colors.orange_dark, fontSize: 15, fontFamily: fonts.SfPro_Bold }}>{("eventTickets" in item==true  && item.eventTickets.length != 0) ? item?.eventTickets[0].number : 0}</Text>
                      </View>
                      <View style={{ backgroundColor: colors.orange_dark, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '32%', marginLeft: '2%', padding: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 15, fontFamily: fonts.SfPro_Bold }}>Stop Sales</Text>
                      </View>
                    </View> */}
                  </View>

                );
              }}
            />
          </View>

        )}

        {!loader && pastEvents.length != 0 && !isShowUpcomingEvents && !isShowBookedEvents && (
          <View style={{ marginHorizontal: "5%" }}>
            <Text style={{ fontFamily: fonts.SfPro_Heavy, fontSize: 18, marginVertical: 25, }}>{isShowBookedEvents ? "My Bookings" : "Events Organized"}</Text>
            <FlatList
              data={pastEvents}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', padding: '5%', backgroundColor: "#fff", borderRadius: 10 }}>
                    <View style={{ flexDirection: "row", height: 75 }}>
                      <View style={{ width: "30%", }}>
                        <FastImage
                        source={{ uri: item.image }}
                        style={{ height: '100%', width: '100%', borderRadius: 6 }}
                        />
                        {/* <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%', borderRadius: 6 }} /> */}
                      </View>
                      <View style={{ width: "70%", flexDirection: "column", paddingLeft: 10 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, color: colors.textBlack, fontFamily: fonts.SfPro_Bold }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.date.when}</Text>
                        <Text numberOfLines={2} style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.address[0] + " " + (item.address[1] ? item.address[1] : "")}</Text>

                      </View>

                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EventScreen", {
                          item: item,
                          preciseLocation: preciseLocation,
                        })
                      }
                      style={{ justifyContent: "center", alignItems: "center", height: 40, width: "100%", backgroundColor: colors.orange_dark, borderRadius: 11, marginTop: 35 }}>
                      <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 16, color: "#fff" }}>Manage Event</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row', width: "100%", paddingTop: 10 }}>
                    <View style={{ width: '50%', }}>
                      <View style={{ width: '90%' }}>
                        <Image source={{ uri: item.image }} style={{ height: 130, width: '100%', borderRadius: 10 }} />
                      </View>
                    </View>
                    <View style={{ width: '50%', padding: 5 }}>
                      <Text numberOfLines={1} style={{ fontSize: 16, color: '#020A23', fontFamily: fonts.SfPro_Bold }}>{item.title}</Text>
                      <Text style={{ fontSize: 12, color: '#333333', marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item.date.when}</Text>
                      <Text numberOfLines={3} style={{ fontSize: 12, color: '#333333', marginTop: 5 }}>{item.address[0] + " " + (item.address[1] ? item.address[1] : "")}</Text>
                      <View style={{ flexDirection: 'row', marginVertical: '10%', width: '100%', padding: 5 }}>
                        <View style={{ width: '20%', }}>

                        </View>
                        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center" }}>
                          <Image source={images.pen3} style={{ height: 20, width: 20, resizeMode: 'contain', marginRight: 3 }}></Image>

                          <Text style={{ textAlign: 'right', alignSelf: "flex-end", textDecorationLine: 'underline', marginLeft: '3%', fontFamily: fonts.SfPro_Semibold,fontSize:14,color:"#000000" }}>Manage event</Text>

                        </View>

                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                    <View style={{ width: '20%', borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Price</Text>
                      {
                        ("eventTickets" in item==true  && item.eventTickets.length != 0)
                        ?
                        <Text style={{ color: 'black', fontSize: 15, fontFamily: fonts.SfPro_Bold, }}>$ {item.eventTickets[0].price}</Text>
                        :
                        <Text style={{ color: 'black', fontSize: 15, fontFamily: fonts.SfPro_Bold, }}>$ 0</Text>
                      }
                    </View>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '20%', marginLeft: '2%', padding: 10 }}>
                      <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Sold</Text>
                      <Text style={{ color: '#468847', fontSize: 15, fontFamily: fonts.SfPro_Bold }}>0</Text>
                    </View>
                    <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '23%', marginLeft: '2%', padding: 10 }}>
                      <Text style={{ color: 'black', fontSize: 14, fontFamily: fonts.SfPro_Medium }}>Unsold</Text>
                      {
                        ("eventTickets" in item==true  && item.eventTickets.length != 0)
                        ?
                      <Text style={{ color: colors.orange_dark, fontSize: 15, fontFamily: fonts.SfPro_Bold }}>{item.eventTickets[0].number}</Text>
                      :
                      <Text style={{ color: colors.orange_dark, fontSize: 15, fontFamily: fonts.SfPro_Bold }}>{0}</Text>
                      }
                    </View>
                    <View style={{ backgroundColor: colors.orange_dark, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 10, width: '32%', marginLeft: '2%', padding: 10 }}>
                      <Text style={{ color: '#fff', fontSize: 15, fontFamily: fonts.SfPro_Bold }}>Stop Sales</Text>
                    </View>
                  </View> */}
                  </View>

                );
              }}
            />
          </View>
        )}

        {!isFetchingBookedEvents && bookedUpcomingEvents.length != 0 && isShowBookedEvents && isShowUpcomingEvents && (
          <View style={{ marginHorizontal: '5%' }}>
            <Text style={{ fontFamily: fonts.SfPro_Heavy, fontSize: 18, marginVertical: 25, }}>{isShowBookedEvents ? "My Bookings" : "Events Organized"}</Text>
            <FlatList
              data={bookedUpcomingEvents}
              style={{}}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', padding: '5%', backgroundColor: "#fff", borderRadius: 11 }}>
                    <View style={{ flexDirection: "row", }}>
                      <View style={{ width: "30%", }}>
                        <FastImage
                        source={{ uri: item?.eventDetails?.events?.image }}
                        style={{ height: 85, width: '100%', borderRadius: 6 }}
                        />
                        {/* <Image source={{ uri: item?.eventDetails?.events?.image }} style={{ height: 85, width: '100%', borderRadius: 6 }} /> */}
                      </View>
                      <View style={{ width: "70%", flexDirection: "column", paddingLeft: 10 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, color: colors.textBlack, fontFamily: fonts.SfPro_Bold }}>{item?.eventDetails?.events?.title}</Text>
                        <Text style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item?.eventDetails?.events?.date.when}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item?.eventDetails?.events?.address[0] + " " + (item?.eventDetails?.events?.address[1] ? item?.eventDetails?.events?.address[1] : "")}</Text>
                        {
                          item?.bookedEvents?.map((item1, index1) => {
                            return (
                              <View>
                                <Text numberOfLines={1} style={{ fontSize: 12, color: colors.blackMedium, marginTop: 5, fontFamily: fonts.SfPro_Medium }}>{`${item1?.planId} Tickets ($${item1?.amount}) : ${item1?.quantity} ticket`}</Text>
                              </View>
                            )
                          })
                        }

                      </View>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewTicket", { item: item?.eventDetails?.events, bookEvents: item?.bookedEvents })}
                      style={{ justifyContent: "center", alignItems: "center", height: 40, width: "100%", borderWidth: 1, borderColor: colors.orange_dark, borderRadius: 11, marginTop: 35 }}>
                      <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 16, color: colors.orange_dark }}>View Ticket</Text>
                    </TouchableOpacity>

                  </View>

                );
              }}
            />
          </View>

        )}

        {!isFetchingBookedEvents && bookedPastEvents.length != 0 && isShowBookedEvents && !isShowUpcomingEvents && (
          <View style={{ marginHorizontal: '5%' }}>
            <Text style={{ fontFamily: fonts.SfPro_Heavy, fontSize: 18, marginVertical: 25, }}>{isShowBookedEvents ? "My Bookings" : "Events Organized"}</Text>
            <FlatList
              data={bookedPastEvents}
              style={{}}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', padding: '5%', backgroundColor: "#fff", borderRadius: 11 }}>
                    <View style={{ flexDirection: "row", }}>
                      <View style={{ width: "30%", }}>
                        <FastImage
                        source={{ uri: item?.eventDetails?.events?.image }}
                        style={{ height: 85, width: '100%', borderRadius: 6 }}
                        />
                        {/* <Image source={{ uri: item?.eventDetails?.events?.image }} style={{ height: 85, width: '100%', borderRadius: 6 }} /> */}
                      </View>
                      <View style={{ width: "70%", flexDirection: "column", paddingLeft: 10 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, color: colors.textBlack, fontFamily: fonts.SfPro_Bold }}>{item?.eventDetails?.events?.title}</Text>
                        <Text style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item?.eventDetails?.events?.date.when}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: colors.textRegular, marginTop: 5, fontFamily: fonts.SfPro_Regular }}>{item?.eventDetails?.events?.address[0] + " " + (item?.eventDetails?.events?.address[1] ? item?.eventDetails?.events?.address[1] : "")}</Text>
                        {
                          item?.bookedEvents?.map((item1, index1) => {
                            return (
                              <View>
                                <Text numberOfLines={1} style={{ fontSize: 12, color: colors.blackMedium, marginTop: 5, fontFamily: fonts.SfPro_Medium }}>{`${item1?.planId} Tickets ($${item1?.amount}) : ${item1?.quantity} ticket`}</Text>
                              </View>
                            )
                          })
                        }

                      </View>

                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewTicket", { item: item?.eventDetails?.events, bookEvents: item?.bookedEvents })}
                      style={{ justifyContent: "center", alignItems: "center", height: 40, width: "100%", borderWidth: 1, borderColor: colors.orange_dark, borderRadius: 11, marginTop: 35 }}>
                      <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 16, color: colors.orange_dark }}>View Ticket</Text>
                    </TouchableOpacity>

                  </View>

                );
              }}
            />
          </View>

        )}

      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          // left: 0,
          right: 20,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity disabled={accountInfo === null ? true : false} onPress={() => onPressAdd()} style={{ justifyContent: "center", alignItems: "center", height: 48, width: 48, borderRadius: 24, backgroundColor: "#25C3F4" }}>
          <Image source={images.add} style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: "#fff", }} />

        </TouchableOpacity>

      </View>
    </View>
  );
};
export default MyEvents;
