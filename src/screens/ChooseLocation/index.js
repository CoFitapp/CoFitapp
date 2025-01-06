import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import Header from '../../components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputComponent } from '../../components/TextInput'
import { TextRegular } from '../../components/AppText'
import FastImage from 'react-native-fast-image'
import images from '../../constants/images'
import { TouchableOpacity } from 'react-native'
import { AppMainButton } from '../../components/AppButton'
import colors from '../../constants/colors'
import CheckBox from 'react-native-check-box'
import Header1 from '../../components/Header1'
import { FlatList } from 'react-native'
import fonts from '../../constants/fonts'
import { TextInput } from 'react-native'
// import Geolocation from "react-native-geolocation-service";
import Geolocation from '@react-native-community/geolocation';

import Geocoder from "react-native-geocoding";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from 'react-redux'
import { login, updateUser, location } from '../../redux/slices/userSlice'
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import Toast from 'react-native-simple-toast';
import axios from 'axios'

const ChooseLocation = ({navigation}) => {
  const { height, width } = Dimensions.get('window')
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [auto, setAuto] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('')

  const formatResult = (data) => {
    const terms = data.terms;
    if (terms && terms.length >= 2) {
      const city = terms[0].value;
      const state = terms[1].value;
      return `${city}, ${state}`;
    }
    return data.description; // Fallback to original description
  };

  const getLocationInIos = async () => {
    // let cityName = "";
    // if (Platform.OS == "ios") {
    //   await Geolocation.requestAuthorization("always");
    // }

    Geolocation.getCurrentPosition(async(position) => {
      console.log("wqh78dey237dy23yd2", position);
      setLatitude(parseFloat(position.coords.latitude));
      setLongitude(parseFloat(position.coords.longitude));
      console.log("dsads", latitude);
      console.log("sdfsd", longitude);

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(position.coords.latitude)}&lon=${parseFloat(position.coords.longitude)}&format=json`,
        };

     axios.request(config)
     .then(async (response1) => {
     console.log("locatiotioitoitoiotio", JSON.stringify(response1.data));

     let city = response1.data.address?.city || response1.data.address?.town

      const data = new FormData()
      data.append('homeLocation', city)
      data.append('searchLocation', city)
      let url = `${Url.ADD_PROFILE}/${userInfo.id}`
      const response = await services.post(url, "", data, 'formdata')
      console.log('resp>>>>>>>>>>', response);
      setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        dispatch(updateUser(response.user));
        dispatch(location(response.user.location));
        navigation.navigate("SignedInStack", { screen: "Home" })
      }
     })
    .catch((error) => {
       console.log(error);
     });

      // Geocoder.from(position.coords.latitude, position.coords.longitude)
      // // Geocoder.from(42.590100, -76.368180)
      //   .then(async(json) => {
      //     console.log("asnbmbmbnmbmbdsnkldsajmbmnbmdasd", JSON.stringify(json.results[0]));
      //     let addressComponent = json.results[0].address_components;
      //     for (const component of addressComponent) {
      //       if (component.types.includes("administrative_area_level_1")) {
      //         cityName = component.long_name;
      //         break;
      //       }
      //     }
      //     // console.log("sdsddqwdaafsfs", cityName);
      //     // return
      //     const data = new FormData()
      // data.append('homeLocation', cityName)
      // data.append('searchLocation', cityName)
      // let url = `${Url.ADD_PROFILE}/${userInfo.id}`
      // const response = await services.post(url, "", data, 'formdata')
      // console.log('resp>>>>>>>>>>', response);
      // setIsLoading(false)
      // Toast.show(response.message)
      // if(response.status) {
      //   dispatch(updateUser(response.user));
      //   dispatch(location(response.user.location));
      //   navigation.navigate("SignedInStack", { screen: "Home" })
      // }
      //   })
      //   .catch((error) => {
      //     console.warn("Geocoder error:", error);
      //     Toast.show(error)
      //     // setLoader(false);
      //   });
    });
  };

  const onContinue =async()=> {
    setIsLoading(true)
    const data = new FormData()
      data.append('homeLocation', selectedLocation)
      data.append('searchLocation', selectedLocation)
      // console.log('bodyyyyy', data);
      let url = `${Url.ADD_PROFILE}/${userInfo.id}`
      // console.log('urllllll', url);
      const response = await services.post(url, "", data, 'formdata')
      console.log('resp>>>>>>>>>>', response);
      setIsLoading(false)
      Toast.show(response.message)
      if(response.status) {
        dispatch(updateUser(response.user));
        dispatch(location(response.user.location));
        navigation.navigate("SignedInStack", { screen: "Home" })
      }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={{height:'90%'}}>
     <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.arrNew1} style={[styles.nextArrowIcon, { transform: [{ rotate: "180deg" }] }]} />
          </TouchableOpacity>
        </View>
     <Text style={styles.account}>Choose your Home Location</Text>
        <TextRegular styles={{paddingTop: 8, paddingHorizontal: 15}} text="Let's find the nearby fitness events. Choose a location below to get started."/>
        <AppMainButton title="Use my current location" textStyle={{color: colors.orange_dark}} styles={styles.button} onPress={getLocationInIos}/>
        <View style={styles.orView}>
          <View style={styles.line}></View>
          <Text>or</Text>
          <View style={styles.line}></View>
        </View>

        {/* <View style={styles.inputView}>
          <FastImage resizeMode='contain' source={images.search1} style={styles.search}/>
          <TextInput
          value={inputValue}
          placeholder='search for city'
          onChangeText={setInputValue}
          clearButtonMode="while-editing"
          style={styles.input}/>
        </View> */}

        <View
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  width: "93%",
                  height: auto ? 45 : 300,
                  alignItems: "flex-start",
                  marginHorizontal: 12,
                  // backgroundColor: 'red'
                }}
              >
                <GooglePlacesAutocomplete
                  onFail={(err) => console.log("erroorrrr", err)}
                  placeholder="search for city"
                  enablePoweredByContainer={false}
                  fetchDetails={true}
                  keepResultsAfterBlur={true}
                  styles={{
                    textInputContainer: {
                      width: "95%",
                      borderColor: "#F1F5FC",
                      // borderWidth: 1,
                      borderRadius: 6,
                      height: 45,
                      // alignItems: "center",
                      justifyContent: "center",
                      marginHorizontal: 12,
                      // marginTop: 10,
                      backgroundColor: colors.gray1,
                    },
                    // row: {
                    //   backgroundColor: 'red',
                    // },
                    textInput: {
                      color: "#000",
                      fontSize: 16,
                      marginLeft: 5,
                      fontFamily: fonts.SfPro_Regular,
                      width: "85%",
                      backgroundColor: colors.gray1,
                      height: 45,
                    },
                    // description: {
                    //   color: '#yellow'
                    // },
                    // predefinedPlacesDescription:{
                    //   color: '#000'
                    // },
                    container: {},
                  }}
                  renderLeftButton={() => (
                    <Image
                      source={images.search1}
                      style={styles.search}
                    />
                  )}
                  renderRow={(data) => (
                    <View style={styles.resultRow}>
                      <Text style={{color: '#000', fontFamily: fonts.SfPro_Medium}}>{formatResult(data)}</Text>
                    </View>
                  )}
                  textInputProps={{
                    placeholderTextColor: '#000',
                    // style: {color: 'green'},
                    onFocus: () => {
                      setAuto(false);
                    },
                    errorStyle: { color: "red" },
                  }}
                  onPress={(data, details = null) => {
                    console.log('dasdsadsadsaddassa', data.structured_formatting.main_text);
                    setSelectedLocation(data.structured_formatting.main_text)
                    // onChooseLocation(data.structured_formatting.main_text);
                  }}
                  query={{
                    key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
                    language: "en",
                    components: "country:us",
                    type: '(cities)'
                  }}
                />
              </View>

     </View>

     <View style={styles.bottom}>
      <AppMainButton title="Next" isLoading={isLoading} disable={selectedLocation.trim().length == 0 ? true : false} onPress={onContinue}/>
     </View>
     </View>
  )
}

export default ChooseLocation
