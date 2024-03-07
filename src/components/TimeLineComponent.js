import React from "react";
import { View, Text } from "react-native";

export default function TimeLineComponent({ perc }) {
  return (
    <View
      style={{
        height: 7,
        width: 110,
        backgroundColor: "lightgray",
        marginHorizontal: 4,
      }}
    >
      {/* inner view */}
      <View
        style={{
          height: 7,
          width: perc,
          backgroundColor: "#00C6F1",
        }}
      />
    </View>
  );
}
