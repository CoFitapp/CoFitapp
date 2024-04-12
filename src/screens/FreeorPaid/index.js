import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const FreeOrPaid = () => {
  const [option, setOption] = useState("");
  const [isPaid,setIsPaid] = useState(null)
  const navigation = useNavigation();
  const route = useRoute();

  const onsubmit=()=>{
    if(option=="Free"){
      navigation.navigate("EventInstructions",{edit:route?.params?.edit})
    }else{
      navigation.navigate("AddTicket",{edit:route?.params?.edit})
    } 
  }

  useEffect(()=>{
    getEventInfo()
  },[])

  const getEventInfo=async()=>{
  let isPaid =   await AsyncStorage.getItem("isPaid")
  console.log('fsdfdfdsf',isPaid);
    if(isPaid!=null && route?.params?.edit==true){
      let isPaid1 = JSON.parse(isPaid)
      if(isPaid1){
        setOption("Price")
      }else{
        setOption("Free")
      }
      console.log('dsdhkhasa',isPaid1);
    }
    
  }

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
              style={styles.backArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
          disabled={route?.params?.edit ? false : true} 
          onPress={()=>{
            navigation.navigate('StandardTicketAddAdvance')
          }}
          style={styles.save}>
            <Text style={styles.saveText}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={30} />
        </View>
        <LabelDescComponent
          desc={`Will your CoFit event be a complimentary session or a paid experience? Select 'Free' for open access or set a price to monetize your fitness expertise.`}
          label={"Choose Your Event's Access"}
          isSearch={false}
          isSession={false}
          // isDescribe={true}
        />
        <TouchableOpacity
          onPress={() => {
            setOption("Free");
            AsyncStorage.setItem("isPaid", "false");
          }}
          activeOpacity={0.8}
          style={[
            styles.option,
            { borderColor: option == "Free" ? "#0A141F" : "#a1a5ac" },
          ]}
        >
          <Text style={styles.title}>Free</Text>

          <View
            style={[
              styles.radio,
              {
                backgroundColor: option == "Free" ? "black" : "white",
                borderWidth: option == "Free" ? 1 : 0.5,
                borderColor: option == "Free" ? "black" : "black",
              },
            ]}
          >
            <View style={styles.innerRadioBtn}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption("Price");

            AsyncStorage.setItem("isPaid", "true");
          }}
          activeOpacity={0.8}
          style={[
            styles.option,
            { borderColor: option == "Price" ? "#0A141F" : "#a1a5ac" },
          ]}
        >
          <Text style={styles.title}>Set a price</Text>

          <View
            style={[
              styles.radio,
              {
                backgroundColor: option == "Price" ? "black" : "white",
                borderWidth: option == "Price" ? 1 : 0.5,
                borderColor: option == "Price" ? "#000" : "black",
              },
            ]}
          >
            <View style={styles.innerRadioBtn}></View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          disabled={option.length == 0}
          onPress={() => {onsubmit()}}
          style={[
            styles.button,
            { backgroundColor: option.length > 1 ? "#E25F3C" : "#C9C9C9" },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>

  );
};

export default FreeOrPaid;
