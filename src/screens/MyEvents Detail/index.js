import { NativeModules, PixelRatio, ScrollView, Share, FlatList, StyleSheet, Text, View, useWindowDimensions, Image, Touchable, TouchableOpacity, TextInput, ImageBackground, Platform, Linking } from 'react-native'
import React, { useState, useRef } from 'react'
import styles from './style'
import images from '../../constants/images'
import colors from '../../constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute, useNavigation } from '@react-navigation/native'
import moment from 'moment'
import HTMLView from 'react-native-htmlview';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import fonts from '../../constants/fonts'
import axios from 'axios';
import { Auth } from 'aws-amplify';
import getDistance from '../../api/getDistance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AnimatedScrollView } from '@kanelloc/react-native-animated-header-scroll-view';

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;
const apiKey = "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI";

const EventDetail = () => {
  const userLocation = useSelector(state => state.user.location)
  const route = useRoute();
  const scrollRef = useRef()
  const navigation = useNavigation();
  const [event, setEvent] = useState(route.params.item)
  const { height, width } = useWindowDimensions();
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isMapVisible, setIsMapVisible] = useState(true)
  const [similarEvents, setSimilarEvents] = useState([])

  useEffect(() => {
    console.log('dsdweddqwafq2wesC',route.params.item);
    getCoordinates();
    // getSimilarEvents()
  }, [])

  const getCoordinates = async () => {

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(event.address[0])}&key=${apiKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const locationData = data.results[0].geometry.location;
        console.log('duy23y723y8y328', locationData);
        setLatitude(locationData.lat);
        setLongitude(locationData.lng);
        setIsMapVisible(true)
      } else {
        console.error(`No results found for the provided location: ${event.location}`);

      }
    } catch (error) {
      console.error(`Error fetching geocode data for location: ${event.location}`, error);
    }
  };

  const getSimilarEvents = async () => {
    //  let arr=[];
    let events_results1 = await AsyncStorage.getItem("eventData")
    let events_results = JSON.parse(events_results1)
    console.log('eventttttt', events_results);
    let promises = events_results.map(async (item, index) => {
      let location = item.address[0] + " " + item.address[1]
      let dis = await getDistance(userLocation, location)
      console.log('wqwqwsaaqwqwqwq', dis);
      item.distance = dis
    })
    await Promise.all(promises).then(() => {
      setTimeout(() => {
        setSimilarEvents(events_results)
      }, 500);
    })
    return;
    let info = await Auth.currentSession();
    console.log('dsjagsasdsaasadddsdsddasjhgdjgja', JSON.stringify(info));
    let token = info.idToken.payload.profile;
    console.log('tkokrusiruiseryyiyiw', token);
    let config = {
      method: 'get',
      url: `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then(async (response) => {
        console.log("evdsdexsdsdasdsnts ddasassdata+++++++++++", response.data.items);
        let promises = response.data.items.map(async (item, index) => {
          // if(event.id!=item.id){
          let dis = await getDistance(userLocation, item.location)
          console.log('idissssss', dis);
          // arr.push({...item,distance:dis})
          item.distance = dis
          // }
        })
        await Promise.all(promises).then(() => {
          setTimeout(() => {
            console.log('hiuewh983y928ye8y23ye2', response.data.items);
            setSimilarEvents(response.data.items)
          }, 500);
        })

      })
      .catch((error) => {
        console.log(error);
      });

  }

  const onPressViewMap = async () => {
    // let origin = "Chandigarh,India"
    // let destination = "Ambala, India"
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${route.params.preciseLocation}&destination=${event.address[0]}`;
    Linking.openURL(googleMapsUrl)
  }

  const onShareEvent = async (item) => {
    console.log('dsajkhdashdhask');
    let shareLink = `https://apple.cofitapp.com?id=${event.id}`
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
      <AnimatedScrollView
        // HeaderNavbarComponent={
        //   <View style={{width:"100%",height:90}}>
        //     <Text>Header Bar</Text>
        //   </View>
        // }
        TopNavBarComponent={
          <View style={{width:"100%"}}>
          <View style={{ backgroundColor: "#fff", width: "100%", flexDirection: "row",alignItems:"center",justifyContent:"space-between",marginTop:Platform.OS=='ios'? 30 : 0 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.skipbtn}>
              <Image style={styles.skipimg} source={images.back}></Image>
            </TouchableOpacity>
            <View style={{}}>
            <Text numberOfLines={2} style={[styles.enterLoc,{width:width*1 - 75,textAlign:"center"}]}>{event.title}</Text>
            </View>
            <View style={{height:35,width:35}}/>
          </View>
          </View>
        }
        topBarHeight={70}
        headerImage={{ uri: event.image }}
        imageStyle={{ width: "100%", height: height * 0.5 }}
      >
        <View style={styles.view1}>
          {/* <View style={styles.bgImgView}>
            <ImageBackground style={styles.bgImg} source={{uri:event.image}}>
              <View style={styles.view2}>
                <View style={{}}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.skipbtn}>
                    <Image style={styles.skipimg} source={images.back}></Image>
                  </TouchableOpacity>
                </View>
                <View style={styles.view0}>
                  <View style={styles.kmView}>
                    <Image source={images.car} style={styles.carIcon} />
                    <Text style={styles.kmText}>{event.distance}</Text>
                  </View>
                </View>

              </View>
            </ImageBackground>
          </View> */}



          <View style={styles.backView}>

          </View>
          <View style={styles.startedView}>

            <Text style={styles.enterLoc}>{event.title}</Text>
            <View style={styles.DayView}>
              <View style={styles.calBg}>
                <Image source={images.calendar} style={styles.calImg}></Image>
              </View>
              <View style={styles.dayTextView}>
                <Text style={styles.dayText}>{moment(event.date.start_date, "MMM D").format('dddd, MMMM D, YYYY')}</Text>
                <Text style={styles.timeText}>{event.date.when}</Text>
                <Text style={styles.timeText}>Times are displayed in your time zone</Text>

              </View>
            </View>
            <View style={styles.shareWithFrndsView}></View>
            <TouchableOpacity onPress={()=>onPressViewMap()} style={styles.locView}>
              <View style={styles.calBg}>
                <Image source={images.location1} style={styles.calImg}></Image>
              </View>
              <View style={styles.dayTextView}>
                <Text style={styles.dayText}>{event.address[0] + " " + event.address[1]}</Text>

              </View>
            </TouchableOpacity>
            <View style={styles.shareWithFrndsView}></View>
            <Text style={styles.eventText}>
              Event Details
            </Text>
            <View style={styles.eventDescription}>
              <Text style={styles.eventDetailText}>{event.description}</Text>
            </View>

            <View style={styles.shareWithFrndsView}></View>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                <Text style={styles.shareWithFrndsText}>
                  Share With your friends
                </Text>
                <View style={styles.eventDescription}>
                  <Text style={styles.enjoyText}>
                    and enjoy a shared experience
                  </Text>



                </View>
              </View>
              <View style={{ width: '25%', alignItems: "center", justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => onShareEvent()} style={{ borderColor: '#25C3F4', padding: 5, borderRadius: 7, borderWidth: 1, alignSelf: 'center', height: 35, justifyContent: "center", width: '100%', alignItems: 'center', }}>
                  <Text style={{ color: "#25C3F4", fontSize: 13, fontFamily: fonts.SfPro_Medium, letterSpacing: 2 }}>SHARE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.shareWithFrndsView}></View>

            <View>

            </View>
          </View>

          <View style={styles.aboutView}>

            <View style={styles.aboutText}>
              <Text style={styles.shareWithFrndsText}>
                About event
              </Text>
              <View style={styles.eventDescription}>
                <Text style={styles.enjoyText}>
                  and enjoy a shared experience
                </Text>


              </View>
            </View>
            <View style={styles.readMoreBtn}>
              <TouchableOpacity onPress={() => Linking.openURL(event.link)} style={styles.readMoreClick}>
                <Text style={styles.readMoreText}>Attend Event</Text>
              </TouchableOpacity>
            </View>
          </View>

          {
            isMapVisible &&
            <View style={styles.mapView}>
              <MapView
                zoomEnabled={true}
                minZoomLevel={1}
                style={styles.mapStyle}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}

              >
                <Marker
                  coordinate={{ latitude: Number(latitude), longitude: Number(longitude) }}
                >
                  <Image
                    source={images.location3}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              </MapView>


            </View>
          }
          <TouchableOpacity onPress={() => onPressViewMap()} style={styles.viewOnMapView}>
            <Image source={images.group} style={styles.viewMapIcon} />
            <Text style={styles.viewOnMapText}>
              VIEW ON MAPS
            </Text>
          </TouchableOpacity>
          <View style={styles.shareWithFrndsView}></View>

        </View>

      </AnimatedScrollView>


    </View>
  )
}

export default EventDetail

