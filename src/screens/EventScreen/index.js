import {
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fonts from "../../constants/fonts";
import TicketComponent from "../../components/TicketComponent";
import FastImage from "react-native-fast-image";
import styles from "./style";
import options from "../../utils/options";
import tickets from "../../utils/tickets";
import instructions from "../../utils/instructions";
import users from "../../utils/users";
import details from "../../utils/details";
import { useEffect } from "react";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";
import moment, { duration } from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as services from "../../constants/services";
import * as Url from "../../constants/url";

const apiKey = "AIzaSyBpVX6Xl4OEftECYrN-wauMw7dpUyl6GiI";

const EventScreen = () => {
  const route = useRoute();
  const [event, setEvent] = useState(route?.params?.item);
  const [tickets,setTickets] = useState([])
  const [selectTab, setSelectTab] = useState("");
  const [originalData, setOriginalData] = useState(users);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortSelected, setSortSelected] = useState("Alphabetical");
  const [filteredData, setFilteredData] = useState(originalData);
  const [searchInput, setSearchInput] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [eventName, setEventName] = useState(event?.title);
  const [eventDiscription, setEventDiscription] = useState(event?.description);
  const [eventInstructions, setEventInstructions] = useState("");
  const [attendeesList, setAttendeesList] = useState([])
  const [attendeesList1, setAttendeesList1] = useState([])
  const [ticketsArr, setTicketsArr] = useState([])
  const navigation = useNavigation();


  useEffect(() => {
    console.log("dsdwedadaddssdasddassaasdqwafq2wesC", route.params.item);

    if(route?.params?.item?.eventTickets && route?.params?.item?.eventTickets?.length!=0){
      console.log('dsajhhkhkdadsasadassahkdadsdjhakjhkj');
      let arr = route?.params?.item?.eventTickets
      arr.map(item=>item.selected=false)
      setTickets(arr)
    }
    getCoordinates();
    getAddress();
    manageEvent()
  }, []);

  const getAddress = () => {
    let address = event?.address;
    var parts = address[0].split(", ");

    // Extract the first value
    var firstValue = parts[0];
    console.log("fdsafasf", firstValue);
    setFirstValue(firstValue);
    var restOfString = parts.slice(1).join(", ");
    setSecondValue(restOfString);
    console.log("rest", restOfString);
  };

  const manageEvent =async()=> {
    console.log('dsadsadsasdsaasdasdasds',route.params?.item?.id);
    let url = `${Url.MANAGE_EVENT}/${route.params?.item?.id}`
    let res = await services.get(url)
    if(res?.status) {
      res?.attendees.map(item=>{
        item.name = item?.firstName + ' ' + item?.lastName
      })
      setAttendeesList(res?.attendees || [])
      setAttendeesList1(res?.attendees || [])
      if(res?.eventTickets && res?.eventTickets?.length!=0) {
        setTicketsArr(res?.eventTickets || [])
      }
    }
    console.log('resssdfdsdeqdddddssss', JSON.stringify(res));
  }

  const getCoordinates = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          event.address[0]
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const locationData = data.results[0].geometry.location;
        console.log("duy23y723y8y328", locationData);
        setLatitude(locationData.lat);
        setLongitude(locationData.lng);
        setIsMapVisible(true);
      } else {
        console.error(
          `No results found for the provided location: ${event.location}`
        );
      }
    } catch (error) {
      console.error(
        `Error fetching geocode data for location: ${event.location}`,
        error
      );
    }
  };

  useEffect(() => {
    // Filter the data based on the search input
    if(attendeesList1?.length!=0){
      const filtered = attendeesList1.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setAttendeesList(filtered);
    }

  }, [searchInput, attendeesList1]);

  const tabView = () => {
    return ["Overview", "Attendees", "Manage"].map((item, index) => (
      <View key={index} style={styles.tabView}>
        <TouchableOpacity
          onPress={() => {
            setSelectTab(index);
          }}
          style={[
            styles.tab,
            {
              backgroundColor: selectTab == index ? "white" : "transparent",
              borderRadius: index == selectTab ? 7 : 0,
              shadowColor: selectTab == index ? "black" : null,
              shadowOffset:
                selectTab == index ? { width: -2, height: 4 } : null,
              shadowOpacity: selectTab == index ? 0.2 : 0,
              shadowRadius: selectTab == index ? 6 : 0,
            },
          ]}
        >
          <Text
            style={{
              fontFamily:
                index == selectTab ? fonts.SfPro_Medium : fonts.SfPro_Medium,
              fontSize: 13,
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  // const showOptions = () => {
  //   return options.map((item, index) => (
  //     <View style={styles.eventDetails} key={index}>
  //       <FastImage
  //         resizeMode="contain"
  //         style={styles.eventIcon}
  //         source={item.image}
  //       ></FastImage>
  //       <View style={styles.detailsView}>
  //         <Text style={styles.data}>{item.data}</Text>
  //         <View style={{ marginVertical: 5 }}></View>
  //         <Text style={styles.data1}>{item.data1}</Text>
  //       </View>
  //     </View>
  //   ));
  // };

  const onPressTicekts=async(item,index)=>{
    let arr = [...ticketsArr]
    arr[index].selected = !arr[index].selected
    setTicketsArr(arr)
  }

  const showTickets = () => {
    return ticketsArr.map((item, index) => (
      <View>
        <TouchableOpacity
        onPress={() => {
          onPressTicekts(item,index)
        }}
        style={styles.ticketView}>
          <Text style={styles.ticketType}>{item.planName}</Text>
          <View>
            <FastImage
              style={styles.rightArrow}
              resizeMode="contain"
              source={
                item.selected
                  ? images.arrNew
                  : images.arrNew1
              }
            ></FastImage>
          </View>
        </TouchableOpacity>
        {item.selected && (
          <TicketComponent price={item.price} sold={Number(item?.total_number) - Number(item?.number_available)} unsold={Number(item?.number_available)} />
        )}
      </View>
    ));
  };

  const showInstructions = () => {
    return event?.instructions.map((item, index) => (
      <View style={styles.instructionsView} key={index}>
        {item.option && (
          <>
            <FastImage
              resizeMode="contain"
              style={styles.instructionsIcon}
              source={
                item.image == "ball"
                  ? images.ball
                  : item.image == "clock"
                  ? images.clockB
                  : images.shield
              }
            ></FastImage>

            <Text style={styles.instructionsTitle}>{item.title}</Text>
          </>
        )}
      </View>
    ));
  };
  // const showUsers = (item, index) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate("UserDetails")}
  //       activeOpacity={0.5}
  //       style={styles.usersView}
  //       // key={index}
  //     >
  //       <FastImage
  //         resizeMode="contain"
  //         style={styles.userImage}
  //         source={{ uri: item.image }}
  //       ></FastImage>
  //       <Text style={styles.userName}>{item.title}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  const showDetails = () => {
    return [
      {
        id: 1,
        heading: "Activity",
        title: event?.title,
      },
      {
        id: 2,
        heading: "Location",
        title: firstValue,
      },
      {
        id: 3,
        heading: "Date",
        title: moment(Number(event?.startDate)).format("DD MMMM, YYYY"),
      },
      {
        heading: "Time",
        title: event?.date?.when,
      },
    ].map((item, index) => (
      <View>
        <View style={styles.showDetailsView}>
          <Text style={styles.manageHeading}>{item.heading}</Text>

          <FastImage
            style={styles.rightIcon}
            resizeMode="contain"
            source={images.arrNew1}
          ></FastImage>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.separator}></View>
      </View>
    ));
  };
  const sortData = ["Alphabetical", "Date Added", "Newest"];

  const sortOptions = () => {
    return sortData.map((item, index) => (
      <>
        <TouchableOpacity
          key={index}
          style={{ marginVertical: 10, paddingHorizontal: 10 }}
          onPress={() => {
            setSortSelected(item);
            setModalVisible(false);
          }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>

        {index !== sortData.length - 1 && (
          <View
            style={{
              backgroundColor: "black",
              height: 1,
              width: "100%",
            }}
          ></View>
        )}
      </>
    ));
  };
  const ticketsSection = () => {
    return (
      <>
        <Text style={[styles.eventHeading, { marginVertical: 20 }]}>
          Tickets
        </Text>
        {showTickets()}
        <View
          style={[
            styles.separator,
            {
              height: 1,
              marginVertical: 16,
            },
          ]}
        ></View>
      </>
    );
  };
  const showEventInstruction = () => {
    return (
      <>
        <Text style={[styles.eventHeading, { marginBottom: 10 }]}>
          Event instructions
        </Text>
        {showInstructions()}
      </>
    );
  };
  return (
    <View style={{backgroundColor:"#fff"}}>
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyEvents")}
          style={styles.back}
        >
          <FastImage
            source={images.backArrow}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{event.title}</Text>
        {selectTab == 2 && (
          <TouchableOpacity style={styles.delete}>
            <FastImage
              source={images.del}
              style={styles.deleteIcon}
              resizeMode="contain"
            ></FastImage>
          </TouchableOpacity>
        )}
      </View>

      <FastImage
        source={event?.image ? { uri: event?.image } : {uri:event?.eventPic}}
        style={styles.eventImage}
      >
        {selectTab == 2 && (
          <TouchableOpacity style={styles.edit}>
            <FastImage
              source={images.pencil}
              style={styles.editIcon}
              resizeMode="contain"
            ></FastImage>
          </TouchableOpacity>
        )}
      </FastImage>
      <View style={styles.tabContainer}>{tabView()}</View>

      <View style={styles.separator1}></View>
      {/* OverView Tab First Tab */}
      {selectTab == 0 && (
        <>
          <Text style={styles.eventHeading}>Event Details</Text>
          <View style={styles.eventDetails}>
            <View style={styles.iconView}>
            <FastImage
              resizeMode="contain"
              style={styles.eventIcon}
              source={images.time3}
            ></FastImage>
            </View>

            <View style={styles.detailsView}>
              <Text style={styles.data}>
                {moment(Number(event?.startDate)).format("DD MMMM, YYYY")}
              </Text>
              <View style={{ marginVertical: 5 }}></View>
              <Text style={styles.data1}>{event?.date?.when}</Text>
            </View>
          </View>
          <View style={styles.eventDetails1}>
          <View style={styles.iconView}>
            <FastImage
              resizeMode="contain"
              style={styles.eventIcon}
              source={images.location4}
            ></FastImage>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.data}>{firstValue}</Text>
              <View style={{ marginVertical: 2 }}></View>
              <Text style={styles.data1}>{secondValue}</Text>
            </View>
          </View>
          <View
            style={[
              styles.separator,
              {
                height: 1,
                marginVertical: 8,
              },
            ]}
          ></View>
          {tickets?.length>0 && ticketsSection()}
          <Text style={[styles.eventHeading, { marginBottom:20 }]}>
            Event Details
          </Text>
          <Text numberOfLines={5} style={styles.eventDetailsText}>
            {event.description}
          </Text>
          <Text style={styles.readMoreText}>Read more</Text>
          <View
            style={[
              styles.separator,
              {
                height: 1,
                marginVertical: 20,
              },
            ]}
          ></View>
          <Text style={[styles.eventHeading, { marginTop: 10 }]}>
            Where you will be
          </Text>
          {/* <FastImage
            source={images.maps}
            resizeMode="contain"
            style={styles.mapImage}
          ></FastImage> */}
          {isMapVisible && (
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
                  coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                  }}
                >
                  <Image
                    source={images.location3}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              </MapView>

              {/* <TouchableOpacity
                onPress={() => onPressViewMap()}
                style={styles.viewOnMapView}
              >
                <Image source={images.group} style={styles.viewMapIcon} />
                <Text style={styles.viewOnMapText}>VIEW ON MAPS</Text>
              </TouchableOpacity> */}
            </View>
          )}
          <TouchableOpacity onPress={()=>onPressViewMap()} style={styles.locView}>
              <View style={styles.calBg}>
                <Image source={images.location3} style={[styles.calImg,{tintColor:"#000"}]}></Image>
              </View>
              <View style={styles.dayTextView}>
                <Text style={styles.dayText}>{event?.address[0]}</Text>

              </View>
            </TouchableOpacity>

          {/* <View
            style={styles.locationContainer}
            // key={index}
          >
            <Image source={images.location3} style={[styles.calImg,{tintColor:"#000"}]}></Image>
            <Text style={{ marginHorizontal: 10 }}>{event?.address[0]}</Text>
          </View> */}
          <View
            style={[
              styles.separator,
              {
                height: 1,
                marginVertical: 20,
              },
            ]}
          ></View>

          {event?.instructions?.length > 0 && showEventInstruction()}
        </>
      )}

      {/* Attendees Tab Second Tab */}
      {selectTab == 1 && (
        <View>
          <View style={styles.inputContainer}>
            <FastImage
              source={images.magnifer}
              style={styles.leftIcon}
            ></FastImage>

            <TextInput
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
              placeholder={"Search attendees"}
              placeholderTextColor={"#49454F"}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.attendeesContainer}>
            <Text style={styles.attendeesCount}>{attendeesList && attendeesList.length > 0 ? `${attendeesList.length} Attendees` : undefined}</Text>
            <View style={[styles.sortByContainer]}>
              <Text style={styles.sortByText}>Sort by : {sortSelected}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <FastImage
                  source={images.arrNew}
                  style={styles.downArrow}
                  resizeMode="contain"
                ></FastImage>
              </TouchableOpacity>
              {isModalVisible && (
                <View
                  style={{
                    backgroundColor: "#D9D9DA",
                    width: 100,
                    position: "absolute",
                    alignItems: "center",
                    right: 0,
                    borderRadius: 12,
                    top: 30,
                    zIndex: 25,
                  }}
                >
                  {sortOptions()}
                </View>
              )}
            </View>
          </View>
          <View
            style={[styles.separator, { marginVertical: 10, zIndex: -1 }]}
          ></View>
          <FlatList
            data={attendeesList}
            style={{ zIndex: -25 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  // onPress={() => navigation.navigate("UserDetails")}
                  activeOpacity={0.5}
                  style={[
                    styles.usersView,
                    {
                      alignSelf: "flex-start",
                    },
                  ]}
                  key={index}
                >
                  <FastImage
                    resizeMode="contain"
                    style={styles.userImage}
                    source={{ uri: 'https://picsum.photos/200' }}
                  ></FastImage>
                  <Text style={styles.userName}>{item?.name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={() => Math.random()}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={[
                    styles.sortByText,
                    { alignSelf: "center", marginVertical: 40 },
                  ]}
                >
                  Oh no, no attendees yet
                </Text>
              );
            }}
          ></FlatList>
        </View>
      )}
      {/* Manage Tab Third Tab */}
      {selectTab == 2 && (
        <>
          {showDetails()}
          <Text style={[styles.attendeesCount, {  }]}>
            Event Name
          </Text>
          <TextInput
            maxLength={50}
            value={eventName}
            onChangeText={(text) => {
              let e = text.trimStart();
              setEventName(e);
            }}
            placeholder={"Event name"}
            placeholderTextColor={"#ABB4BB"}
            style={styles.eventName}
          ></TextInput>
          <Text
            style={{ alignSelf: "flex-end",fontFamily:fonts.SfPro_Regular,fontSize:12 }}
          >{`${eventName?.length}/50`}</Text>
          <View style={[styles.separator, { marginVertical: 20 }]}></View>
          <Text style={[styles.attendeesCount, {  }]}>
            Event Description
          </Text>

          <TextInput
            maxLength={500}
            value={eventDiscription}
            onChangeText={(text) => {
              let e = text.trimStart();
              setEventDiscription(e);
            }}
            multiline
            returnKeyType="done"
            blurOnSubmit={true}
            placeholder={"Event Description"}
            placeholderTextColor={"#ABB4BB"}
            style={[
              styles.eventName,
              {
                height: 160,
                paddingTop: 10,
              },
            ]}
          ></TextInput>
          <Text
            style={{ alignSelf: "flex-end" ,fontFamily:fonts.SfPro_Regular,fontSize:12}}
          >{`${eventDiscription?.length}/500`}</Text>
        </>
      )}
      <View style={{ marginVertical: 40 }}></View>
    </KeyboardAwareScrollView>
    </View>
  );
};

export default EventScreen;
