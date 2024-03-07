import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const EventInstructions = () => {
  const [option, setOption] = useState(false);
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [instructions, setInstructions] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(()=>{
    getEventInfo()
  },[])

  const getEventInfo=async()=>{
  let ticketsArr1 =   await AsyncStorage.getItem("eventInstructions")
  console.log('fsfddffsaasdadfssd32addfdfdsf',route?.params?.edit);
    if(ticketsArr1!=null ){
      if(route?.params?.edit==true){
        let parsedArr = JSON.parse(ticketsArr1)
        setOption(parsedArr[0].option)
        setOption1(parsedArr[1].option)
        setOption2(parsedArr[2].option)
        setInstructions(parsedArr[3])
      console.log('parsedAdse1q322srrsasaa',parsedArr[3]);
      }
      
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
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
          disabled={route?.params?.edit ? false : true} 
          onPress={()=>{
            let a = [
              {
                title: "Bring Your Own Equipment",
                option: option,
                image: "ball",
              },
              {
                title: "Arrive, Warm-Up Early",
                option: option1,
                image: "clock",
              },
              {
                title: "Prioritize Safety Always",
                option: option2,
                image: "shield",
              },
              instructions,
            ];
            console.log("adsff", a);
            AsyncStorage.setItem("eventInstructions", JSON.stringify(a));
            navigation.navigate('StandardTicketAddAdvance')
          }}
          style={styles.save}>
            <Text style={styles.saveText}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={85} />
        </View>
        <LabelDescComponent
          desc={`Add your personalized guidelines or select from CoFit's quick instructions. Ensure your attendees know exactly what to expect for a smooth event experience.`}
          label={"Define Event Instructions"}
        />
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.quickText}>Quick instructions</Text>
          <View style={styles.instructionsView}>
            <Text style={styles.title}>{"Bring Your Own Equipment"}</Text>
            <TouchableOpacity
              onPress={() => setOption(!option)}
              style={styles.checkBox}
            >
              {option && (
                <FastImage
                  resizeMode="contain"
                  style={styles.tickIcon}
                  source={images.tick}
                ></FastImage>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.instructionsView}>
            <Text style={styles.title}>{"Arrive, Warm-Up Early"}</Text>
            <TouchableOpacity
              onPress={() => setOption1(!option1)}
              style={styles.checkBox}
            >
              {option1 && (
                <FastImage
                  resizeMode="contain"
                  style={styles.tickIcon}
                  source={images.tick}
                ></FastImage>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.instructionsView}>
            <Text style={styles.title}>{"Prioritize Safety Always"}</Text>
            <TouchableOpacity
              onPress={() => setOption2(!option2)}
              style={styles.checkBox}
            >
              {option2 && (
                <FastImage
                  resizeMode="contain"
                  style={styles.tickIcon}
                  source={images.tick}
                ></FastImage>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.separator}></View>
          <Text style={styles.quickText}>Add instructions</Text>
          <TextInput
            value={instructions}
            onChangeText={(text) => {
              setInstructions(text);
            }}
            returnKeyType="done"
            blurOnSubmit={true}
            multiline
            placeholder={
              "Enter your instructions here. Cover essential aspects like arrival times, equipment needed, or specific preparation steps. Be clear and concise!"
            }
            placeholderTextColor={"#ADB3BC"}
            style={styles.textInput}
          ></TextInput>
          <View style={styles.bottomSeparator}></View>
          <View style={{ marginVertical: 20 }}></View>
        </KeyboardAwareScrollView>
      </View>
      <View
        style={{
          height: "10%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            let a = [
              {
                title: "Bring Your Own Equipment",
                option: option,
                image: "ball",
              },
              {
                title: "Arrive, Warm-Up Early",
                option: option1,
                image: "clock",
              },
              {
                title: "Prioritize Safety Always",
                option: option2,
                image: "shield",
              },
              instructions,
            ];

            console.log("adsff", a);
            AsyncStorage.setItem("eventInstructions", JSON.stringify(a));
            navigation.navigate("StandardTicketAddAdvance");
          }}
          disabled={
            (!option && !option1 && !option2) || instructions.length == 0
          }
          style={[
            styles.nextBtn,
            {
              backgroundColor:
                (option || option1 || option2) && instructions
                  ? "#E25F3C"
                  : "#C9C9C9",
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

export default EventInstructions;
