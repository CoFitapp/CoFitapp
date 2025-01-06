import {
  NativeModules,
  PixelRatio,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import fonts from "../../constants/fonts";
import images from "../../constants/images";
import { Dropdown } from "react-native-element-dropdown";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Toast from "react-native-simple-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";
import styles from "./style";
import BottomSheet from "react-native-gesture-bottom-sheet";
import colors from "../../constants/colors";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";
import { useSelector } from "react-redux";
import * as services from "../../constants/services";
import * as Url from "../../constants/url";
// import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const AddEvent = ({ navigation }) => {
  const bottomSheet = useRef();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isLoader, setIsLoader] = useState(false);
  const [auto, setAuto] = useState(true);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [timeZone, setTimeZone] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [title, setTitle] = useState("");
  const [eventImage, setEventImage] = useState({});
  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isOffline, setIsOffline] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amount, setAmount] = useState("");
  const [isPaid, setIsPaid] = useState(null);
  // const [offlineClick, setOfflineClick] = useState(null)
  const [description, setDescription] = useState("");
  const [showEventStart, setShowEventStart] = useState("");
  const [showEventStartTime, setShowEventStartTime] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventType, setEventType] = useState("");
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  const eventTypeArr = [
    { label: "Yoga Class", value: "Yoga Class" },
    { label: "Running Meetup", value: "Running Meetup" },
    { label: "Basketball Runs", value: "Basketball Runs" },
    { label: "Cycling Ride", value: "Cycling Ride" },
    { label: "Outdoor Bootcamp", value: "Outdoor Bootcamp" },
    { label: "Dance Fitness", value: "Dance Fitness" },
    { label: "Swimming Challenge", value: "Swimming Challenge" },
    { label: "Zumba Session", value: "Zumba Session" },
    { label: "HIIT Workout", value: "HIIT Workout" },
    { label: "Pilates Class", value: "Pilates Class" },
    { label: "Walking Group", value: "Walking Group" },
    { label: "Mindfulness Meditation", value: "Mindfulness Meditation" },
    { label: "Weightlifting Workshop", value: "Weightlifting Workshop" },
    { label: "Family Fitness Day", value: "Family Fitness Day" },
    { label: "Soccer Runs", value: "Soccer Runs" },
    { label: "Group Hike", value: "Group Hike" },
    { label: "CrossFit Workout", value: "CrossFit Workout" },
    { label: "5K Fun Run", value: "5K Fun Run" },
    { label: "Wellness Workshop", value: "Wellness Workshop" },
    { label: "Team Sports Day", value: "Team Sports Day" },
    { label: "Fitness Charity Run", value: "Fitness Charity Run" },
    { label: "Bodyweight Workout", value: "Bodyweight Workout" },
    { label: "Tai Chi Class", value: "Tai Chi Class" },
    { label: "Local Park Workout", value: "Local Park Workout" },
    { label: "Stretching Session", value: "Stretching Session" },
    { label: "Football", value: "Football" },
  ];

  const takeAphoto = async () => {
    bottomSheet?.current.close();
    setTimeout(async () => {
      const res = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path,
      };
      setEventImage(imageFile);
      // updateProfileImage(imageFile)
      console.log("redshjgsdjhgjhdgasjhd", res);
    }, 750);
  };

  const chooseFromGallery = async () => {
    bottomSheet?.current.close();
    setTimeout(async () => {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      let imageFile = {
        name: new Date().getTime() + ".png",
        type: res.mime,
        uri: res.path,
      };
      setEventImage(imageFile);
      // updateProfileImage(imageFile)
      console.log("redshjdsaasdsdsgsdjhgjhdgasjhd", res);
    }, 750);

    console.log(res);
  };

  const onSubmit = () => {
    if (title.trim().length == 0) {
      Toast.show("Please add event title.");
    } else if (Object.keys(eventImage).length == 0) {
      Toast.show("Please add event image.");
    } else if (eventType.length == 0) {
      Toast.show("Please select event type.");
    }
    // else if (isOffline == null) {
    //   Toast.show('Please choose event type.')
    // }
    else if (location.trim().length == 0) {
      Toast.show("Please add event location.");
    } else if (startDate.length == 0) {
      Toast.show("Please add event start date.");
    } else if (endDate.length == 0) {
      Toast.show("Please add event end date.");
    } else if (startTime.length == 0) {
      Toast.show("Please add event start time.");
    } else if (endTime.length == 0) {
      Toast.show("Please add event end time.");
    } else if (description.trim().length == 0) {
      Toast.show("Please add event description.");
    } else if (capacity.trim().length == 0) {
      Toast.show("Please select capacity.");
    } else if (isPaid == null) {
      Toast.show("Please choose event type.");
    } else if (isPaid && amount.trim().length == 0) {
      Toast.show("Please add amount");
    } else {
      toggleModal();

      // let newData = {
      //   title: title,
      //   image: eventImage,
      //   type: eventType,
      //   isOffline: isOffline,
      //   location: location,
      //   startDate: startDate,
      //   endDate: endDate,
      //   startTime: startTime,
      //   endTime: endTime,
      //   description: description,
      //   capacity: capacity,
      //   isPaid: isPaid,
      //   amount: amount,
      // }
      // console.log('dsahdjgsagdjgsjdasj', userInfo);
      // toggleModal()
      // navigation.navigate("EventReview", { eventData: data, eventImage: eventImage, newData: newData })
    }
  };

  const onConfirmSubmit = async () => {
    let newDate;
    let date = moment(startDate).format("ddd, MMM D");
    let start_date = moment(startDate).format("MMM D");

    if (startDate == endDate) {
      newDate = {
        when: `${date}, ${moment(startTime).format("hh:mm A")} - ${moment(
          endTime
        ).format("hh:mm A")}`,
        start_date: start_date,
      };
    } else {
      let endDate1 = moment(endDate).format("ddd, MMM D");
      newDate = {
        when: `${date}, ${moment(startTime).format(
          "hh:mm A"
        )} - ${endDate1}, ${moment(endTime).format("hh:mm A")}`,
        start_date: start_date,
      };
    }

    let data = {
      events: {
        date: newDate,
        title: title,
        venue: {
          link: "https://www.google.com/search?sca_esv=577764723&hl=en&q=Pinnacle+Fitness+Center&ludocid=12328716643884496808&ibp=gwp%3B0,7",
          name: "Pinnacle Fitness Center",
          reviews: 127,
        },
        address: [location],
        description: description,
        event_type: eventType,
        isOffline: isOffline,
        organizer: userInfo.name,
        city_name: "Chicago",
        capacity: capacity,
        isPaid: isPaid,
        amount: amount,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
      },
      user_id: userInfo.id,
    };
    console.log("423423432e232d2", data);
    setIsLoader(true);
    let response = await services.post(Url.ADD_EVENTS, "", data, "json");
    if (response.status) {
      uploadEventImage(response.event.id);
    } else {
      setIsLoader(false);
      alert("Something went wrong.");
    }
    console.log("rtuyer8394y9238", response);
  };

  const uploadEventImage = async (eventId) => {
    let data = new FormData();
    data.append("event_image", eventImage);
    let url = `${Url.ADD_EVENT_IMAGE}/${eventId}`;
    let response = await services.post(url, "", data, "formdata");
    console.log("event image upload response111111111", response);
    if (response.status) {
      setIsLoader(false);
      setModalVisible(!isModalVisible);
      alert("Event created successfully.");
      setTimeout(() => {
        navigation.navigate("MyEvents");
      }, 1000);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onChooseLocation = (data) => {
    setLocation(data.description);
    // setNewLocation(data.description)
    // setTimeout(() => {
    //   setLocation(data.description)
    // }, 2000);
  };
  const formatResult = (data) => {
    const terms = data.terms;
    if (terms && terms.length >= 2) {
      const city = terms[0].value;
      const state = terms[1].value;
      return `${city}, ${state}`;
    }
    return data.description; // Fallback to original description
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Platform.OS == "ios" ? statusBarHeight : 0,
      }}
    >
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.skipbtn}
          >
            <Image style={styles.skipimg} source={images.back} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontFamily: fonts.SfPro_Bold,
              fontSize: 22,
              flex: 3,
            }}
          >
            Add Event
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ marginHorizontal: width * 0.03 }}>
          <Text
            style={{
              color: "#363C49",
              fontSize: 18,
              fontFamily: fonts.SfPro_Bold,
              marginTop: 10,
            }}
          >
            Basic Info
          </Text>
          <TextInput
            placeholder="Event Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            style={{
              marginTop: 15,
              borderColor: "#8B93A1",
              width: width * 0.94,
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
          ></TextInput>

          <View
            style={{
              width: width * 0.94,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  color: "#363C49",
                  fontSize: 18,
                  fontFamily: fonts.SfPro_Bold,
                }}
              >
                {" "}
                Upload Event Image
              </Text>
            </View>
            {Object.keys(eventImage).length == 0 ? (
              <TouchableOpacity
                onPress={() => bottomSheet.current.show()}
                style={{
                  width: 100,
                  height: 80,
                  padding: 5,
                  borderRadius: 10,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={images.add}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    resizeMode: "contain",
                  }}
                />
                <Text style={{ fontFamily: fonts.SfPro_Medium, color: "#000" }}>
                  Upload Image
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 80,
                  borderRadius: 10,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{ uri: eventImage.uri }}
                  borderRadius={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TouchableOpacity
                    onPress={() => setEventImage({})}
                    style={{
                      height: 25,
                      width: 25,
                      borderRadius: 25 / 2,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                      marginTop: -5,
                      marginRight: -5,
                    }}
                  >
                    <Image
                      source={images.close}
                      style={{ height: 15, width: 15, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
          </View>

          <Text
            style={{
              color: "#363C49",
              fontSize: 18,
              fontFamily: fonts.SfPro_Bold,
              marginTop: 30,
            }}
          >
            Event Type
          </Text>

          <View
            style={{
              marginTop: 20,
              borderColor: "#8B93A1",
              justifyContent: "center",
              width: width * 0.94,
              borderWidth: 1,
              height: 40,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Dropdown
              style={{}}
              data={eventTypeArr}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Event Type"}
              containerStyle={{
                borderRadius: 5,
                height: 150,
                left: 36,
                alignSelf: "flex-start",
                width: width * 0.8,
              }}
              value={eventType}
              onChange={(item) => {
                console.log("sdffdscdcsd", item);
              }}
            />
          </View>

          <Text
            style={{
              color: "#363C49",
              fontSize: 18,
              fontFamily: fonts.SfPro_Bold,
              marginTop: 20,
            }}
          >
            Location
          </Text>

          <View
            style={{ flexDirection: "row", width: width * 1, marginTop: 10 }}
          >
            {/* <TouchableOpacity onPress={() => setIsOffline(false)} style={{
              height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: width * 0.45,
              borderColor: (!isOffline && isOffline != null) ? colors.orange_light : "#8B93A1",
              backgroundColor: (!isOffline && isOffline != null) ? colors.orange_light : "#fff", borderWidth: 1,
            }}>
              <Text style={{ color: (!isOffline && isOffline != null) ? '#fff' : "#000", fontFamily: fonts.SfPro_Medium }}>Online Events</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsOffline(true)} style={{ height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: width * 0.45, borderColor: (isOffline && isOffline != null) ? colors.orange_light : "#8B93A1", backgroundColor: (isOffline && isOffline != null) ? colors.orange_light : "#fff", borderWidth: 1, marginLeft: width * 0.04 }}>
              <Text style={{ color: (isOffline && isOffline != null) ? '#fff' : "#000", fontFamily: fonts.SfPro_Medium }}>Offline Events</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={()=>setIsOffline(true)} style={{ height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: width * 0.45, borderColor: "#8B93A1", borderWidth: 1, marginLeft: width * 0.04 }}>
              <Text>Offline Events</Text>

            </TouchableOpacity> */}
          </View>
          {/* {
            isOffline && */}
          <View
            style={{
              justifyContent: "center",
              marginTop: 10,
              borderColor: "#8B93A1",
            }}
          >
            <Text
              style={{
                color: "#363C49",
                fontSize: 18,
                fontFamily: fonts.SfPro_Bold,
              }}
            >
              Venue
            </Text>

            <View
              style={{
                borderRadius: 10,
                flexDirection: "row",
                width: width * 1,
                alignItems: "flex-start",
              }}
            >
              <GooglePlacesAutocomplete
                enablePoweredByContainer={false}
                placeholder="Enter Location"
                fetchDetails={true}
                keepResultsAfterBlur={true}
                styles={{
                  textInputContainer: {
                    width: width * 0.94,
                    borderColor: "#F1F5FC",
                    borderWidth: 1,
                    borderRadius: 6,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
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
                renderRow={(data) => (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultText}>{formatResult(data)}</Text>
                  </View>
                )}
                textInputProps={{
                  onFocus: () => {
                    setAuto(false);
                  },
                  placeholderTextColor: "#000",
                  errorStyle: { color: "red" },
                }}
                onPress={(data, details = null) => {
                  console.log("sdahsaddasdasaduahiiu", JSON.stringify(data));
                  onChooseLocation(data);
                  // console.log('sdahuaxzxxhiiu', JSON.stringify(details));
                  // setLocation(data.description)
                }}
                query={{
                  key: "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI",
                  language: "en",
                  components: 'country:us',
                  types: '(cities)',
                }}
              />
            </View>
          </View>
          {/* } */}
          <View>
            <Text
              style={{
                color: "#363C49",
                fontSize: 18,
                fontFamily: fonts.SfPro_Bold,
                marginTop: 30,
              }}
            >
              Date And Time
            </Text>
            <View
              style={{ flexDirection: "row", width: width * 1, marginTop: 20 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowEventStart(true), setOpen(true);
                }}
                style={{
                  width: width * 0.45,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  height: 40,
                }}
              >
                <Image
                  source={images.calendar}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#8B93A1",
                      fontSize: 12,
                      fontFamily: fonts.SfPro_Regular,
                    }}
                  >
                    Event Starts
                  </Text>
                  {startDate?.length != 0 && (
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        fontFamily: fonts.SfPro_Regular,
                      }}
                    >
                      {moment(startDate).format("MM-DD-YYYY")}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={open}
                // minimumDate={showEventStart ? new Date() : date}
                date={date}
                onConfirm={(date) => {
                  console.log("saduiauijgajdgjca", date.getTime());
                  if (showEventStart) {
                    setStartDate(date.getTime());
                    if (date.getTime() > endDate) {
                      setEndDate("");
                    }
                  } else {
                    setEndDate(date.getTime());
                    if (date.getTime() < startDate) {
                      setStartDate("");
                    }
                  }
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setOpen1(true), setShowEventStartTime(true);
                }}
                style={{
                  width: width * 0.45,
                  marginLeft: width * 0.04,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  height: 40,
                }}
              >
                <Image
                  source={images.clock}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                ></Image>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#8B93A1",
                      fontSize: 12,
                      fontFamily: fonts.SfPro_Regular,
                    }}
                  >
                    Start Time
                  </Text>
                  {startTime?.length != 0 && (
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        fontFamily: fonts.SfPro_Regular,
                      }}
                    >
                      {moment(startTime).format("hh:mm A")}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="time"
                open={open1}
                // minimumDate={showEventStart ? new Date() : date}
                date={date1}
                onConfirm={(date) => {
                  if (showEventStartTime) {
                    setStartTime(date.getTime());
                  } else {
                    setEndTime(date.getTime());
                  }

                  setOpen1(false);
                  setDate1(date);
                }}
                onCancel={() => {
                  setOpen1(false);
                }}
              />
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", width: width * 1, marginTop: 20 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowEventStart(false), setOpen(true);
                }}
                style={{
                  width: width * 0.45,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  height: 40,
                }}
              >
                <Image
                  source={images.calendar}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                ></Image>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#8B93A1",
                      fontSize: 12,
                      fontFamily: fonts.SfPro_Regular,
                    }}
                  >
                    Event Ends
                  </Text>
                  {endDate?.length != 0 && (
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        fontFamily: fonts.SfPro_Regular,
                      }}
                    >
                      {moment(endDate).format("MM-DD-YYYY")}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowEventStartTime(false), setOpen1(true);
                }}
                style={{
                  width: width * 0.45,
                  marginLeft: width * 0.04,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  height: 40,
                }}
              >
                <Image
                  source={images.clock}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                ></Image>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#8B93A1",
                      fontSize: 12,
                      fontFamily: fonts.SfPro_Regular,
                    }}
                  >
                    End Time
                  </Text>
                  {endTime?.length != 0 && (
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                        fontFamily: fonts.SfPro_Regular,
                      }}
                    >
                      {moment(endTime).format("hh:mm A")}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {/* <Text style={{
              color: "#363C49",
              fontSize: 18,
              fontFamily: fonts.SfPro_Bold, marginTop: 30
            }}>Time Zone</Text>

            <View style={{ marginTop: 20, borderColor: '#8B93A1', justifyContent: 'center', width: width * 0.94, borderWidth: 1, height: 40, borderRadius: 5, padding: 10 }}>
              <Dropdown
                style={{}}

                data={data}

                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Time Zone'}
                containerStyle={{ borderRadius: 5, marginTop: 10, left: 11, height: 150, alignSelf: "flex-start", width: width * 0.94 }}
                value={timeZone}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTimeZone(item.value)
                  setValue(item.value);
                  setIsFocus(false);
                }}

              />
            </View> */}
            <View>
              <Text
                style={{
                  color: "#363C49",
                  fontSize: 18,
                  fontFamily: fonts.SfPro_Bold,
                  marginTop: 30,
                }}
              >
                Description
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: 20,
                  borderColor: "#8B93A1",
                  borderRadius: 5,
                  alignItems: "flex-start",
                  height: 100,
                  paddingHorizontal: 5,
                  justifyContent: "flex-start",
                }}
              >
                <TextInput
                  multiline={true}
                  value={description}
                  onChangeText={(val) => setDescription(val)}
                  style={{ textAlignVertical: "top", height: 100 }}
                  placeholder="Add description"
                  returnKeyType="done"
                  blurOnSubmit={true}
                ></TextInput>
              </View>
            </View>
            <Text
              style={{
                color: "#363C49",
                fontSize: 18,
                fontFamily: fonts.SfPro_Bold,
                marginTop: 20,
              }}
            >
              Add Capacity
            </Text>
            <TextInput
              placeholder="Event Capacity"
              value={capacity}
              keyboardType="number-pad"
              returnKeyType="done"
              blurOnSubmit={true}
              onChangeText={(val) => setCapacity(val)}
              style={{
                marginTop: 15,
                borderColor: "#8B93A1",
                width: width * 0.94,
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
              }}
            ></TextInput>
            <Text
              style={{
                color: "#363C49",
                fontSize: 18,
                fontFamily: fonts.SfPro_Bold,
                marginTop: 20,
              }}
            >
              Add Type
            </Text>
            <View
              style={{ flexDirection: "row", width: width * 1, marginTop: 20 }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsPaid(false);
                }}
                style={{
                  height: 40,
                  backgroundColor:
                    isPaid != null && !isPaid ? colors.orange_light : "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: width * 0.45,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.SfPro_Medium,
                    color: isPaid != null && !isPaid ? "#fff" : "#000",
                  }}
                >
                  Free Event
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsPaid(true);
                }}
                style={{
                  height: 40,
                  backgroundColor:
                    isPaid != null && isPaid ? colors.orange_light : "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  width: width * 0.45,
                  borderColor: "#8B93A1",
                  borderWidth: 1,
                  marginLeft: width * 0.04,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.SfPro_Medium,
                    color: isPaid != null && isPaid ? "#fff" : "#000",
                  }}
                >
                  Paid Event
                </Text>
              </TouchableOpacity>
            </View>
            {isPaid && (
              <View
                style={{
                  borderWidth: 1,
                  height: 40,
                  justifyContent: "center",
                  borderColor: "#8B93A1",
                  borderRadius: 5,
                  marginTop: 20,
                  paddingHorizontal: 5,
                }}
              >
                <TextInput
                  onChangeText={(text) => setAmount(text)}
                  keyboardType="numeric"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  value={amount}
                  style={{
                    fontSize: 16,
                    color: "#000",
                    marginLeft: "5%",
                    fontFamily: fonts.SfPro_Regular,
                    alignItems: "center",
                  }}
                  placeholderTextColor="#000"
                  placeholder="Amount"
                ></TextInput>
              </View>
            )}
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={styles.bottomBtn}
            >
              <Text style={styles.btnText}>Review & Submit</Text>
              {/* <Image style={{height:20,width:20,resizeMode:'contain',marginHorizontal:10}} source={images.logout}></Image> */}
            </TouchableOpacity>

            {/* <Dropdown
                        style={{alignItems:'center'}}
                       
                        data={timeZone}
                        textStyle={{ color: "red", fontFamily:fonts.SfPro_Medium, fontSize: 14, }}
                        maxHeight={200}
                        labelField="data"
                        valueField="data"
                        maxSelect={4}
                        placeholder={"Time Zone"}
                        containerStyle={{ borderRadius: 5,marginTop:'5%',height:150,left:36,alignSelf:"flex-start" ,width:width*0.8}}
                        selectedTextStyle={{ color: "grey" , fontFamily:"FuturaPTBook", fontSize: 16,}}
                    
                        itemTextStyle={{ color: "grey" }}
                        placeholderStyle={{
                         
                          fontFamily:"FuturaPTBook", fontSize: 16,
                          color: "grey",
                        }}
                        value={timeZone}
                        onChange={(item) => {
                          
        
                        }}
                      />  */}

            {/* <TextInput placeholder='(GMT-1100)American Samoa Time' style={{marginTop:10,borderColor:'#8B93A1',width:width*0.9,borderWidth:1,borderRadius:5,padding:10}}>  

</TextInput> */}
          </View>
          <BottomSheet
            ref={bottomSheet}
            height={180}
            width={100}
            sheetBackgroundColor={colors.background}
          >
            <View
              style={{
                height: "100%",
                marginHorizontal: "2%",
                backgroundColor: colors.background,
              }}
            >
              <View
                style={{
                  height: "60%",
                  borderRadius: 10,
                  marginHorizontal: "2%",
                  backgroundColor: "#fff",
                }}
              >
                <TouchableOpacity
                  onPress={() => takeAphoto()}
                  style={{
                    marginHorizontal: "2%",
                    backgroundColor: "#fff",
                    height: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomColor: colors.placeholderColor,
                    borderBottomWidth: 0.5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: fonts.SfPro_Medium,
                      color: colors.current,
                    }}
                  >
                    Take a photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => chooseFromGallery()}
                  style={{
                    marginHorizontal: "2%",
                    backgroundColor: "#fff",
                    height: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: fonts.SfPro_Medium,
                      color: colors.current,
                    }}
                  >
                    Choose Existing photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => bottomSheet.current.close()}
                  style={{ height: "45%", marginTop: "5%" }}
                >
                  <View
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 10,
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: fonts.SfPro_Medium,
                        color: colors.current,
                      }}
                    >
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </View>
      </KeyboardAwareScrollView>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(!isModalVisible);
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View
            style={{
              height: height,
              width: width,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                height: height * 0.9,
                width: width * 0.96,
                marginLeft: width * 0.02,
                marginTop: height * 0.05,
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
            >
              {isLoader && (
                <View
                  style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <ActivityIndicator
                    size={"large"}
                    color={colors.orange_light}
                  />
                </View>
              )}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "20%" }}></View>
                <View
                  style={{
                    width: "60%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: fonts.SfPro_Bold,
                      fontSize: 22,
                    }}
                  >
                    Review Event
                  </Text>
                </View>
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(!isModalVisible)}
                    style={styles.skipbtn1}
                  >
                    <Image style={styles.skipimg} source={images.close}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <KeyboardAwareScrollView>
                <View style={{ marginHorizontal: width * 0.03 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "flex-start",
                      paddingRight: width * 0.25,
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Event Title :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 32,
                      }}
                    >
                      {title}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: width * 0.9,
                      alignItems: "flex-start",
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          color: "#363C49",
                          fontSize: 16,
                          fontFamily: fonts.SfPro_Bold,
                        }}
                      >
                        {" "}
                        Event Image :
                      </Text>
                    </View>
                    {Object.keys(eventImage).length == 0 ? (
                      <TouchableOpacity
                        onPress={() => bottomSheet.current.show()}
                        style={{
                          marginLeft: width * 0.05,
                          width: 80,
                          height: 60,
                          padding: 5,
                          borderRadius: 10,
                          borderColor: "#8B93A1",
                          borderWidth: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={images.add}
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            resizeMode: "contain",
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: fonts.SfPro_Medium,
                            color: "#000",
                          }}
                        >
                          Upload Image
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          marginLeft: width * 0.05,
                          width: 80,
                          height: 60,
                          borderRadius: 10,
                          borderColor: "#8B93A1",
                          borderWidth: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ImageBackground
                          source={{ uri: eventImage.uri }}
                          borderRadius={10}
                          style={{ height: "100%", width: "100%" }}
                        ></ImageBackground>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "center",
                      paddingRight: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Event Type :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 30,
                      }}
                    >
                      {eventType}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Event Mode :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 30,
                      }}
                    >
                      {isOffline ? "Offline" : "Online"}
                    </Text>
                  </View>

                  {isOffline && (
                    <View
                      style={{
                        flexDirection: "row",
                        width: width * 0.9,
                        alignItems: "flex-start",
                        paddingRight: width * 0.25,
                      }}
                    >
                      <Text
                        style={{
                          color: "#363C49",
                          fontSize: 16,
                          fontFamily: fonts.SfPro_Bold,
                          marginTop: 30,
                        }}
                      >
                        Location:{" "}
                      </Text>

                      <Text
                        style={{
                          color: "#363C49",
                          fontSize: 14,
                          fontFamily: fonts.SfPro_Medium,
                          marginTop: 32,
                        }}
                      >
                        {location}
                      </Text>
                    </View>
                  )}

                  <View style={{ width: width * 0.9, jus: "center" }}>
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Date And Time :{" "}
                    </Text>
                    <View style={{ flexDirection: "row", width: width * 1 }}>
                      <View
                        style={{
                          width: width * 0.42,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#363C49",
                            fontSize: 14,
                            fontFamily: fonts.SfPro_Bold,
                            marginTop: 10,
                          }}
                        >
                          Start Date :{" "}
                        </Text>

                        {startDate?.length != 0 && (
                          <Text
                            style={{
                              color: "#000",
                              marginTop: 10,
                              fontSize: 12,
                              fontFamily: fonts.SfPro_Medium,
                            }}
                          >
                            {moment(startDate).format("MM-DD-YYYY")}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          width: width * 0.42,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            color: "#363C49",
                            fontSize: 14,
                            fontFamily: fonts.SfPro_Bold,
                            marginTop: 10,
                          }}
                        >
                          Start Time :{" "}
                        </Text>
                        {startTime?.length != 0 && (
                          <Text
                            style={{
                              color: "#000",
                              marginTop: 10,
                              fontSize: 12,
                              fontFamily: fonts.SfPro_Medium,
                            }}
                          >
                            {moment(startTime).format("hh:mm A")}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", width: width * 1 }}>
                      <View
                        style={{
                          width: width * 0.42,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#363C49",
                            fontSize: 14,
                            fontFamily: fonts.SfPro_Bold,
                            marginTop: 10,
                          }}
                        >
                          End Date :{" "}
                        </Text>

                        {endDate?.length != 0 && (
                          <Text
                            style={{
                              color: "#000",
                              marginTop: 10,
                              fontSize: 12,
                              fontFamily: fonts.SfPro_Medium,
                            }}
                          >
                            {moment(endDate).format("MM-DD-YYYY")}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          width: width * 0.42,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            color: "#363C49",
                            fontSize: 14,
                            fontFamily: fonts.SfPro_Bold,
                            marginTop: 10,
                          }}
                        >
                          End Time :{" "}
                        </Text>
                        {endTime?.length != 0 && (
                          <Text
                            style={{
                              color: "#000",
                              marginTop: 10,
                              fontSize: 12,
                              fontFamily: fonts.SfPro_Medium,
                            }}
                          >
                            {moment(endTime).format("hh:mm A")}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "flex-start",
                      paddingRight: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Description :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 32,
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "center",
                      paddingRight: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Capacity :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 30,
                      }}
                    >
                      {capacity}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: width * 0.9,
                      alignItems: "center",
                      paddingRight: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 16,
                        fontFamily: fonts.SfPro_Bold,
                        marginTop: 30,
                      }}
                    >
                      Ticket Type :{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#363C49",
                        fontSize: 14,
                        fontFamily: fonts.SfPro_Medium,
                        marginTop: 30,
                      }}
                    >
                      {isPaid ? "Paid" : "Free"}
                    </Text>
                  </View>

                  {isPaid && (
                    <View
                      style={{
                        flexDirection: "row",
                        width: width * 0.9,
                        alignItems: "center",
                        paddingRight: width * 0.3,
                      }}
                    >
                      <Text
                        style={{
                          color: "#363C49",
                          fontSize: 16,
                          fontFamily: fonts.SfPro_Bold,
                          marginTop: 30,
                        }}
                      >
                        Amount :{" "}
                      </Text>

                      <Text
                        style={{
                          color: "#363C49",
                          fontSize: 14,
                          fontFamily: fonts.SfPro_Medium,
                          marginTop: 30,
                        }}
                      >
                        {amount}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisible(!isModalVisible)}
                      style={styles.bottomBtn1}
                    >
                      <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onConfirmSubmit()}
                      style={styles.bottomBtn1}
                    >
                      <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
export default AddEvent;
