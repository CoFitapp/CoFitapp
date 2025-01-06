import {
  Text,
  View,
  TextInput,
  ScrollView,
  NativeModules,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import Geolocation from "react-native-geolocation-service";
import Geolocation from '@react-native-community/geolocation';

import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import fonts from "../../constants/fonts";
import * as services from '../../constants/services'
import * as Url from '../../constants/url'
import { Dropdown } from "react-native-element-dropdown";

const PickLocation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [birthdate, setBirthdate] = useState("");
  const [birthdate1, setBirthdate1] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [picker, setShowPicker] = useState(false);
  const [picker1, setShowPicker1] = useState(false);
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const [auto, setAuto] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [preciseCoords, setPreciseCoords] = useState({});
  const [mapVisible, setMapVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [address, setAddress] = useState("");
  const [eventCoords, setEventCoords] = useState([]);
  const [preciseLocation, setPreciseLocation] = useState("");
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const { height, width } = Dimensions.get("window");
  const { StatusBarManager } = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  useEffect(() => {
    getEventInfo()
    getAllCities()
  }, [])

  const getEventInfo = async () => {
    let eventLocation = await AsyncStorage.getItem("eventLocation")
    if (eventLocation != null && route?.params?.edit == true) {
      setSearch(eventLocation)
      console.log('dsddasashkhasa', eventLocation);
    }
    let eventDate = await AsyncStorage.getItem("date")
    if (eventDate != null && route?.params?.edit == true) {
      let date = moment(JSON.parse(eventDate)).format("DD/MM/YYYY")
      setBirthdate(date)
      console.log('dsddasaddasashkhasa', eventDate);
    }
    let eventDate1 = await AsyncStorage.getItem("EndDate")
    if (eventDate1 != null && route?.params?.edit == true) {
      let date = moment(JSON.parse(eventDate1)).format("DD/MM/YYYY")
      setBirthdate1(date)
      console.log('dsddasaddasashkhasa', eventDate1);
    }
    let startTime = await AsyncStorage.getItem("startDate")
    if (startTime != null && route?.params?.edit == true) {
      let date = moment(JSON.parse(startTime)).format("hh:mm A")
      setStartDate(date)
      console.log('dsddasaddasashkhasa', startTime);
    }
    let endTime = await AsyncStorage.getItem("endDate")
    if (endTime != null && route?.params?.edit == true) {
      let date = moment(JSON.parse(endTime)).format("hh:mm A")
      setEndDate(date)
      console.log('dsddasaddasashkhasa', endTime);
    }
  }

  const formatResult = (data) => {
    const terms = data.terms;
    if (terms && terms.length >= 2) {
      const city = terms[0].value;
      const state = terms[1].value;
      return `${city}, ${state}`;
    }
    return data.description; // Fallback to original description
  };

  const getAllCities = async () => {
    let res = await services.get(Url.GET_ALL_CITIES)
    console.log('GET ALL CITIES RESPONSEEEEE111', res);
    if (res.status) {
      if (res?.cities) {
        setCities(res.cities.sort((a, b) => a.city.localeCompare(b.city)))
      }
    }
  }

  const searchData = () => {
    return ["New York", "California", "Los Angeles", "Miami"].map(
      (item, index) => (
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => setSearch(item)}
          key={index}
        >
          <Text style={styles.location}>{item}</Text>
        </TouchableOpacity>
      )
    );
  };
  const getCurrentLocation = async () => {
    let cityName = "";
    // if (Platform.OS == "ios") {
    //   await Geolocation.requestAuthorization("always");
    // }
    Geolocation.getCurrentPosition((position) => {
      console.log("dshjgfsdgjhs", position.coords);
      setLatitude(0);
      setLongitude(0);
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setPreciseCoords(coords);
      setLatitude(parseFloat(position.coords.latitude));
      setLongitude(parseFloat(position.coords.longitude));
      // setMapVisible(true);
      // setAuto(true);
      Geocoder.from(position.coords.latitude, position.coords.longitude).then(
        (json) => {
          console.log("asnbmbmbnmbmbdsnkljmbmnbmdasd", JSON.stringify(json));
          let addressComponent = json.results[0].address_components;
          for (const component of addressComponent) {
            if (component.types.includes("administrative_area_level_1")) {
              cityName = component.long_name;
              break;
            }
          }
          // setPreciseLocation(cityName)
          // getEventCoords(cityName)
          setSearch(cityName);
          setModalVisible(false);
        }
      );
    });
  };

  const nextPress = (val) => {
    let eventDate = moment(birthdate, "DD/MM/YYYY").format("ddd, MMM D");
    let eventDate1 = moment(birthdate1, "DD/MM/YYYY").format("ddd, MMM D");
    AsyncStorage.setItem("eventDate", eventDate);
    AsyncStorage.setItem("eventEndDate", eventDate1);
    AsyncStorage.setItem("eventLocation", search);
    AsyncStorage.setItem("eventStartTime", startDate);
    AsyncStorage.setItem("eventEndTime", endDate);
    AsyncStorage.setItem("SelectedCity", selectedCity)
    if (val == 1) {
      navigation.navigate("FreeOrPaid", { edit: route?.params?.edit });
    } else {
      navigation.navigate('StandardTicketAddAdvance')
    }

  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.scrollView}>
        <View
          style={{
            height: "90%",
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.back}
            >
              <FastImage
                source={images.backArrow}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={route?.params?.edit ? false : true}
              onPress={() => {
                nextPress(2)

              }}
              style={styles.save}>
              <Text style={styles.saveText}>Save & exit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeLine}>
            <TimeLineComponent perc={110} />
            <TimeLineComponent perc={30} />
            <TimeLineComponent perc={0} />
          </View>
          <LabelDescComponent
            desc={`Set the stage for your fitness gathering. Choose a date and time that suits best, and select a location that complements your event’s energy.`}
            label={"Schedule & Locate Your Event"}
          />
          <ScrollView>
            <View style={styles.typeContainer}>
              <FastImage
                source={images.locNew}
                resizeMode="contain"
                style={{ height: 22, width: 22 }}
              ></FastImage>
              <Text style={styles.typeText}>Location</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
              style={[
                styles.dropdown,
                {
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 14, width: "80%",
                  color: search ? "black" : "#999999",
                  fontFamily: fonts.SfPro_Regular,
                }}
              >
                {search ? search : "Pick a location"}
              </Text>
              <FastImage
                source={images.arrDown}
                style={{ height: 18, width: 18 }}
              ></FastImage>
            </TouchableOpacity>

            <View style={styles.typeContainer}>
              <FastImage
                source={images.locNew}
                style={{ height: 22, width: 22 }}
              ></FastImage>
              <Text style={styles.typeText}>City</Text>
            </View>
            <View style={{ borderColor: '#8B93A1', justifyContent: 'center', width: width * 0.9, borderWidth: 1, height: 50, borderRadius: 11, padding: 10 }}>
              <Dropdown
                style={{}}
                data={cities}
                maxHeight={300}
                labelField="city"
                valueField="city"
                placeholder={'Select Event City'}
                containerStyle={{ borderRadius: 5, height: 150, alignSelf: "flex-start", width: width * 0.9, left: 20, marginTop: 10 }}
                value={selectedCity}
                onChange={item => {
                  setSelectedCity(item.city)
                }}

              />
            </View>


            <View style={styles.typeContainer}>
              <FastImage
                source={images.calNew}
                style={{ height: 22, width: 22 }}
              ></FastImage>
              <Text style={styles.typeText}>Date</Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              activeOpacity={0.8}
              style={[
                styles.dropdown,
                {
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: birthdate ? "black" : "#999999",
                  fontFamily: fonts.SfPro_Regular,
                }}
              >
                {birthdate ? birthdate : "Start Date"}
              </Text>
              <FastImage
                source={images.arrDown}
                style={{ height: 18, width: 18 }}
              ></FastImage>
            </TouchableOpacity>

            {picker && (
              <DatePicker
                modal
                open={picker}
                date={date}
                format="DD/MM/YYYY"
                minimumDate={new Date()}
                // maximumDate={new Date()}
                value={birthdate}
                onConfirm={(selectedDate) => {
                  console.log("sadsasassasadaasadsafdfa", new Date());
                  console.log("sadsasassasadaasadsafdfa", moment(''));
                  setShowPicker(false);
                  setBirthdate(
                    moment(selectedDate.toISOString()).format("DD/MM/YYYY")
                  );
                  console.log('sbakjhshdjkakdhah', selectedDate.getTime());
                  AsyncStorage.setItem("date", JSON.stringify(selectedDate.getTime()));
                }}
                onCancel={() => {
                  setShowPicker(false);
                }}
                mode={"date"}
              />
            )}

            <TouchableOpacity
              onPress={() => setShowPicker1(true)}
              activeOpacity={0.8}
              style={[
                styles.dropdown,
                {
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: birthdate1 ? "black" : "#999999",
                  fontFamily: fonts.SfPro_Regular,
                }}
              >
                {birthdate1 ? birthdate1 : "End Date"}
              </Text>
              <FastImage
                source={images.arrDown}
                style={{ height: 18, width: 18 }}
              ></FastImage>
            </TouchableOpacity>

            {picker1 && (
              <DatePicker
                modal
                open={picker1}
                date={date}
                format="DD/MM/YYYY"
                minimumDate={new Date()}
                // maximumDate={new Date()}
                value={birthdate}
                onConfirm={(selectedDate) => {
                  console.log("saddsafdfa", moment(selectedDate.toISOString()).format("DD/MM/YYYY"));
                  setShowPicker1(false);
                  setBirthdate1(moment(selectedDate.toISOString()).format("DD/MM/YYYY"))
                  console.log('sbakjhshdjkakdhah', selectedDate.getTime());
                  AsyncStorage.setItem("EndDate", JSON.stringify(selectedDate.getTime()));
                }}
                onCancel={() => {
                  setShowPicker1(false);
                }}
                mode={"date"}
              />
            )}

            <View style={styles.typeContainer}>
              <FastImage
                source={images.timeNew}
                style={{ height: 22, width: 22 }}
              ></FastImage>
              <Text style={styles.typeText}>Time</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => setStartPicker(true)}
                activeOpacity={0.8}
                style={[
                  styles.dropdown,
                  {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "46%",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: startDate ? "black" : "#999999",
                    fontFamily: fonts.SfPro_Regular,
                  }}
                >
                  {startDate ? startDate : "Start time"}
                </Text>
                <FastImage
                  source={images.arrDown}
                  style={{ height: 18, width: 18 }}
                ></FastImage>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEndPicker(true)}
                activeOpacity={0.8}
                style={[
                  styles.dropdown,
                  {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "46%",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: endDate ? "black" : "#999999",
                    fontFamily: fonts.SfPro_Regular,
                  }}
                >
                  {endDate ? endDate : "End time"}
                </Text>
                <FastImage
                  source={images.arrDown}
                  style={{ height: 18, width: 18 }}
                ></FastImage>
              </TouchableOpacity>
            </View>

            {startPicker && (
              <DatePicker
                modal
                mode="time"
                open={startPicker}
                date={date}
                format="DD/MM/YYYY"
                value={startDate}
                onConfirm={(selectedDate) => {
                  setStartPicker(false);
                  setStartDate(
                    moment(selectedDate.toISOString()).format("hh:mm A")
                  );
                  AsyncStorage.setItem(
                    "startDate",
                    selectedDate.getTime().toString()
                  );
                }}
                onCancel={() => {
                  setStartPicker(false);
                }}
              />
            )}
            {endPicker && (
              <DatePicker
                modal
                mode="time"
                open={endPicker}
                date={date}
                format="DD/MM/YYYY"
                value={endDate}
                onConfirm={(selectedDate) => {
                  setEndPicker(false);
                  setEndDate(moment(selectedDate.toISOString()).format("hh:mm A"));
                  AsyncStorage.setItem(
                    "endDate",
                    selectedDate.getTime().toString()
                  );
                }}
                onCancel={() => {
                  setEndPicker(false);
                }}
              />
            )}
          </ScrollView>
          {/* <View style={{ marginVertical: 60 }}></View> */}
        </View>
        <View
          style={{
            height: "10%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            disabled={
              search.length < 1 ||
              birthdate.length < 1 ||
              birthdate1.length < 1 ||
              startDate.length < 1 ||
              endDate.length < 1 ||
              selectedCity == null
            }
            onPress={() => nextPress(1)}
            style={[
              styles.button,
              {
                backgroundColor:
                  search && birthdate && birthdate1 && startDate && endDate && selectedCity
                    ? "#E25F3C"
                    : "#C9C9C9",
              },
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <Modal
          style={styles.modal}
          backdropOpacity={0.1}
          isVisible={isModalVisible}
        >
          <KeyboardAwareScrollView contentContainerStyle={styles.modalView}>
            <Text style={styles.heading}>Pick your location</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.close}
            >
              <FastImage
                source={images.close}
                style={{ height: 14, width: 14 }}
                resizeMode="contain"
              ></FastImage>
            </TouchableOpacity>
            <View style={styles.separator}></View>

            <View
              style={{
                paddingHorizontal: 20,
                borderRadius: 12,
                width: "100%",
                justifyContent: "center",
                backgroundColor: "#F2F2F2",
              }}
            >
              <GooglePlacesAutocomplete
                placeholder="Search for location"
                fetchDetails={true}

                keepResultsAfterBlur={true}
                enablePoweredByContainer={false}
                styles={{
                  textInputContainer: {
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  },
                }}
                renderLeftButton={() => (
                  <FastImage
                    source={images.magnifer}
                    style={styles.leftIcon}
                  ></FastImage>
                )}
                renderRow={(data) => (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultText}>{formatResult(data)}</Text>
                  </View>
                )}
                textInputProps={{
                  onFocus: () => {
                    setAuto(false);
                  },
                  onBlur: () => {
                    setAuto(true);
                  },
                  value: { search },
                  placeholderTextColor: "#49454f",
                  backgroundColor: "transparent",
                  fontFamily: fonts.SfPro_Regular,
                  fontSize: 14,
                  paddingVertical: 16,
                  // style:{alignSelf:"center"},
                  errorStyle: { color: "red" },
                }}
                onPress={(data, details = null) => {
                  console.log("dasfsfsadasdsasadeqwasdasdasafeweww", data.description);
                  setSearch(data.description);
                  setModalVisible(false);
                  // setAuto(true);
                }}
                query={{
                  key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
                  language: "en",
                  components: 'country:us',
                  types: '(cities)',
                  // components: "country:us",
                }}
              />
            </View>

            {/* <View
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
                <FastImage
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
                setSearch(data.structured_formatting.main_text);
              }}
              query={{
                key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
                language: "en",
                components: "country:us",
              }}
            />
          </View> */}

            {/* <TouchableOpacity
            onPress={() => {
              getCurrentLocation();
            }}
            activeOpacity={0.5}
            style={styles.locationIcon}
          >
            <FastImage
              source={images.send}
              style={{ height: 25, width: 25 }}
            ></FastImage>
            <Text style={styles.currentLocationText}>
              Use my current location
            </Text>
          </TouchableOpacity>
          <View style={styles.separator}></View> */}

            {/* <Text style={styles.top}>Top searches</Text>
          {searchData()} */}
          </KeyboardAwareScrollView>
        </Modal>
      </View>
    </View>
  );
};

export default PickLocation;
