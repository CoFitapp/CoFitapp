import { Text, View, ScrollView, ActivityIndicator, Image } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import moment from "moment";
import * as services from "../../constants/services";
import * as Url from "../../constants/url";
import colors from "../../constants/colors";
import MapView, { Marker } from "react-native-maps";

const apiKey = "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI";

const StandardTicketAddAdvance = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventPic, setEventPic] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDate1, setEventDate1] = useState("");
  const [eventName, setEventName] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [eventDiscription, setEventDiscription] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLoc, setEventLoc] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventInstructions, setEventInstructions] = useState("");
  const [eventTickets, setEventTickets] = useState("");
  const [eventCity, setEventCity] = useState('')
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOffline, setIsOffline] = useState(null);
  const [amount, setAmount] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [response, setResponse] = useState("");
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isMapVisible, setIsMapVisible] = useState(true)
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if(isFocused){
      getData();
    }

  }, [isFocused]);

  useEffect(() => {
    getCoordinates();
  }, [])

  const getCoordinates = async () => {

    try {
      var eventLoc = await AsyncStorage.getItem("eventLocation");
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(eventLoc)}&key=${apiKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const locationData = data.results[0].geometry.location;
        console.log('duy23y723ysasasasa8y328', locationData);
        setLatitude(locationData.lat);
        setLongitude(locationData.lng);
        setIsMapVisible(true)
      } else {
        console.error(`No results found for the provided location: ${eventLoc}`);

      }
    } catch (error) {
      console.error(`Error fetching geocode data for location: ${eventLoc}`, error);
    }
  };

  const getData = async () => {
    var img = await AsyncStorage.getItem("eventPic");
    if (img) {
      setEventPic(img);
    }
    var eventLoc = await AsyncStorage.getItem("eventLocation");
    if (eventLoc) {
      setEventLoc(eventLoc);
    }

    let city = await AsyncStorage.getItem("SelectedCity");
    if (city) {
      setEventCity(city);
    }

    var eventName = await AsyncStorage.getItem("eventName");
    if (eventName) {
      setEventName(eventName);
    }

    var eventDate = await AsyncStorage.getItem("eventDate");
    if (eventDate) {
      setEventDate(eventDate);
    }

    var eventDate1 = await AsyncStorage.getItem("eventEndDate");
    if (eventDate1) {
      setEventDate1(eventDate1);
    }

eventEndDate
    var eventStartDate = await AsyncStorage.getItem("eventStartTime");
    if (eventStartDate) {
      setEventStartDate(eventStartDate);
    }

    var eventEndTime = await AsyncStorage.getItem("eventEndTime");
    if (eventEndTime) {
      setEventEndDate(eventEndTime);
    }

    var eventIsPaid = await AsyncStorage.getItem("isPaid");
    console.log('bcjwegf892ey892y91', eventIsPaid);
    if (eventIsPaid) {
      // alert("yes")
      setIsPaid(eventIsPaid);
    }
    var eventDiscription = await AsyncStorage.getItem("eventDiscription");

    if (eventDiscription) {
      setEventDiscription(eventDiscription);
    }
    var eventType = await AsyncStorage.getItem("eventType");

    if (eventType) {
      setEventType(eventType);
    }

    var date = await AsyncStorage.getItem("date");

    if (date) {
      setNewStartDate(JSON.parse(date));
    }

    var endDate1 = await AsyncStorage.getItem("EndDate");
    if (date) {
      setNewEndDate(JSON.parse(endDate1));
    }

    var startDate = await AsyncStorage.getItem("startDate");

    if (startDate) {
      setStartDate(startDate);
    }
    var endDate = await AsyncStorage.getItem("endDate");

    if (endDate) {
      setEndDate(endDate);
    }
    var capacity = await AsyncStorage.getItem("quantity");

    if (capacity) {
      setCapacity(capacity);
    }
    var amount = await AsyncStorage.getItem("price");

    if (amount) {
      setAmount(amount);
    }
    var eventInstructions = await AsyncStorage.getItem("eventInstructions");
    let eventInst = JSON.parse(eventInstructions);
    if (eventInst) {
      setEventInstructions(eventInst);
    }
    var tickets = await AsyncStorage.getItem("tickets");
    let eventTickets = JSON.parse(tickets);
    console.log('sasasasssas', eventTickets);
    if (eventTickets) {
      setEventTickets(eventTickets);
    }
  };

  const removeEventData = async () => {

    await AsyncStorage.removeItem("eventPic");
    await AsyncStorage.removeItem("eventLocation");
    await AsyncStorage.removeItem("eventName");
    await AsyncStorage.removeItem('SelectedCity')
    await AsyncStorage.removeItem("eventDate");
    await AsyncStorage.removeItem("eventEndDate");
    await AsyncStorage.removeItem("eventStartTime");
    await AsyncStorage.removeItem("eventEndTime");
    await AsyncStorage.removeItem("isPaid");
    await AsyncStorage.removeItem("eventDiscription");
    await AsyncStorage.removeItem("eventType");
    await AsyncStorage.removeItem("date");
    await AsyncStorage.removeItem("startDate");
    await AsyncStorage.removeItem("endDate");
    await AsyncStorage.removeItem("quantity");
    await AsyncStorage.removeItem("price");
    await AsyncStorage.removeItem("eventInstructions");
    await AsyncStorage.removeItem("tickets");

  };


  const showOptions = () => {
    return [
      {
        id: 1,
        image: images.clockNew,
        data: `${eventDate} | ${eventStartDate} - ${eventEndDate} CST`,
      },
      {
        id: 2,
        image: images.loc,
        data: eventLoc,
      },
    ].map((item, index) => (
      <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginTop: 10, }}>
        <View style={styles.details} key={index}>
          <FastImage
            resizeMode="contain"
            style={styles.icon}
            source={item.image}
          ></FastImage>
          <Text style={styles.text}>{item.data}</Text>

        </View>
        <TouchableOpacity onPress={()=>{
          // if(item.id==1){
            navigation.navigate("PickLocation",{edit:true})
          // }else{
          //   navigation.navigate("PickLocation",{edit:true})
          // }
        }} style={[styles.editTextView, { marginTop: 10 }]}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  const onPublishPress = async () => {
    let newDate;
    let date = moment(eventDate).format("MMM D");
    if (newStartDate == newEndDate){
      newDate = {
        start_date: date,
        when: `${eventDate}, ${eventStartDate} - ${eventEndDate}`,
      };
    } else {
      newDate = {
        start_date: date,
        when: `${eventDate}, ${eventStartDate} - ${eventDate1}, ${eventEndDate}`,
      };
    }

    let data = {
        date: newDate,
        title: eventName,
        address: [eventLoc],
        description: eventDiscription,
        event_type: eventType,
        isOffline: isOffline,
        organizer: userInfo.name,
        city_name: eventCity,
        capacity: capacity,
        isPaid: isPaid,
        amount: amount,
        instructions: eventInstructions,
        eventTickets: isPaid ? eventTickets : [],
        startDate: newStartDate,
        endDate: newEndDate,
        year: moment(newStartDate).format('YYYY'),
        startTime: startDate,
        endTime: endDate,
        accountId:userInfo?.stripeAccountId,
      // },
      user_id: userInfo.id,
      event_category:null
    };
    console.log("newStartDatenewStartDate",data );
    console.log('eventDateeventDate', newDate);
    // return;
    setIsLoader(true);
    let response = await services.post(Url.ADD_EVENTS_NEW, "", data, "json");
    console.log("rtuyer839dassasdsadsa4y9238", response);
    if (response.status) {
      uploadEventImage(response.event.id);
    } else {
      setIsLoader(false);
      alert("Something went wrong.");
    }
  let res = response?.event?.events
  res.id = response?.event?.id
    setResponse(res);
  };
  const uploadEventImage = async (eventId) => {
    let data = new FormData();
    let imageFile = {
      name: new Date().getTime() + ".png",
      type: "image/png",
      uri: eventPic,
    };
    data.append("event_image", imageFile);
    let url = `${Url.ADD_EVENT_IMAGE}/${eventId}`;
    let response = await services.post(url, "", data, "formdata");
    console.log("event image upload response111111111", response);
    if (response.status) {
      setIsLoader(false);
      setModalVisible(!isModalVisible);
      removeEventData()
    }
  };

  return (
    <View style={{backgroundColor:"#fff"}}>
    <View style={styles.scrollView}>
      {isLoader && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          <ActivityIndicator size={"large"} color={colors.orange_light} />
        </View>
      )}
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

          <TouchableOpacity style={styles.save}>
            <Text style={styles.saveText}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LabelDescComponent
            desc={`Take a moment to review how your event will appear to attendees. Ensure all details are accurate and presented just as you want them.`}
            label={"Preview Your Event"}
          />
          <FastImage
            source={eventPic ? { uri: eventPic } : images.zumba}
            // resizeMode="stretch"
            style={styles.eventImage}
          >
            <TouchableOpacity onPress={()=>navigation.navigate("AddPhotos",{edit:true})} style={styles.edit}>
              <FastImage
                source={images.pencil}
                style={styles.editIcon}
                resizeMode="contain"
              ></FastImage>
            </TouchableOpacity>
          </FastImage>

          <View style={styles.eventView}>
            <Text style={styles.eventName}>
              {eventName ? eventName : "Zumba Workout"}
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("EnterName",{edit:true})} style={styles.editTextView}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>
          {showOptions()}

          <View style={styles.bottomSeparator}></View>

          <View style={styles.eventView}>
            <Text style={styles.eventText}>
              Event Details
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("EnterDescription",{edit:true})} style={styles.editTextView}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eventDescription}>
            <Text style={styles.eventDetailText}>{eventDiscription}</Text>
          </View>

          <Text style={[styles.eventText, { marginTop: '5%' }]}>
            Where you will be
          </Text>

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


          <TouchableOpacity onPress={() => onPressViewMap()} style={styles.locView}>
            <View style={styles.calBg}>
              <Image source={images.location3} style={[styles.calImg, { tintColor: "#000" }]}></Image>
            </View>
            <View style={styles.dayTextView}>
              <Text style={styles.dayText}>{eventLoc}</Text>

            </View>
          </TouchableOpacity>

          <View style={styles.bottomSeparator}></View>
        </ScrollView>
      </View>
      {/* <View style={{ marginVertical: 40 }}></View> */}
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => onPublishPress()}
          style={styles.publishBtn}
        >
          <Text style={styles.buttonText}>Publish your event</Text>
        </TouchableOpacity>
      </View>

      <Modal
        style={styles.modal}
        backdropOpacity={0.6}
        isVisible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <FastImage
            source={images.checkNew}
            style={styles.check}
            resizeMode="contain"
          ></FastImage>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("EventScreen", { item: { ...response, eventPic: eventPic } });
              // navigation.navigate("MyEvents");
            }}
            style={styles.close}
          >
            <FastImage
              source={images.close}
              style={styles.closeIcon1}
              resizeMode="contain"
            ></FastImage>
          </TouchableOpacity>

          <Text style={styles.status}>Event Successfully Created!</Text>
          <Text style={styles.detailsText}>
            Your fitness event is now live. Spread the word and engage with your
            attendees!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate("EventScreen", { item: { ...response, eventPic: eventPic } });
              // navigation.navigate("MyEvents");
            }}
            style={styles.inviteBtn}
          >
            <Text style={styles.btnText}>Invite People</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </View>
  );
};

export default StandardTicketAddAdvance;
