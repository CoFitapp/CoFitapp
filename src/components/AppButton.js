import React from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../constants/colors"
import FastImage from "react-native-fast-image"
import images from "../constants/images"


export const AppMainButton = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      color: "#fff",
      marginLeft: '5%',
      fontFamily: fonts.SfPro_Semibold
    },
    view: {
      backgroundColor: props.disable ? colors.buttonUnselect : colors.orange_dark,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      borderRadius: 5,
      height: 40,
      marginLeft:'5%',
      marginTop: 20
    }
  })
  return(
    <TouchableOpacity activeOpacity={0.5} disabled={props.disable} onPress={props.onPress} style={{ ...styles.view, ...props.styles }}>
     { props.isLoading
     ?
      <ActivityIndicator color={colors.background} size={'small'}/>
      :
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
     }
    </TouchableOpacity>
  )
}

export const AppSocialButton = (props) => {
    const styles = StyleSheet.create({
      text: {
        fontSize: 16,
        color: colors.socialButtonColor,
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Semibold
      },
      view: {
        borderColor: colors.border ,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '90%',
        borderRadius: 10,
        height: 55,
        marginLeft:'5%',
        marginTop: 20
      },
      image: {
        height: 22,
        width: 22,
        marginLeft: 20
      }
    })
    return(
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={{ ...styles.view, ...props.styles }}>
        <FastImage resizeMode="contain" source={props.image} style={{ ...styles.image}}/>
        <Text style={{ ...styles.text }}>{props.title}</Text>
      </TouchableOpacity>
    )
  }