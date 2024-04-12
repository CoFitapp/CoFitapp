import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

export default function EventComponent({ item }) {
  return (
    <>
    <View
      style={{
        // borderBottomWidth: 0.4,
        // borderBottomColor: "gray",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginTop: 10,
        paddingVertical: 30,
      }}
    >
      {/* left */}
      <View
        style={{
          flex: 0.7,
          height: 100,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 0.1,
          }}
        >
          <Text style={{   marginBottom: 4,fontFamily:fonts.SfPro_Bold,fontSize:16,color:colors.textBlack }}>
            {item.id}
          </Text>
        </View>
        <View style={{ flex: 0.9 }}>
          <Text
            style={{
              
              
              marginBottom: 10,
              fontFamily:fonts.SfPro_Bold,fontSize:16,color:colors.textBlack
            }}
          >
            {item.title}
          </Text>
          <Text style={{fontFamily:fonts.SfPro_Regular,fontSize:14,color:colors.textRegular}}>{item.text}</Text>
        </View>
      </View>
      {/* right */}
      <View
        style={{
          flex: 0.3,
        }}
      >
        <FastImage
          source={item.img}
          style={{
            height: 100,
            width: 95,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
    <View style={{height:0.4,backgroundColor:"gray",marginVertical:10}}/>
    </>
  );
}
