import {
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
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
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const AddTicket = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [ticket, setTicket] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [totalTickets, setTotalTickets] = useState(null);
  const [ticketArr, setTicketArr] = useState([]);
  const [data, setData] = useState(ticketArr);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(()=>{
    getEventInfo()
  },[])

  const getEventInfo=async()=>{
  let ticketsArr1 =   await AsyncStorage.getItem("tickets")
  console.log('fsfddffsdfdsaassdfdfdsf',ticketsArr1);
    if(ticketsArr1!=null){
      if(route?.params?.edit==true){
        setTicketArr(JSON.parse(ticketsArr1))
        console.log('dsdhkhasa',ticketsArr1);
      }

    }

  }


  const addTickets = (name, number, price, description) => {
    let data = {
      // id: Math.random(),
      planName: name,
      number: number,
      total_number: number,
      price: price,
      description: description,
    };
    ticketArr.push(data);
  };
  const removeTicket = (index) => {
    ticketArr.splice(index, 1);
    setTicketArr([...ticketArr]);
  };
  const editTicket = (index) => {
    console.log("indd", index);

    setDescription(index.description);
    setPrice(index.price);
    setInstructions(index.name);
    setTicket(index.number);
    setModalVisible(true);

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
            AsyncStorage.setItem("tickets", JSON.stringify(ticketArr));
             navigation.navigate('StandardTicketAddAdvance',{edit:route?.params?.edit})
          }}
          style={styles.saveBtn}>
            <Text style={styles.saveTxt}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={45} />
        </View>
        <LabelDescComponent
          desc={`Tailor your tickets to fit your event. Name each ticket type, decide the quantity available, and set the right price. Create options that cater to all your attendees.`}
          label={"Customize Your Ticket Details"}
        />
        {/* <View> */}
        <ScrollView
          scrollEnabled={ticketArr.length == 0 ? false : true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {ticketArr?.map((item, index) => {
            return (
              <View style={styles.ticketContainer}>
                <View style={styles.typeTextContainer}>
                  <Text style={styles.typeText}>
                    {item.planName ? item.planName : "Standard Ticket"}
                  </Text>
                  <Text
                    style={styles.typeText}
                  >{`$ ${item.price} /ticket`}</Text>
                </View>
                <Text
                  style={styles.quantity}
                >{`Quantity : ${item.number}`}</Text>
                <View style={styles.saleType}>
                  <Text style={styles.saleTypeText}>{`On Sale`}</Text>
                </View>
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => {
                      editTicket(item);
                    }}
                    style={{ alignItems: "center", flexDirection: "row" ,marginRight:12}}
                  >
                    <FastImage
                      source={images.docEdit}
                      style={{ height: 20, width: 20 }}
                    ></FastImage>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: "center", flexDirection: "row" }}
                    onPress={() => {
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete this ticket",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => console.log("cancel pressed"),
                          },
                          { text: "Ok", onPress: () => removeTicket(index) },
                        ]
                      );
                    }}
                  >
                    <FastImage
                      resizeMode="contain"
                      source={images.del}
                      style={{ height: 18, width: 18 }}
                    ></FastImage>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setDescription("");
              setPrice("");
              setInstructions("");
              setTicket("");
              setModalVisible(true);
            }}
            activeOpacity={0.8}
            style={styles.addTicketBtn}
          >
            <FastImage source={images.add} style={styles.addIcon}></FastImage>
            <Text style={styles.addTxt}>Add ticket</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem("tickets", JSON.stringify(ticketArr));
            navigation.navigate("EventInstructions",{edit:route?.params?.edit});
          }}
          disabled={ticketArr.length == 0}
          style={[
            styles.nextBtn,
            {
              backgroundColor: ticketArr.length > 0 ? "#E25F3C" : "#C9C9C9",
            },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Modal
        style={styles.modal}
        backdropOpacity={0.2}
        isVisible={isModalVisible}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.heading}>Add ticket</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.close}
          >
            <FastImage
              source={images.close}
              style={styles.closeIcon}
              resizeMode="contain"
            ></FastImage>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <Text style={styles.ticketName}>Ticket name</Text>
          <TextInput
            value={instructions}
            onChangeText={(text) => {
              setInstructions(text);
            }}
            placeholder={"Ticket name"}
            placeholderTextColor={"#999999"}
            style={styles.textInput}
          ></TextInput>
          <Text style={styles.text}>Number of tickets</Text>
          <TextInput
            keyboardType="numeric"
            value={ticket}
            onChangeText={(text) => {
              setTicket(text);
            }}
            placeholder={"Number of tickets"}
            placeholderTextColor={"#999999"}
            style={styles.textInput}
          ></TextInput>
          <Text style={styles.text}>Ticket price ($)</Text>
          <TextInput
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
            }}
            placeholder={"Price of ticket"}
            placeholderTextColor={"#999999"}
            style={styles.textInput}
          ></TextInput>
          <Text style={styles.text}>Ticket description</Text>
          <TextInput
            value={description}
            multiline
            returnKeyType="done"
            blurOnSubmit={true}
            onChangeText={(text) => {
              setDescription(text);
            }}
            placeholder={
              "This will be visible to people at the time of ticket selection. Talk about what is included, excluded, benefit, deliverable, etc"
            }
            placeholderTextColor={"#999999"}
            style={[
              styles.textInput,
              {
                height: 160,
                paddingTop: 16,
              },
            ]}
          ></TextInput>
          <View style={{ marginVertical: 40 }}></View>
          <TouchableOpacity
            disabled={price.length == 0 || description.length == 0}
            onPress={() => {
              addTickets(instructions, ticket, price, description);
              AsyncStorage.setItem("quantity", ticket);
              AsyncStorage.setItem("price", price);
              setModalVisible(false);
              setInstructions("");
              setTicket("");
              setPrice("");
              setDescription("");
              // setShowTicket(true);
            }}
            style={[
              styles.modalNextBtn,
              {
                backgroundColor:
                  price.length > 0 && description.length > 0
                    ? "#E25F3C"
                    : "#C9C9C9",
              },
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
    </View>
  );
};

export default AddTicket;
