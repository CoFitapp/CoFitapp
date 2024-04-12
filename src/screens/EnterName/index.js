import { Text, View, ScrollView, TextInput } from "react-native";
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
import fonts from "../../constants/fonts";

const EnterName = () => {
  const [eventName, setEventName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(()=>{
    getEventInfo()
  },[])

  const getEventInfo=async()=>{
  let name =   await AsyncStorage.getItem("eventName")
    if(name!=null && route?.params?.edit==true){
      setEventName(name)
      console.log('dsdhkhasa',name);
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
          {/* back icon */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            {/* cancel button */}

            <FastImage
              source={images.backArrow}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity 
          disabled={route?.params?.edit ? false : true} 
          onPress={()=>{
            AsyncStorage.setItem("eventName", eventName);
            navigation.navigate('StandardTicketAddAdvance')
          }}
          style={styles.saveBtn}>
            <Text style={styles.saveTxt}>Save & exit</Text>
          </TouchableOpacity>
        </View>

        {/* timeline viewer */}
        <View style={styles.timeLine}>
          {/* outer view */}
          <TimeLineComponent perc={50} />
          <TimeLineComponent perc={0} />
          <TimeLineComponent perc={0} />
        </View>

        {/* title & description */}

        <LabelDescComponent
          desc={
            "What's the name of your workout adventure? Choose a name that's catchy, inspiring, and reflects the spirit of your event."
          }
          label={"Name Your Fitness Event"}
          placeholder={"Search for activity"}
        />

        {/* activities section */}
        <TextInput
          maxLength={50}
          value={eventName}
          onChangeText={(text) => {
            let e = text.trimStart();
            setEventName(e);
          }}
          placeholder={"E.g. My Zumba Session"}
          placeholderTextColor={"#ABB4BB"}
          style={styles.textInput}
        ></TextInput>
        <Text
          style={{ alignSelf: "flex-end",fontFamily:fonts.SfPro_Regular,fontSize:12 }}
        >{`${eventName.length}/50`}</Text>
        <View style={styles.bottomView}>
          <FastImage source={images.bulb} style={styles.icon}></FastImage>
          <Text style={styles.tipsText}>See tips & examples</Text>
        </View>
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          disabled={eventName.length == 0}
          onPress={() => {
            AsyncStorage.setItem("eventName", eventName);
            navigation.navigate("EnterDescription",{edit:route?.params?.edit});
          }}
          style={[
            styles.button,
            { backgroundColor: eventName.length > 0 ? "#E25F3C" : "#C9C9C9" },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default EnterName;
