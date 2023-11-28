import { NativeModules, PixelRatio, Share, Image, Linking, StyleSheet, Text, View, useWindowDimensions, TextInput, ScrollView, FlatList, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useScrollToTop } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from '../../constants/images';
import fonts from '../../constants/fonts';
import styles from './style';
import axios from 'axios';
import moment from 'moment';
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux'
import getDistance from '../../api/getDistance'
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const adUnitId = 'ca-app-pub-3940256099942544/2435281174'


const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;


const Dashboard = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.user.location)
  const userInfo = useSelector((state) => state.user.userInfo);
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState('')
  const [newEvents, setNewEvents] = useState([])
  const [newEvents1, setNewEvents1] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loader, setLoader] = useState(true)
  const scrollRef = useRef(null)
  const [preciseLocation,setPreciseLocation]=useState('')
  useScrollToTop(scrollRef)

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //      console.log('3287687328dy782t7823ytd78238');
  //   });
  
  //   return unsubscribe;
  // }, [navigation]);


  useEffect(() => {
    if (isFocused) {
      // getEvents();
      getCurrentLocation();
    }

  }, [isFocused])

  const getCurrentLocation=async()=>{
    let cityName=""
    let state = ""
    if(Platform.OS=='ios'){
      await Geolocation.requestAuthorization('always')
    }
      Geolocation.getCurrentPosition((position)=>{
        console.log('dshjgfsdgjhs',position.coords);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            console.log("eg7t23t87tet3t82t", JSON.stringify(json.results[0].address_components))
            let addressComponent = json.results[0].address_components;
            for(const component of addressComponent){
               if(component.types.includes('locality')){
                cityName = component.long_name;
                console.log('bvdfhjgjhjhgjhgjbbdfbdfs',cityName);
                // break;
               }
               if(component.types.includes('administrative_area_level_1')){
                console.log('fewfadsczxfewadsczx',component.long_name);
               state = component.long_name;
              //  break;
               }
            }
            let location = cityName + ", " + state
            setPreciseLocation(cityName + ", " + state)
            getEvents(location)
            // console.log('dsfewdsewdsavdsrefdga',add);
            // getEventCoords(cityName)
          })
      })
   
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    //  let info = await Auth.currentAuthenticatedUser({bypassCache:true});
    let info = await Auth.currentAuthenticatedUser();
    console.log('12dds3143465474', JSON.stringify(info));
    //  setToken(info.signInUserSession.idToken.payload.profile)
  }

  const getEvents = async (location) => {
    console.log('dwh872xsadsadasdsadast8dt82t8dt', userInfo.location);
    let data2 = JSON.stringify({
      "city_name": userInfo.location
    });

    let config3 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.cofitapp.com/api/get-event',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data2
    };

    axios.request(config3)
      .then(async (response) => {
        let newArr = [];
        let promises = response.data.map(async (item, index) => {

          let eventDate1 = item.date.start_date + " " + moment().year();
          let eventDate = moment(eventDate1).format("YYYY-MM-DD")
          let eventDate2 = moment(eventDate).unix();
          let currentDay = moment().format("YYYY-MM-DD")
          let isSameOrAfter = moment(eventDate).isSameOrAfter(currentDay)

          let destination = item.address[0] + " " + item.address[1]
          console.log('fdsjfkhkshfhjhdasaksssd',preciseLocation);
          let dis = await getDistance(location, destination)
          item.distance = dis;
          item.isShow = isSameOrAfter;
          item.timeStampVal = eventDate2;
          if (isSameOrAfter) {
            newArr.push(item)
          }
        })

        await Promise.all(promises).then(() => {
          setTimeout(() => {
            console.log('hiuewh983y928ye8y23ye2', response.data);
            newArr.sort((a, b) => {
              if (a.timeStampVal === b.timeStampVal) {
                // If two elements have same number, then the one who has larger rating.average wins
                return a.timeStampVal - b.timeStampVal;
              } else {
                // If two elements have different number, then the one who has larger number wins
                return a.timeStampVal - b.timeStampVal;
              }
            });
            console.log('sjkfhdfwsfsdzsdfshkhkshk', newArr);
            setNewEvents(newArr)
            setNewEvents1(newArr)
            setLoader(false)
          }, 500);
        })
      })
      .catch((error) => {
        setLoader(false)
        setNewEvents([])
        setNewEvents1([])
        console.log("errrriiiiiiiiddai", error);
      });

  }


  const onAddFilter = (value) => {
    setSelectedIndex(value)
    setSearchText('')
    if (value == 0) {
      setNewEvents(newEvents1)
    }
    else if (value == 1) {
      let today = moment().format("MM-DD-YYYY")
      let arr = [];
      newEvents1.map((item, index) => {
        const eventdate = moment(item.date.start_date, "MMM D");
        console.log('dsahfsagjgjaj', eventdate);
        const currentDate = moment();
        const isSameDay = eventdate.isSame(currentDate, 'day');
        if (isSameDay) {
          arr.push(item)
        }
      })
      setNewEvents(arr)
    }
    else if (value == 2) {
      const currentDate = moment();
      const date1 = currentDate.endOf('week');
      const formattedDate1 = moment(date1).format("MMM D")
      const date2 = currentDate.endOf('week').add(1, 'day');
      const formattedDate2 = moment(date2).format("MMM D")

      let arr = [];
      newEvents1.map((item, index) => {
        let eventdate = moment(item.date.start_date).format("MMM D")
        if (eventdate == formattedDate1 || eventdate == formattedDate2) {
          arr.push(item)
          console.log('same week same week');
        }
      })
      setNewEvents(arr)
    }
    else if (value == 3) {
      let week = moment();
      let arr = [];
      newEvents1.map((item, index) => {
        let eventDate = moment(item.date.start_date, "MMM D");
        const isSameYear = week.year() === eventDate.year();
        const isSameWeek = isSameYear && week.isoWeek() == eventDate.isoWeek();
        if (isSameWeek) {
          console.log('same week111w111111111');
          arr.push(item)
        }
      })
      setNewEvents(arr)

    }
    else if (value == 4) {
      let currentMonth = moment().format("MMM YYYY")
      let arr = [];
      newEvents1.map((item, index) => {
        let eventMonth = moment(item.date.start_date, "MMM D YYYY").format("MMM YYYY")
        if (eventMonth == currentMonth) {
          arr.push(item)
        }
      })
      setNewEvents(arr)
    }
  }

  const onSearchEvent = (value) => {
    setSearchText(value)
    if (value == '' || value.length == 0) {
      setNewEvents(newEvents1)
    } else {
      const newData = newEvents1.filter(item => {
        try {
          const itemData = item.title.toUpperCase();
          const textData = value.toUpperCase();
          return itemData.indexOf(textData) > -1

        }
        catch (error) {
        }

      })
      setNewEvents(newData)
    }
  }

  const onShareEvent = async (item) => {
    let shareLink = `https://apple.cofitapp.com?id=${item.id}`
    console.log('share event link', shareLink);
    // return;
    if(Platform.OS=='android'){
      Share.share({ url: shareLink , message:shareLink,title:shareLink }) 
    }else{
      Share.share({ url: shareLink })
    }
  }

  return (
    <View style={styles.mainView}>
      <ScrollView ref={scrollRef}>
        <View style={styles.view1}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.findText}>Find events in</Text>
            <View style={styles.newJersyView}>
              <View style={{ width: '80%', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate("ChangeLocation")} style={{ flexDirection: "row" }}>
                  <Text style={styles.newJersyText}>{userInfo.location}</Text>
                  <Image source={images.location} style={styles.locicon} />
                </TouchableOpacity>

              </View>
              <View style={{ width: '20%', alignItems: 'flex-end' }}>
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
                  // resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <Image source={(userInfo.profile_image==null || userInfo.profile_image=='null') ? images.backimg : {uri:userInfo.profile_image}} style={styles.profileImg} /> */}
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
        <View style={styles.searchView}>
          <View style={styles.searchView1}>
            <Image source={images.search} style={styles.searchIcon} />
            <TextInput
              placeholder='Search upcoming events'
              placeholderTextColor={"#B2BAC7"}
              value={searchText}
              keyboardType='web-search'
              onChangeText={(val) => onSearchEvent(val)}
              style={styles.searchTextInput}
            />
          </View>
          {/* <View style={styles.filterView}>
            <Image source={images.filter} style={styles.filterIcon} />
          </View> */}

        </View>
        {/* <View style={{}}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View> */}

        <View style={styles.view2}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(0)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 0 ? "#25C3F4" : "#fff", borderRadius: 5, height: 38, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, paddingHorizontal: 12, color: selectedIndex == 0 ? "#fff" : "#8B93A1" }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(1)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 1 ? "#25C3F4" : "#fff", borderRadius: 5, height: 38, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, paddingHorizontal: 12, color: selectedIndex == 1 ? "#fff" : "#8B93A1" }}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(2)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 2 ? "#25C3F4" : "#fff", height: 38, borderRadius: 5, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, paddingHorizontal: 12, color: selectedIndex == 2 ? "#fff" : "#8B93A1" }}>This weekend</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(3)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 3 ? "#25C3F4" : "#fff", height: 38, borderRadius: 5, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, paddingHorizontal: 12, color: selectedIndex == 3 ? "#fff" : "#8B93A1" }}>This week</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(4)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 4 ? "#25C3F4" : "#fff", height: 38, borderRadius: 5, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
              <Text style={{ fontFamily: fonts.SfPro_Bold, paddingHorizontal: 12, color: selectedIndex == 4 ? "#fff" : "#8B93A1" }}>This Month</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      
        {/* <Text style={styles.eventsText}>Events</Text> */}
        <View style={{flexDirection:"row",  marginTop: 30,
         marginHorizontal: width * .03,justifyContent:"space-between",alignItems:"center"}}>
