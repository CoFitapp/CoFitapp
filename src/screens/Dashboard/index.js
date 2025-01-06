import { NativeModules, PixelRatio, Share, Image, Linking, StyleSheet, Text, View, useWindowDimensions, TextInput, ScrollView, FlatList, ImageBackground, TouchableOpacity, Platform, Dimensions } from 'react-native'
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
// import getDistance from '../../api/getDistance'
import getDistance from 'geolib/es/getDistance';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { logout, updateUser, location, login } from '../../redux/slices/userSlice'
// import {
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   TestIds,
//   AdEventType,
//   RewardedAd,
//   RewardedAdEventType,
// } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useRef } from 'react';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';

import Geocoder from 'react-native-geocoding';
import colors from '../../constants/colors';
import { TextRegular } from '../../components/AppText';
import { AnimatedScrollView } from '@kanelloc/react-native-animated-header-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// const adUnitId = 'ca-app-pub-3940256099942544/2435281174'

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;

const Dashboard = () => {
  const bottomSheet = useRef();
  const { top, bottom } = useSafeAreaInsets()
  console.log('3826173681268saa', top)
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.status);
  const userLocation = useSelector(state => state.user.location)
  const userInfo = useSelector((state) => state.user.userInfo);
  const searchLocation = userInfo && userInfo.search_location ? userInfo.search_location : userInfo?.location
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState('')
  const [newEvents, setNewEvents] = useState([])
  const [newEvents1, setNewEvents1] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loader, setLoader] = useState(true)
  const scrollRef = useRef(null)
  const [preciseLocation, setPreciseLocation] = useState('')
  const [currentImage, setCurrentImage] = useState(0)
  const [cities, setCities] = useState([])
  const [cities1, setCities1] = useState([])
  const [isCityInputFocused, setIsCityInputFocused] = useState(false)
  const [searchCity, setSearchCity] = useState('')
  const [imageArr, setImageArr] = useState([
    { 'id': 1, 'image': require("../../assets/images/stockImage1.jpg") },
    { 'id': 2, 'image': require("../../assets/images/stockImage2.jpg") },
    { 'id': 3, 'image': require("../../assets/images/stockImage3.jpg") },
    { 'id': 4, 'image': require("../../assets/images/stockImage4.jpg") },
    { 'id': 5, 'image': require("../../assets/images/stockImage5.jpg") },
  ])
  const stockImageArr = [
    { 'id': 1, 'image': require("../../assets/images/stockImage1.jpg") },
    { 'id': 2, 'image': require("../../assets/images/stockImage2.jpg") },
    { 'id': 3, 'image': require("../../assets/images/stockImage3.jpg") },
    { 'id': 4, 'image': require("../../assets/images/stockImage4.jpg") },
    { 'id': 5, 'image': require("../../assets/images/stockImage5.jpg") },
  ]
  // console.log('dsadmahdddaddssdsddssadssasaashdkash',imageArr[0].image);
  useScrollToTop(scrollRef)

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //      console.log('3287687328dy782t7823ytd78238');
  //   });

  //   return unsubscribe;
  // }, [navigation]);


  useEffect(() => {
    // if (isFocused) {
      getEvents();
      console.log('fsksjjlkasjlkla');
      getCurrentLocation();
    // }

  }, [searchLocation])

   useEffect(()=>{
    getAllCities()
   },[])

  const getAllCities = async () => {
    let res = await services.get(Url.GET_ALL_CITIES)
    console.log('GET ALL CITIES RESPONSEEEEE111', res);
    if (res.status) {
      if (res?.cities) {

        setCities(res.cities.sort((a, b) => a.city.localeCompare(b.city)))
        setCities1(res.cities.sort((a, b) => a.city.localeCompare(b.city)))
      }
    }
  }

  useEffect(()=>{
    if(cities1?.length!=0){
      const filtered = cities1.filter((item) =>
      item.city.toLowerCase().includes(searchCity.toLowerCase())
    );
    setCities(filtered);
    }
  },[searchCity, cities1])

  // const handleSearch = (text) => {
  //   const searchText = text.toLowerCase();
  //   const filteredData = cities1.filter((city) =>
  //     city.city.toLowerCase().includes(searchText)
  //   );
  //   setCities(filteredData);
  //   setSearchCity(text);
  // };

  const getCurrentLocation = async () => {
    console.log('dasdhqiuwajkb');

    // if (Platform.OS === 'ios') {
    //   Geolocation.requestAuthorization('always').then(res=> {
    //     console.log('riueyrweyryiuwyiyiwyiy', res);
    //     if(res == 'denied' || res == 'disabled' || res == 'restricted') {
    //       getEvents()
    //     }
    //   })
    //   .catch(err =>{
    //     console.log('ew9uuewqoiue8923eu8923eu2', err);

    //   })
    // }
    // console.log('49832774897897982379792');

    Geolocation.getCurrentPosition((position) => {
      console.log('dshjgsasasasasasafsdgjhs', position.coords);
      try {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(position.coords.latitude)}&lon=${parseFloat(position.coords.longitude)}&format=json`,
        };

     axios.request(config)
     .then((response) => {
     console.log("locatiotioitoitoiotio", JSON.stringify(response.data));

     let city = response.data.address?.city || response.data.address?.town
     let state = response.data.address?.state || response.data.address?.country
     console.log('3128731297129da312979', city);
         let location = city + ", " + state
          setPreciseLocation(location)
          if(!isLoggedIn) {
            dispatch(updateUser({...userInfo, location: location }))
          }
          getEvents(location, position.coords.latitude, position.coords.longitude)
     })
    .catch((error) => {
       console.log(error);
     });

      } catch (error) {
        console.log('ryyryiewuyryweiyuiwyeywi');

        alert('Error while getting user location', error?.message)
      }
      // Geocoder.from(position.coords.latitude, position.coords.longitude)
      //   .then((json) => {
      //     console.log("eg7t23t87tet3t82t", JSON.stringify(json.results[0].address_components))
      //     let addressComponent = json.results[0].address_components;
      //     for (const component of addressComponent) {
      //       if (component.types.includes('locality')) {
      //         cityName = component.long_name;
      //         console.log('bvdfhjgjhjhgjhgjbbdfbdfs', cityName);
      //         // break;
      //       }
      //       if (component.types.includes('administrative_area_level_1')) {
      //         console.log('fewfadsczxfewadsczx', component.long_name);
      //         state = component.long_name;
      //         //  break;
      //       }
      //     }
      //     let location = cityName + ", " + state
      //     setPreciseLocation(cityName + ", " + state)
      //     getEvents(location, position.coords.latitude, position.coords.longitude)
      //     // console.log('dsfewdsewdsavdsrefdga',add);
      //     // getEventCoords(cityName)
      //   })
      //   .catch(err => {
      //     console.log('error in getting location', err);
      //   })
    })
   console.log('439287yey3ey38yey28y');

  }

  // useEffect(() => {
  //   getUserDetails();
  // }, [])

  // const getUserDetails = async () => {
  //   //  let info = await Auth.currentAuthenticatedUser({bypassCache:true});
  //   let info = await Auth.currentAuthenticatedUser();
  //   console.log('12dds3143465474', JSON.stringify(info));
  //   //  setToken(info.signInUserSession.idToken.payload.profile)
  // }

  const getEvents = async (location, userLat, userLong) => {
    console.log('32133213232131232131', searchLocation);
    setLoader(true)
    try {
      let data2 = JSON.stringify({
        "city_name": searchLocation
      });
console.log('sssssss',data2);

      let config3 = {
        method: 'post',
        maxBodyLength: Infinity,
        url: Url.BASE_URL + Url.GET_EVENTS,
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'multipart/form-data'

        },
        data: data2
      };

      axios.request(config3)
        .then(async (response) => {
          let newArr = [];
          console.log('dsadasdsadsadsadsadsad', response.data);
          if (response.data.length == 0 || response.data == []) {
            setLoader(false)
          setNewEvents([])
          setNewEvents1([])
          return
          }
          let promises = response.data.map(async (item, index) => {
            console.log('dskjhdsaasi2y9sadas3y9y198e', item.address);
            let eventDate1 = item.date.start_date + " " + item?.year;
            let eventDate = moment(eventDate1).format("YYYY-MM-DD")
            let eventDate2 = moment(eventDate).unix();
            let currentDay = moment().format("YYYY-MM-DD")
            let isSameOrAfter = moment(eventDate).isSameOrAfter(currentDay)

            if(item.latitude && item.longitude && userLat && userLat != undefined && userLong && userLong != undefined) {
              const distance1 = getDistance(
                { latitude: Number(item.latitude), longitude: Number(item.longitude) },
                { latitude: Number(userLat), longitude: Number(userLong) }
              )
              console.log('32131232312312312', distance1);
              console.log('lat111111111', Number(item.latitude) , 'lat222222', Number(item.longitude));
              console.log('lat23333333', Number(userLat) , 'lat44444444', Number(userLong));
              console.log('329813217371927919', item);
              const disInMiles = `${(distance1 / 1609.34).toFixed(0)} mi`
              console.log('DISTANCE IN MILES1111', disInMiles);
              item.distance = disInMiles
            } else {
              item.distance = 'N.A';
            }
            // if (item.address == undefined) {
            //   item.distance = 'N.A';
            // } else {
            //   let destination = item.address[0] + " " + item.address[1]
            //   // console.log('fdsjfkhkshfhjhdasaksssd', preciseLocation);
            //   // let dis = await getDistance(location, destination)
            //   item.distance = dis;
            // }

            item.isShow = isSameOrAfter;
            item.timeStampVal = eventDate2;
            if (item?.image) {
               Image.getSize(item.image, (width, height)=>{
                let ratio = height / width
                item.ratio = ratio.toFixed(2)
               })
              // console.log('54343',images.bottom);
            }else {
              item.image = 'no image'
            }

            if (isSameOrAfter) {
              newArr.push(item)
            }
          })

          await Promise.all(promises).then(() => {
            setTimeout(() => {
              newArr.sort((a, b) => {
                console.log('381267361687668', a.timeStampVal);
                const dateA = moment(a.timeStampVal)
                const dateB = moment(b.timeStampVal)
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                if (a.distance === b.distance) {

                  // If two elements have same number, then the one who has larger rating.average wins
                  return a.distance - b.distance;
                } else {
                  // If two elements have different number, then the one who has larger number wins
                  return a.distance - b.distance;
                }
              });

              console.log('21212121ewweweda22321121221', newArr);
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
    } catch (error) {
      setLoader(false)
      setNewEvents([])
      setNewEvents1([])
    }

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
    if (Platform.OS == 'android') {
      Share.share({ url: shareLink, message: shareLink, title: shareLink })
    } else {
      Share.share({ url: shareLink })
    }
  }

  const getLocationInIos = async () => {
    let cityName = "";
    if (Platform.OS == "ios") {
      await Geolocation.requestAuthorization("always");
    }

    Geolocation.getCurrentPosition(async(position) => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
        };

     axios.request(config)
     .then(async (response1) => {
     console.log("locatiotioitoitoiotio", JSON.stringify(response1.data));

     let city = response1.data.address?.city || response1.data.address?.town
     onChooseLocation(city)

     })
    .catch((error) => {
       console.log(error);
     });

      // Geocoder.from(position.coords.latitude, position.coords.longitude)
      //   .then(async(json) => {
      //     console.log("asnbmbmbnmbmbdsnkldsajmbmnbmdasd", JSON.stringify(json.results[0]));
      //     let addressComponent = json.results[0].address_components;
      //     for (const component of addressComponent) {
      //       if (component.types.includes("administrative_area_level_1")) {
      //         cityName = component.long_name;
      //         break;
      //       }
      //     }
      //    onChooseLocation(cityName)
      //   })
      //   .catch((error) => {
      //     console.warn("Geocoder error:", error);
      //     Toast.show(error)
      //     // setLoader(false);
      //   });
    });
  };

  const onChooseLocation = async (data) => {
    setSearchCity('')
    if(!isLoggedIn) {
      dispatch(updateUser({...userInfo, search_location: data}))
      bottomSheet?.current.close()
      return;
    }
    let body = {searchLocation: data }
    let url = `${Url.ADD_PROFILE}/${userInfo.id}`
    let response = await services.post(url, "", body, 'json')
    console.log('d9u2h9sdasdsadsadshd982', response);
    if (response.status) {
      updateUserDetailToStore()
      bottomSheet?.current.close()
      // setLoader(true)
    }
  }

  const updateUserDetailToStore = async () => {
    let url = `${Url.GET_USER_DETAILS}/${userInfo.id}`
    let res = await services.get(url)
    if (res.status) {
      dispatch(updateUser(res.user))

      // navigation.navigate("SignedInStack", { screen: "DashboardScreen" })
    }
    console.log('updated User Details111>>>>>', res.user);
  }

  const goToHomeLocation =()=>{

  }
  return (
    <View style={styles.mainView}>
    <AnimatedScrollView
        disableScale={true}
        HeaderComponent={
          <View style={{height: 190, width: width, alignSelf: 'center'}}>
          <View style={styles.view1}>
       <View style={{ flexDirection: "column" }}>
         <Text style={styles.findText}>Find events in</Text>
         <View style={{ flexDirection: 'row', width: "90%" }}>
           <TouchableOpacity onPress={() => bottomSheet?.current.show()} style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>

             <Text numberOfLines={1} style={styles.newJersyText}>{searchLocation || 'Please select'}</Text>
             <Image source={images.bottom} style={styles.locicon} />
           </TouchableOpacity>

         </View>
       </View>

       <TouchableOpacity onPress={() => navigation.navigate("SignedInStack", { screen: "Profile" })}>
         <FastImage
           style={styles.profileImg}
           source={
            //  (userInfo.profile_image == null || userInfo.profile_image == 'null')
            //    ?
            //    images.backimg
            //    :
               {
                 uri: userInfo.profile_image,
                 priority: FastImage.priority.high,
               }}
         />
       </TouchableOpacity>


     </View>

     <View style={styles.searchView}>
       <View
       style={styles.searchView1}
       >
         <Image source={images.search1} style={styles.searchIcon} />
         <TextInput
           placeholder='Search for events'
           placeholderTextColor={"#1C274C"}
           value={searchText}
           keyboardType='web-search'
           onChangeText={(val) => onSearchEvent(val)}
           style={styles.searchTextInput}
         />
       </View>

     </View>
     <View style={styles.view2}>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
         <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(0)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 0 ? "#25C3F4" : "#fff", borderRadius: 8, height: 38, marginLeft: 5, borderWidth: 1, borderColor: "#DCE1E9" }}>
           <Text style={{ fontFamily: fonts.SfPro_Regular, paddingHorizontal: 14, color: selectedIndex == 0 ? "#fff" : "#333333" }}>All</Text>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(1)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 1 ? "#25C3F4" : "#fff", borderRadius: 8, height: 38, marginLeft: 10, borderWidth: 1, borderColor: "#DCE1E9" }}>
           <Text style={{ fontFamily: fonts.SfPro_Regular, paddingHorizontal: 14, color: selectedIndex == 1 ? "#fff" : "#333333" }}>Today</Text>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(2)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 2 ? "#25C3F4" : "#fff", height: 38, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: "#DCE1E9" }}>
           <Text style={{ fontFamily: fonts.SfPro_Regular, paddingHorizontal: 14, color: selectedIndex == 2 ? "#fff" : "#333333" }}>This weekend</Text>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(3)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 3 ? "#25C3F4" : "#fff", height: 38, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: "#DCE1E9" }}>
           <Text style={{ fontFamily: fonts.SfPro_Regular, paddingHorizontal: 14, color: selectedIndex == 3 ? "#fff" : "#333333" }}>This week</Text>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.9} onPress={() => onAddFilter(4)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: selectedIndex == 4 ? "#25C3F4" : "#fff", height: 38, borderRadius: 8, marginLeft: 10, borderWidth: 1, borderColor: "#DCE1E9" }}>
           <Text style={{ fontFamily: fonts.SfPro_Regular, paddingHorizontal: 14, color: selectedIndex == 4 ? "#fff" : "#333333" }}>This Month</Text>
         </TouchableOpacity>
       </ScrollView>
     </View>
       </View>
        }
        headerMaxHeight={190}
    //     TopNavBarComponent={
    //       <View style={{height: 80, width: width, alignSelf: 'center'}}>
    //    <View style={{paddingTop: top}}>
    //  <View style={styles.searchVieww}>
    //    <View style={styles.searchView1}>
    //      <Image source={images.search1} style={styles.searchIcon} />
    //      <TextInput
    //        placeholder='Search for events'
    //        placeholderTextColor={"#1C274C"}
    //        value={searchText}
    //        keyboardType='web-search'
    //        onChangeText={(val) => onSearchEvent(val)}
    //        style={styles.searchTextInput}
    //      />
    //    </View>

    //  </View>

    //    </View>
    //    </View>
    //     }
        topBarHeight={20}
      >
      <View>
      <View style={{
          height: 20, width: "100%", backgroundColor: "#fff", marginBottom: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 2,
        }}>

        </View>
        <View>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={{
            flexDirection: "row", marginTop: 20,
            marginHorizontal: width * .03, justifyContent: "space-between", alignItems: "center"
          }}>
            <Text style={styles.eventsText}>Events to explore</Text>
          </View>
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
            style={{ backgroundColor: "#fff", paddingBottom: 20 }}
            data={newEvents}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.seperator2}/>}
            renderItem={({ item, index }) => {
              return (

                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("EventDetail", { item: item, event: newEvents1, preciseLocation: preciseLocation })} activeOpacity={0.8} style={styles.flatListView}>
                    <View style={styles.flatListView1}>
                      <View style={styles.flatListItem} >
                        <FastImage
                        resizeMode='contain'
                        style={{width: width * .45, height: item.ratio ? width * .45 * item.ratio : width * .45, borderRadius: 6 }}
                        imageStyle={{ borderRadius: 11, justifyContent:'flex-start'}}
                        source={item?.image.startsWith("no image") ? imageArr[index % imageArr.length].image : { uri: item.image }}>
                          <View style={styles.kmbutton}>
                            {/* <FastImage source={images.car} style={styles.carImg} /> */}
                            <Text style={styles.kmText}>{`${item.distance}`}</Text>
                          </View>
                        </FastImage>
                      </View>
                      <View style={{ backgroundColor: "#fff", width: "55%", borderBottomLeftRadius: 11, borderBottomRightRadius: 11 }}>
                        <Text numberOfLines={1} style={styles.summaryText}>{item.title}</Text>
                        <Text style={styles.dateText}>{moment(item?.date?.start_date, "MMM D").format('ddd, D MMM, YYYY')}</Text>

                        {/* <View style={styles.dateView}>
                          <FastImage source={images.clock1} style={styles.clockIcon} /> */}
                          <Text style={styles.dateText}>{item.date.when}</Text>
                        {/* </View> */}

                        {/* <View style={styles.dateView1}>
                          <FastImage source={images.location3} style={styles.locIconB} /> */}
                          <Text style={styles.locText}>{item.address[0] + " " + item.address[1] }</Text>
                        {/* </View> */}

                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', paddingTop: 20}}>
                          <Text style={{fontFamily: fonts.SfPro_Regular, fontSize: 12, color: colors.textRegular, paddingRight: 5, }}>Powered by</Text>
                          <FastImage source={images.google} resizeMode='contain' style={{height: 12, width: 12,}}/>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {/* {
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
                  } */}

                </View>

              )
            }}
          />
        }

      </View>
      </View>
      </AnimatedScrollView>

        {/* <View style={{}}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View> */}


      <BottomSheet draggable={false} ref={bottomSheet} height={height * 0.8} width={100} sheetBackgroundColor={"#fff"}>
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : 60 }}>
          <View style={styles.handle}/>
          <Text style={styles.pickCity}>Pick a city</Text>
          <View style={styles.seperator} />
          {/* <TouchableOpacity onPress={()=> onChooseLocation(userInfo?.location)} style={[styles.bottomBtn, { marginVertical: 10 }]}>
            <Text style={styles.btnText}>My Home Location</Text>
          </TouchableOpacity>
          <View style={styles.seperator} /> */}
         <View style={styles.searchView3}>
          <View style={styles.searchView1}>
            <Image source={images.search1} style={styles.searchIcon} />
            <TextInput
              placeholder='Search for city'
              placeholderTextColor={"#1C274C"}
              value={searchCity}
              keyboardType='web-search'
              onChangeText={(val)=> setSearchCity(val)}
              // onFocus={()=>{ setIsCityInputFocused(true)}}
              // onBlur={()=> alert('onBlur')}
              style={styles.searchTextInput}
            />
          </View>

        </View>
        <View style={styles.seperator}/>
        <TouchableOpacity onPress={getLocationInIos} style={styles.currentLocation}>
            <View style={styles.currentLocation1}>
              <FastImage
              source={images.maps1}
              resizeMode='contain'
              style={styles.locationArrow}
              />
              <Text style={styles.location}>Use Current Location</Text>
            </View>
            <FastImage
            source={images.arrNew}
            style={styles.next}
            />
          </TouchableOpacity>
          <View style={styles.seperator} />
          <View>


          {
            searchCity.length == 0 &&
            <>
            <Text style={styles.returnText}>Home Location</Text>
          <TouchableOpacity onPress={()=> onChooseLocation(userInfo?.location)}>
          <Text style={styles.homeLocation}>{userInfo?.location}</Text>
          </TouchableOpacity>
          <View style={styles.seperator} />
            </>
          }

          {
            searchCity.length != 0 && cities.length !=0 &&
            <>
            <Text style={{fontFamily: fonts.SfPro_Semibold, fontSize: 16, color: colors.textBlack, paddingLeft: 15}}>Search Results</Text>
            </>
          }

          {
            searchCity.length != 0 && cities.length == 0 &&
            <View style={{}}>
              <FastImage
              resizeMode='contain'
              style={{height: 150, width: 250, marginTop: 30, alignSelf: 'center'}}
              source={images.noResults}
              />
              <Text style={{paddingHorizontal: 40, fontSize: 14, fontFamily: fonts.SfPro_Regular, color: colors.textRegular}}>Sorry! No results found. Please check your spelling or try searching for a different city.</Text>
            </View>
          }
           <View>
            <FlatList
            data={cities}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 400 }}
            ItemSeparatorComponent={()=> <View style={styles.seperator1} />}
            renderItem={({item, index})=> {
              return(
                <TouchableOpacity onPress={()=> onChooseLocation(item?.city)}>
                  <Text style={styles.returnText1}>{item?.city}</Text>
                </TouchableOpacity>
              )
            }}
            />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>

  )
}
export default Dashboard;