import React from "react";
import { View, Text } from "react-native";
import fonts from "../constants/fonts";
import colors from "../constants/colors";

export default function TicketComponent({ price, sold, unsold }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 20,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#E6E0E9",
          paddingVertical: 10,width:"30%"
          // paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily:fonts.SfPro_Medium,
            fontSize: 14,
            alignSelf: "center",
            color:colors.textBlack
          }}
        >
          Price
        </Text>
        <Text
          style={{
            fontFamily: fonts.SfPro_Semibold,
            color: colors.textBlack,
            marginTop: 10,
            fontSize: 16,
            alignSelf: "center",
          }}
        >
          ${price}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#E6E0E9",
          paddingVertical: 10,width:"30%"
          // paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily:fonts.SfPro_Medium,
            fontSize: 14,
            alignSelf: "center",
            color:colors.textBlack
          }}
        >
          Sold
        </Text>
        <Text
          style={{
            fontFamily: fonts.SfPro_Semibold,
            color: "#468847",
            fontSize: 16,
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          {sold}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#E6E0E9",
          paddingVertical: 10,width:"30%",
          // paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily:fonts.SfPro_Medium,
            fontSize: 14,
            alignSelf: "center",
            color:colors.textBlack
          }}
        >
          Unsold
        </Text>
        <Text
          style={{
            fontFamily: fonts.SfPro_Semibold,
            color: "#D43328",
            marginTop: 10,
            alignSelf: "center",
            fontSize: 16,
          }}
        >
          {unsold}
        </Text>
      </View>
    </View>
  );
}
