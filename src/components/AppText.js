import React from "react"
import { StyleSheet, Text } from "react-native"
import fonts from "../constants/fonts"
import colors from "../constants/colors"

export const TextRegular =(props) => {
   console.log('propsssssss', props.password)
    const styles = StyleSheet.create({
      text: {
        fontFamily: fonts.SfPro_Regular,
        fontSize: 14,
        color: colors.textRegular
      }
    })
    return(
        <Text style={{...styles.text, ...props.styles}}>{props.text}</Text>
    )
}