<Text style={styles.eventsText}>Events</Text>  
{/* <TouchableOpacity onPress={()=> navigation.navigate("MyEvents")}>
<Image source={images.myEvents} style={styles.filterIcon} />
</TouchableOpacity > */}
        {/* <TouchableOpacity onPress={()=> navigation.navigate("MyEvents")} style={styles.filterView}>
            <Image source={images.myEvents} style={styles.filterIcon} />
            <Text style={{fontFamily: fonts.SfPro_Bold,color: "#fff",marginLeft:5}}>My Events</Text>
          </TouchableOpacity> */}
</View>
        {
          loader &&
          <ActivityIndicator color={'#000'} size={'large'} style={{ marginTop: 50 }} />
        }

        {
          (!loader && newEvents.length == 0) &&
          <Text style={{ fontSize: 16, textAlign: "center", fontFamily: fonts.SfPro_Medium, marginTop: 50 }}>no event found</Text>
        }

        {
          (!loader && newEvents.length != 0) &&
          <FlatList
            data={newEvents}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (

                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("EventDetail", { item: item, event: newEvents1,preciseLocation:preciseLocation })} activeOpacity={0.8} style={styles.flatListView}>
                    <View style={styles.flatListView1}>
                      <View style={styles.flatListItem} >
                        <ImageBackground style={styles.flatListImg} resizeMode="contain" source={{ uri: item.image }}>
                          <View style={styles.kmbutton}>
                            <Image source={images.car} style={styles.carImg} />
                            <Text style={styles.kmText}>{item.distance}</Text>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={styles.dateView}>
                        <Image source={images.time} style={styles.clockIcon} />
                        <Text style={styles.dateText}>{item.date.when}</Text>
                      </View>
                      <Text style={styles.summaryText}>{item.title}</Text>
                      <View style={styles.dateView}>
                        <Image source={images.location} style={styles.locIconB} />
                        <Text style={styles.locText}>{item.address[0] + " " + item.address[1]}</Text>
                      </View>
                      <View style={styles.view3} />
                      <TouchableOpacity onPress={() => onShareEvent(item)} style={styles.shareBtn}>
                        <Image source={images.share} style={styles.clockIcon} />
                        <Text style={styles.shareText}>Share event</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  {
                    (newEvents?.length != 0 && index == Math.round(newEvents?.length / 2)) &&
                    <View style={{ marginVertical: 10 }}>
                      <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                          requestNonPersonalizedAdsOnly: true,
                        }}
                      />
                    </View>
                  }

                </View>

              )
            }}
          />
        }

      </ScrollView>
    </View>

  )
}
export default Dashboard;