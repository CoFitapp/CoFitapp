import { Text, View, ScrollView } from "react-native";
import React from "react";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";

const UserDetails = () => {
  const navigation = useNavigation();

  const showOptions = () => {
    return [
      "Zumba",
      "HIIT",
      "Marathons",
      "Crossfit",
    ].map((item, index) => (
      <Text key={index} style={styles.interests}>
        {item}
      </Text>
    ));
  };
  const showPastEvents = () => {
    return [
      {
        id: 1,
        image: images.zumba,
        title: "Zumba Workout",
        name: "Austin Parks & Recreation Department, Texas",
      },
      {
        id: 2,
        image: images.zumba,
        title: "Zumba Workout",
        name: "Austin Parks & Recreation Department, Texas",
      },
    ].map((item, index) => (
      <View key={index} style={styles.pastEventContainer}>
        <FastImage
          style={styles.pastEventImage}
          resizeMode="contain"
          source={item.image}
        ></FastImage>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
      </View>
    ));
  };
  return (
    <View style={{backgroundColor:"#fff"}}>
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
      <FastImage
        source={images.userGirl}
        resizeMode="cover"
        style={styles.userImage}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.close}
        >
          <FastImage
            source={images.closeButton}
            style={styles.closeIcon}
            resizeMode="contain"
          ></FastImage>
        </TouchableOpacity>

        <View style={styles.nameContainer}>
          <Text style={styles.userName}>Dana Elvis</Text>
          <View style={styles.addressContainer}>
            <FastImage
              resizeMode="contain"
              style={styles.locationIcon}
              source={images.location1}
            ></FastImage>
            <Text style={styles.locationText}>Austin, Texas</Text>
          </View>
        </View>
      </FastImage>
      <View style={styles.userContactContainer}>
        <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          style={styles.sendMsgBtn}
        >
          <Text style={styles.sendMsgTxt}>Send a message</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <FastImage
            resizeMode="contain"
            style={styles.msgIcon}
            source={images.msg}
          ></FastImage>
        </TouchableOpacity>
        <TouchableOpacity>
          <FastImage
            resizeMode="contain"
            style={styles.msgIcon}
            source={images.call}
          ></FastImage>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <Text style={styles.aboutMe}>About me</Text>
      <Text numberOfLines={5} style={styles.desciption}>
        Hi, I'm Dana Elvis from the vibrant city of Austin, Texas! My fitness
        journey began five years ago, driven by a desire to embrace a healthier,
        more active lifestyle. Since then, I've discovered a passion for a range
        of activities, from yoga and hiking to high-intensity interval training
        (HIIT) and strength traini
      </Text>
      <Text style={styles.readMore}>Read more</Text>
      <View
        style={[
          styles.separator,
          {
            marginVertical: 20,
          },
        ]}
      ></View>
      <Text style={[styles.aboutMe, { marginVertical: 10 }]}>Interests</Text>
      <View style={styles.optionsContainer}>{showOptions()}</View>
      <Text style={[styles.aboutMe, { marginVertical: 10 }]}>Past events</Text>

      <ScrollView
        contentContainerStyle={styles.pastEvents}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {showPastEvents()}
      </ScrollView>
    </KeyboardAwareScrollView>
    </View>
  );
};

export default UserDetails;
