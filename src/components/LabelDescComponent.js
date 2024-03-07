import React from "react";
import { View, Text, TextInput } from "react-native";
import FastImage from "react-native-fast-image";
import images from "../constants/images";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

export default function LabelDescComponent({
  label,
  desc,
  isSearch,
  isSession,
  isDescribe,
  value,
  onChangeText,
  placeholder,
}) {
  return (
    <View
      style={{
        marginTop: 15,
        //   backgroundColor: "red",
        paddingTop: 10,
        padding: 2,
        // borderBottomWidth: 0.6,
        // borderBottomColor: "gray",
        // paddingBottom: 28,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.SfPro_Bold,
          fontSize: 20,
          color:colors.textBlack,
          marginTop: 5,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fonts.SfPro_Regular,
          letterSpacing: 0.2,
          lineHeight: 22,
          fontSize: 14,
          marginTop: 12,
          color:colors.textRegular
        }}
      >
        {desc}
      </Text>

      {isSearch && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <FastImage
            source={images.magnifer}
            style={{
              height: 20,
              zIndex: 25,
              width: 20,
              position: "absolute",
              left: 10,
            }}
          ></FastImage>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={"#49454f"}
            style={{
              paddingStart: 45,
              paddingEnd: 20,
              borderRadius: 10,
              width: "100%",
              backgroundColor: colors.textInputBackGroundColor,
              fontFamily: fonts.SfPro_Regular,
              fontSize: 14,
              paddingVertical: 12,
              marginVertical: 20,
            }}
          ></TextInput>
        </View>
      )}

      {isSession && (
        <View
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            height: 35,
            marginTop: 15,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              flex: 0.9,
              height: 35,
              paddingLeft: 10,
            }}
            placeholder="E.g. My Zumba Session"
          />
        </View>
      )}
      {isDescribe && (
        <View
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            height: 180,
            marginTop: 15,
          }}
        >
          <TextInput
            style={{
              flex: 1,
            }}
            placeholder="Enter your event Description"
          />
        </View>
      )}
    </View>
  );
}
