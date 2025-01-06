import {
  NativeModules,
  StyleSheet,
  Text,
  Platform,
  PermissionsAndroid,
  View,
  useWindowDimensions,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./style";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import images from "../../constants/images";
import colors from "../../constants/colors";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fonts from "../../constants/fonts";
import { useDispatch } from "react-redux";
import { location, login } from "../../redux/slices/userSlice";
import * as services from "../../constants/services";
import * as Url from "../../constants/url";
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

Geocoder.init("AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI");

const SelectLocation = ({ navigation, route }) => {
  // console.log('e32g7823g8e7823',route.params);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loctext, setLocText] = useState("");
  const [current, setCurrent] = useState(false);
  const [address, setAddress] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const { height, width } = useWindowDimensions();
  const [password, setPassword] = useState("");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "android") {
        requestLocationPermission();
      }
    }
  }, [isFocused]);

  const currentLocation = (value) => {
    console.log("11111aaaaa", userLocation);
    // console.log('2222222',value);
    setLocText(value);
    dispatch(location(userLocation));
    navigation.navigate("SignedInStack");
    setCurrent(true);
  };

  const getLocationInIos = async () => {
    // onChooseLocation('Chicago')
    // return;
    let cityName = "";
    if (Platform.OS == "ios") {
      await Geolocation.requestAuthorization("always");
    }

    Geolocation.getCurrentPosition((position) => {
      console.log("wqh78dey237dy23yd2", position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("dsads", latitude);
      console.log("sdfsd", longitude);
      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then((json) => {
          console.log("asnbmbmbnmbmbdsnkljmbmnbmdasd", JSON.stringify(json));
          let addressComponent = json.results[0].address_components;
          for (const component of addressComponent) {
            if (component.types.includes("administrative_area_level_1")) {
              cityName = component.long_name;
              break;
            }
          }
          console.log("sdsddqwdaafsfs", cityName);
          setAddress(cityName);
          setMapVisible(true);
          setLoader(false);
          // dispatch(location(cityName))
          onChooseLocation(cityName);
          // navigation.navigate("SignedInStack",{screen:"DashboardScreen"})
        })
        .catch((error) => {
          console.warn("Geocoder error:", error);
          setLoader(false);
        });
    });
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs access to your location to provide location-based services.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted.");
        Geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then((json) => {
              console.log(
                "asnbmbmbnmbmbnkljmbmnbmdasd",
                json.results[0].address_components
              );
              const addressComponent = json.plus_code.compound_code;
              console.log("sdfsfs", addressComponent);
              setAddress(addressComponent);
              setMapVisible(true);
              setLoader(false);
            })
            .catch((error) => {
              console.warn("Geocoder error:", error);
              setLoader(false);
            });
        });
      } else {
        console.log("Location permission denied.");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const fetchLocationOnDragMarker = (coords) => {
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
    Geocoder.from(coords.latitude, coords.longitude)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        console.log("address>>>>>>", addressComponent);
        console.log("address>>>>>>", json.results);
        // setAddress(addressComponent)
      })
      .catch((error) => console.warn(error));
  };

  const onChooseLocation = async (data) => {
    let body = { ...route.params.userDetails, location: data,search_location: data };
    console.log('fsdlkfhdshjkfhjkhjkshkhsjk',body);
    let response = await services.post(Url.REGISTER, "", body, "json");

    if (response.status) {
      console.log("REGISTER API RESPOMNSE11", response);
      dispatch(login(response.user, response.status));
      setAuto(true);
      setUserLocation(data);
      dispatch(location(data));
      navigation.navigate("SignedInStack", { screen: "Home" });
    }else{
      alert(response?.error)
    }
  };

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>
        <View style={{ backgroundColor: "#e6e9f0", flex: 1 }}>
          <View style={styles.skipView}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.skipbtn}
            >
              <Image style={styles.skipimg} source={images.back}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.logoView}>
            <Image source={images.cofitLogo} style={styles.cofitImage} />
          </View>
          <View style={styles.backView}></View>
          <View style={styles.startedView}>
            <Text style={styles.startedText}>Choose Your Location</Text>
            <View style={styles.signUpView}>
              <Text style={styles.signUpText}>
                Let's find the nearby fitness events. Choose a location below to
                get started.
              </Text>
            </View>
            <View style={styles.logoView1}>
              <Text style={styles.enterLoc}>Enter Your Location</Text>
              <View
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  width: "93%",
                  height: auto == true ? 50 : 300,
                  alignItems: "flex-start",
                  marginHorizontal: 12,
                }}
              >
                <GooglePlacesAutocomplete
                  onFail={(err) => console.log("erroorrrr", err)}
                  placeholder="Enter Location"
                  fetchDetails={true}
                  keepResultsAfterBlur={true}
                  styles={{
                    textInputContainer: {
                      width: "93%",
                      borderColor: "#F1F5FC",
                      borderWidth: 1,
                      borderRadius: 6,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      marginHorizontal: 12,
                      marginTop: 10,
                      backgroundColor: "#fff",
                    },
                    textInput: {
                      color: "black",
                      fontSize: 16,
                      marginLeft: 5,
                      fontFamily: fonts.SfPro_Regular,
                      width: "85%",
                    },
                    container: {},
                  }}
                  renderLeftButton={() => (
                    <Image
                      source={images.location}
                      style={{
                        alignSelf: "center",
                        width: 15,
                        height: 25,
                        marginHorizontal: "3%",
                        resizeMode: "contain",
                      }}
                    />
                  )}
                  textInputProps={{
                    onFocus: () => {
                      setAuto(false);
                    },
                    errorStyle: { color: "red" },
                  }}
                  onPress={(data, details = null) => {
                    onChooseLocation(data.structured_formatting.main_text);
                  }}
                  query={{
                    key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
                    language: "en",
                    components: "country:us",
                    type: '(cities)'
                  }}
                />
              </View>

              <View style={styles.bottomView}>
                <TouchableOpacity
                  onPress={() => {
                    getLocationInIos(address);
                  }}
                  style={styles.bottomBtn}
                >
                  <Text style={styles.btnText}>Use my current location</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SelectLocation;
