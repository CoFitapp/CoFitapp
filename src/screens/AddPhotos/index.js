import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import TimeLineComponent from "../../components/TimeLineComponent";
import LabelDescComponent from "../../components/LabelDescComponent";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const AddPhotos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [photo, setPhoto] = useState(null);
  
  useEffect(()=>{
    getEventInfo()
    // checkPermission();
  },[])

  // async function checkPermission(){
  //   check(PERMISSIONS.IOS.CAMERA)
  //   .then((result)=>{
  //    console.log('resultttttt',result);
  //   })
  //   .catch((err)=>{
  //     console.log('errorrrrrr',err);
  //   })
  // }

  const getEventInfo=async()=>{
  let eventPic =   await AsyncStorage.getItem("eventPic")
    if(eventPic!=null && route?.params?.edit==true){
      setPhoto(eventPic)
      console.log('dsddasashkhasa',eventPic);
    }
    
  }


  const chooseFromGallery = async () => {
    setTimeout(async () => {
      const res = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      // let imageFile = {
      //   name: new Date().getTime() + ".png",
      //   type: res.mime,
      //   uri: res.path,
      // };
      setPhoto(res.path);
      AsyncStorage.setItem("eventPic", res.path);
    }, 750);

    console.log(res);
  };
  const takePhoto = async () => {
    setTimeout(async () => {
      const res = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      // let imageFile = {
      //   name: new Date().getTime() + ".png",
      //   type: res.mime,
      //   uri: res.path,
      // };
      setPhoto(res.path);
      AsyncStorage.setItem("eventPic", res.path);
    }, 750);

    console.log(res);
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
            <Text style={styles.saveTxt}>Save & exit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeLine}>
          <TimeLineComponent perc={110} />
          <TimeLineComponent perc={0} />
          <TimeLineComponent perc={0} />
        </View>
        <LabelDescComponent
          desc={`Upload images that capture the energy and excitement of your fitness event. No photos yet? No problem! Use our stock fitness images to get started.`}
          label={"Add Photos & Videos to Showcase Your Event"}
        />
        <ScrollView
          scrollEnabled={!photo ? false : true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {photo && (
            <FastImage
              source={{ uri: photo }}
              resizeMode="contain"
              style={styles.eventImage}
            ></FastImage>
          )}
          <TouchableOpacity
            onPress={() => {
              chooseFromGallery();
            }}
            activeOpacity={0.8}
            style={styles.button}
          >
            <FastImage source={images.add} style={styles.add}></FastImage>
            <Text style={styles.text}>Add photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              takePhoto();
            }}
            activeOpacity={0.8}
            style={[styles.button, { marginVertical: 0 }]}
          >
            <FastImage
              source={images.camera1}
              style={styles.camera}
            ></FastImage>
            <Text style={styles.text}>Take new photos</Text>
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
          disabled={!photo}
          onPress={() => navigation.navigate("PickLocation",{edit:route?.params?.edit})}
          style={[
            styles.nextBtn,
            {
              backgroundColor: photo ? "#E25F3C" : "#C9C9C9",
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

export default AddPhotos;
