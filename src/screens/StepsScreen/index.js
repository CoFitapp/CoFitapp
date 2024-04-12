import { Text, View, FlatList, ScrollView, useWindowDimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import EventComponent from "../../components/EventComponent";
import images from "../../constants/images";
import FastImage from "react-native-fast-image";

const StepsScreen = () => {
  const navigation = useNavigation();
  const height = useWindowDimensions().height
  const data = [
    {
      id: "1",
      img: images.leisure,
      text: "Choose a fitness activity that defines your event. Give your event a name that inspires and motivates.",
      title: "Let’s get started!",
    },
    {
      id: "2",
      img: images.relax,
      text: `Set the date, time, and location for your fitness event. Make it easy for attendees to join and enjoy.`,
      title: "Detail Your Event's When & Where.",
    },
    {
      id: "3",
      img: images.speed,
      text: `Manage ticketing, provide essential instructions, and preview your event. Ready to inspire the CoFit community? Publish now!`,
      title: "Finish up and publish!",
    },
  ];
  return (
    <View style={{backgroundColor:"#fff",height:height}}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cancel}
      >
        {/* cancel button */}

        <FastImage
          source={images.cancel}
          style={styles.cancelIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.heading}>
        It’s easy to create your own event on CoFit
      </Text>

      {/* event components inside flatlist */}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        // ItemSeparatorComponent={()=> <View style={{height:0.4,backgroundColor:"gray",marginVertical:10}}/>}
        renderItem={({ item }) => <EventComponent item={item} />}
      />
      <View style={{ marginVertical: 20 }}></View>
      {/* get started button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectActivity")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};
export default StepsScreen;
