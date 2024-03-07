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
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import fonts from "../../constants/fonts";

const PickLocation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date());
  const [birthdate, setBirthdate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [picker, setShowPicker] = useState(false);
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
  const { height, width } = Dimensions.get("window");
  const { StatusBarManager } = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  useEffect(()=>{
    getEventInfo()
  },[])
  
  const getEventInfo=async()=>{
  let eventLocation =   await AsyncStorage.getItem("eventLocation")
    if(eventLocation!=null && route?.params?.edit==true){
      setSearch(eventLocation)
      console.log('dsddasashkhasa',eventLocation);
    }
    let eventDate =   await AsyncStorage.getItem("date")
    if(eventDate!=null && route?.params?.edit==true){
      let date = moment(JSON.parse(eventDate)).format("DD/MM/YYYY")
      setBirthdate(date)
      console.log('dsddasaddasashkhasa',eventDate);
    }
    let startTime =   await AsyncStorage.getItem("startDate")
    if(startTime!=null && route?.params?.edit==true){
      let date = moment(JSON.parse(startTime)).format("hh:mm A")
      setStartDate(date)
      console.log('dsddasaddasashkhasa',startTime);
    }
    let endTime =   await AsyncStorage.getItem("endDate")
    if(endTime!=null && route?.params?.edit==true){
      let date = moment(JSON.parse(endTime)).format("hh:mm A")
      setEndDate(date)
      console.log('dsddasaddasashkhasa',endTime);
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
    if (Platform.OS == "ios") {
      await Geolocation.requestAuthorization("always");
    }
    Geolocation.getCurrentPosition((position) => {
      console.log("dshjgfsdgjhs", position.coords);
      setLatitude(0);
      setLongitude(0);
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setPreciseCoords(coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // setMapVisible(true);
      // setAuto(true);
      Geocoder.from(position.coords.latitude, position.coords.longitude).then(
        (json) => {
          console.log("asnbmbmbnmbmbdsnkljmbmnbmdasd", JSON.stringify(json));
          let addressComponent = json.results[0].address_components;
          for (const component of addressComponent) {
            if (component.types.includes("locality")) {
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
    console.log('daskjskhdjkhkj',birthdate);
    let eventDate = moment(birthdate, "DD/MM/YYYY").format("ddd, MMM D");
    AsyncStorage.setItem("eventDate", eventDate);
    AsyncStorage.setItem("eventLocation", search);
    AsyncStorage.setItem("eventStartTime", startDate);
    AsyncStorage.setItem("eventEndTime", endDate);
    if(val==1){
      navigation.navigate("FreeOrPaid",{edit:route?.params?.edit});
    }else{
      navigation.navigate('StandardTicketAddAdvance')
    }
    
  };
  return (
    <View style={{backgroundColor:"#fff"}}>
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
          onPress={()=>{
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
              fontSize: 14,width:"80%",
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
            {birthdate ? birthdate : "Pick a date"}
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
              console.log("saddsafdfa", moment(selectedDate.toISOString()).format("DD/MM/YYYY"));
              setShowPicker(false);
              setBirthdate(
                moment(selectedDate.toISOString()).format("DD/MM/YYYY")
              );
              console.log('sbakjhshdjkakdhah',selectedDate.getTime());
              AsyncStorage.setItem("date", JSON.stringify(selectedDate.getTime()));
            }}
            onCancel={() => {
              setShowPicker(false);
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
            startDate.length < 1 ||
            endDate.length < 1
          }
          onPress={() => nextPress(1)}
          style={[
            styles.button,
            {
              backgroundColor:
                search && birthdate && startDate && endDate
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
              textInputProps={{
                onFocus: () => {
                  setAuto(false);
                },
                onBlur: () => {
                  setAuto(true);
                },
                value:{search},
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