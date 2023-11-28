import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, ImageBackground, FlatList, Dimensions, NativeModules, Image, PermissionsAndroid, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, AnimatedRegion, Animated, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import images from '../../constants/images';
import axios from 'axios';
import getDistance from '../../api/getDistance';
import { logout } from '../../redux/slices/userSlice';
import fonts from '../../constants/fonts';
import moment from 'moment';

const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
Geocoder.init("AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI");
const apiKey = "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI";
const httpLinkPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;

const Map = ({ navigation }) => {
  const userLocation = useSelector(state => state.user.location)
  const userInfo = useSelector((state) => state.user.userInfo);
  const [auto, setAuto] = useState(true)
  const bottomSheet = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [preciseCoords, setPreciseCoords] = useState({})
  const [mapVisible, setMapVisible] = useState(false)
  const [loader, setLoader] = useState(true)
  const [address, setAddress] = useState('')
  const [eventCoords, setEventCoords] = useState([])
  const [preciseLocation, setPreciseLocation] = useState('')
  const [events, setEvents] = useState([
    {
      'image': images.event1,
      'distance': "8+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event2,
      'distance': "12+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event1,
      'distance': "8+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event2,
      'distance': "12+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
  ])

  useEffect(() => {
    if (isFocused) {
      getCoordinatesForLocation(userInfo.location);
      getEventCoords(userInfo.location);
      // requestLocationPermission();
    }
  }, [isFocused])


  const getCoordinatesForLocation = async (locationn) => {
    // console.log('usersddasasLocation', userLocation);
    // return;
    // getEventsOnSearch()
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationn)}&key=${apiKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const locationData = data.results[0].geometry.location;
        console.log('duy23y723y8y328', locationData);
        setLatitude(0);
        setLongitude(0);
        setLatitude(locationData.lat);
        setLongitude(locationData.lng);
        setMapVisible(true)
      } else {
        console.error(`No results found for the provided location: ${userLocation}`);

      }
    } catch (error) {
      console.error(`Error fetching geocode data for location: ${userLocation}`, error);
    }
  };

  const getEventsOnSearch = async (location) => {
    let data2 = JSON.stringify({
      "city_name": location.structured_formatting.main_text
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.cofitapp.com/api/get-event',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data2
    };

    axios.request(config)
      .then(async (response) => {
        let promises = response.data.map(async (item, index) => {
          let location = item.address[0] + " " + item.address[1]
          let dis = await getDistance(preciseLocation, location)
          console.log('wqwqwqwqwqwq', dis);
          item.distance = dis
        })
        await Promise.all(promises).then(async () => {
          console.log('dsjfhkdshgkjhkjashkjf', response.data);
          const coordinatesPromises = response.data.map((itemm) => fetchCoordinatesForLocation(itemm));
          if (coordinatesPromises != null) {
            const coordinates = await Promise.all(coordinatesPromises);

            console.log("763126xzxas688168", coordinates);
            const arr1 = coordinates.filter(val => val != null)
            setEventCoords(arr1)
          }
          //   setTimeout(() => {
          //     console.log('hiuewh983y928ye8y23ye2',response.data.events_results);
          // setNewEvents(response.data.events_results)
          // setNewEvents1(response.data.events_results)
          // setLoader(false)
          //   }, 500);
        })
      })
      .catch((error) => {
        console.log("errrriiiiiiddiii", error);
      });
  }

  const getEventCoords = async (city) => {
    try {

      let data2 = JSON.stringify({
        "city_name": city
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
          const coordinatesPromises = response.data.map((itemm) => fetchCoordinatesForLocation(itemm));
          if (coordinatesPromises != null) {
            const coordinates = await Promise.all(coordinatesPromises);

            console.log("3213cxv12xsazsdss4353311ds21", coordinates);
            const arr1 = coordinates.filter(val => val != null)
            console.log('dasjdadgwdghjgqjgdjqw', arr1);
            setEventCoords(arr1)
          }
        })
        .catch(err => {
          console.log('errorrr238723ye9y239y923', err);
        })

    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoordinatesForLocation = async (item) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(item.address[0] + " , " + item.address[1])}&key=${apiKey}`);
      const data = await response.json();
      console.log('dashdi2h9hdh1289h9d1', data);
      if (data.results.length > 0) {
        const locationData = data.results[0].geometry.location;

        let eventDate1 = item.date.start_date + " " + moment().year();
        let eventDate = moment(eventDate1).format("YYYY-MM-DD")
        let eventDate2 = moment(eventDate).unix();
        let currentDay = moment().format("YYYY-MM-DD")
        let isSameOrAfter = moment(eventDate).isSameOrAfter(currentDay)

        // let destination = item.address[0] + " " + item.address[1]
        // console.log('fdsjfkhkshfhjhdasaksssd',preciseLocation);
        // let dis = await getDistance(location, destination)
        // item.distance = dis;
        item.isShow = isSameOrAfter;
        item.timeStampVal = eventDate2;
        if (isSameOrAfter) {
          return { ...item, isShow: isSameOrAfter, timeStampVal: eventDate2, latitude: locationData.lat, longitude: locationData.lng };
        } else {
          return null;
        }

      } else {
        console.error(`No results found for the provided location:`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching geocode data for location`, error);
      return null;
    }
  };


  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide location-based services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("dsads", latitude)
            console.log("sdfsd", longitude)
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then((json) => {
                console.log("asnbmbmbnmbmbnkljmbmnbmdasd", json.results[0].address_components)
                const addressComponent = json.plus_code.compound_code;
                console.log("sdfsfs", addressComponent)
                setAddress(addressComponent)
                setMapVisible(true)
                setLoader(false);
              })
              .catch((error) => {
                console.warn('Geocoder error:', error);
                setLoader(false);
              })
          })
      } else {
        console.log('Location permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const goToUserLocation = () => {

  }

  const fetchLocationOnDragMarker = (coords) => {
    // console.log('123232sdsasadsadsadssda32321321',e.nativeEvent.coordinate);
    //  alert(JSON.stringify(e.nativeEvent.coordinate))
    setLatitude(coords.latitude)
    setLongitude(coords.longitude)
    Geocoder.from(coords.latitude, coords.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log("address>>>>>>", addressComponent);
        console.log("address>>>>>>", json.results);
        // setAddress(addressComponent)
      })
      .catch(error => console.warn(error));
  }

  const onPressMarker = async (item) => {
    console.log('dsdhjgasjgjhaghjgajhdgqgu', item.location);
    let dis = await getDistance(preciseLocation, item.address)
    console.log('2324523asddsgsa41212', eventCoords);
    // return;
    // console.log('8376432864786237aaaa',dis);
    // return;
    navigation.navigate("EventDetail", { item: { ...item, distance: dis }, event: eventCoords, preciseLocation: preciseLocation })
  }

  const onRegionChange = async (coords) => {
    // console.log('shadaiush98y98e',val);
    // return;
    Geocoder.from(coords.latitude, coords.longitude)
      .then((json) => {
        console.log("adddddddrdsassdasxzddsadasaessssss", JSON.stringify(json.results))
        let addressComponent = json.results[0].address_components;
        for (const component of addressComponent) {
          if (component.types.includes('locality')) {
            console.log('3278643289669326', component.long_name);
            // cityName = component.long_name;
            break;
          }
        }
      })
      .catch((error) => {
        console.warn('Geocoder error:', error);
        setLoader(false);
      })
  }

  const getCurrentLocation = async () => {
    let cityName = ""
    if(Platform.OS=='ios'){
      await Geolocation.requestAuthorization('always')
    }
    Geolocation.getCurrentPosition((position) => {
      console.log('dshjgfsdgjhs', position.coords);
      setLatitude(0);
      setLongitude(0);
      let coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      setPreciseCoords(coords)
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setMapVisible(true)
      setAuto(true)
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then((json) => {
          console.log("asnbmbmbnmbmbdsnkljmbmnbmdasd", JSON.stringify(json))
          let addressComponent = json.results[0].address_components;
          for (const component of addressComponent) {
            if (component.types.includes('locality')) {
              cityName = component.long_name;
              break;
            }
          }
          setPreciseLocation(cityName)
          getEventCoords(cityName)
        })
    })
    return;

    getEventCoords()
    getCoordinatesForLocation(userInfo.location)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text style=
      {{position:"absolute",top:0,bottom:0,left:0,right:0,color:'black'}}>{address}</Text> */}
      {mapVisible &&
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <MapView
              zoomEnabled={true}
              minZoomLevel={1}
              style={styles.mapStyle}
              // onRegionChangeComplete={(val)=>onRegionChange(val)}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.08,
              }}
            >
              {
                Object.keys(preciseCoords).length != 0 &&
                <Marker
                  // key={index}
                  // onCalloutPress={() => onPressMarker(item)}
                  coordinate={{ latitude: Number(preciseCoords?.latitude), longitude: Number(preciseCoords?.longitude) }}
                >
                  <Image
                    source={images.pin}
                    style={{ width: 30, height: 30 }}
                  />
                </Marker>
              }

              {
                eventCoords.map((item, index) => (

                  <Marker
                    key={index}
                    onCalloutPress={() => onPressMarker(item)}
                    coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
                  >
                    <Image
                      source={images.location3}
                      style={{ width: 30, height: 30 }}
                    />
                    <Callout style={{ width: 200 }} onPress={() => onPressMarker(item)}>
                      <View style={{}}>
                        <Text style={{ fontFamily: fonts.SfPro_Bold, fontSize: 14 }}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center" }}>
                          <Image source={images.location1} style={{ height: 15, width: 15, resizeMode: 'contain' }}>

                          </Image>
                          <Text style={{ marginLeft: 5, fontFamily: fonts.SfPro_Regular, fontSize: 12 }}>{item.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: "center" }}>
                          <Image source={images.clock} style={{ height: 14, width: 14, resizeMode: 'contain' }}>

                          </Image>
                          <Text style={{ marginLeft: 5, fontFamily: fonts.SfPro_Regular, fontSize: 12 }}>{item.date.when}</Text>
                        </View>
                      </View>
                    </Callout>
                  </Marker>

                ))
              }
            </MapView>
            {/* <View pointerEvents="none" style={styles.locIconView}>
            <Image style={styles.location1} source={images.location3} />
          </View> */}
          </View>
        </TouchableWithoutFeedback>
      }
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style=
          {{
            height: auto == true ? 50 : '100%', width: '90%',
            borderRadius: 10, alignSelf: 'center', alignItems: "center",
            marginHorizontal: "10%", backgroundColor: 'transparent', justifyContent: "center",
            position: "absolute", top: Platform.OS == "ios" ? statusBarHeight + 20 : 25
          }}>

          <GooglePlacesAutocomplete
            placeholder='Search events by location'
            // placeholderTextColor="#fff"
            fetchDetails={true}
            enablePoweredByContainer={false}
            // keepResultsAfterBlur={true}
            styles={styles.autoComplete}

            renderLeftButton={() => (
              <Image source={images.search} style={styles.location1} />
            )}
            renderRightButton={() => (
              <TouchableOpacity onPress={() => navigation.navigate("SignedInStack", { screen: "Profile" })}>
                <Image source={(userInfo.profile_image == null || userInfo.profile_image == 'null') ? images.user : { uri: userInfo.profile_image }} style={styles.user} />
              </TouchableOpacity>
            )}
            textInputProps={{
              onFocus: () => {
                setAuto(false);
              },
              onBlur: () => {
                setAuto(true);
              },
              placeholderTextColor: "#666262",
              
              errorStyle: { color: 'red' }
            }}
            onPress={(data, details = null) => {
              console.log('dasfsfsadasdsadeqwafeweww', data.structured_formatting.main_text);
              // return;
              setAuto(true)
              getEventsOnSearch(data)
              getCoordinatesForLocation(data.description)
              // bottomSheet.current.show()
            }}
            query={{
              key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
              language: 'en',
              components: "country:us",
            }}
          />

        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => getCurrentLocation()} activeOpacity={0.5} style={{ alignItems: "flex-end", marginTop: height * 0.75, marginRight: 20 }}>
        <Image source={require("../../assets/images/location2.png")} style={{ height: 50, width: 50, resizeMode: "contain", tintColor: "#fff" }} />
      </TouchableOpacity>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={height * 0.6}>

        <View style={styles.view}>
          <KeyboardAwareScrollView>
            <View>

              <FlatList
                data={events}
                horizontal={true}

                renderItem={({ item, index }) => {
                  return (

                    <View style={{}}>
                      <ImageBackground resizeMode='contain' source={item.image} style={styles.BgImg}>
                        <View style={styles.kmBtn}>
                          <Image source={images.car} style={styles.carIcon} />
                          <Text style={styles.kmText}>{item.distance} km</Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default Map;


