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

const EnterDescription = () => {
  const [eventDiscription, setEventDiscription] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(()=>{
    getEventInfo()
  },[])

  const getEventInfo=async()=>{
  let description =   await AsyncStorage.getItem("eventDiscription")
    if(description!=null && route?.params?.edit==true){
      setEventDiscription(description)
      console.log('dsdhkhasa',description);
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
            AsyncStorage.setItem("eventDiscription", eventDiscription);
            navigation.navigate('StandardTicketAddAdvance')
          }}
          style={styles.saveBtn}>
            <Text style={styles.saveTxt}>Save & exit</Text>
          </TouchableOpacity>
        </View>

        {/* timeline viewer */}
        <View style={styles.timeLine}>
          {/* outer view */}
          <TimeLineComponent perc={90} />
          <TimeLineComponent perc={0} />
          <TimeLineComponent perc={0} />
        </View>

        {/* title & description */}

        <LabelDescComponent
          desc={
            "Share the details - what can attendees expect? Highlight the activities, benefits, and any unique features of your event."
          }
          label={"Describe Your Event"}
          placeholder={"Search for activity"}
        />

        {/* activities section */}
        <TextInput
          returnKeyType="done"
          blurOnSubmit={true}
          maxLength={200}
          value={eventDiscription}
          onChangeText={(text) => {
            let e = text.trimStart();
            setEventDiscription(e);
          }}
          multiline
          placeholder={"Enter your event description"}
          placeholderTextColor={"#ABB4BB"}
          style={styles.textInput}
        ></TextInput>
        <Text
          style={{ alignSelf: "flex-end",fontFamily:fonts.SfPro_Regular,fontSize:12 }}
        >{`${eventDiscription.length}/200`}</Text>
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
          disabled={eventDiscription.length == 0}
          onPress={() => {
            AsyncStorage.setItem("eventDiscription", eventDiscription);
            navigation.navigate("AddPhotos",{edit:route?.params?.edit});
          }}
          style={[
            styles.button,
            {
              backgroundColor:
                eventDiscription.length > 0 ? "#E25F3C" : "#C9C9C9",
            },
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default EnterDescription;
