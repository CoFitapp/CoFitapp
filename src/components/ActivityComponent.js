import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../constants/images";

export default function ActivityComponent({ item }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 55,
        marginVertical: 16,
      }}
    >
      <FastImage
        source={images.running}
        style={{ height: 55, width: 55, borderRadius: 6, marginRight: 15 }}
      />
      <Text
        style={{
          fontFamily: "SFProText-Semibold",
          fontSize: 16,
        }}
      >
        {item.label}
      </Text>
    </View>
  );
}
