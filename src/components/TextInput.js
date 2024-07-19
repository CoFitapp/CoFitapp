import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import fonts from "../constants/fonts"
import colors from "../constants/colors"

export const TextInputComponent = (props) => {
 const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: fonts.SfPro_Medium,
    color:"#020A23"
  },
  view: {
    width:"90%",
    height:45,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#A1A5AC",
    borderRadius:11,
    marginLeft: '5%',
    marginTop: 10
  }
 })
    return(
      <View style={{ ...styles.view, ...props.styles}}>
        <TextInput
              placeholder={props.placeholder}
              maxLength={props.maxLength ? 14 : undefined}
              placeholderTextColor={colors.placeholderColor}
              value={props.value}
              onChangeText={props.onChangeText}
              // autoCapitalize= 'none'
              // autoComplete= 'email'
              style={{ ...styles.textInput }}
              keyboardType={props.keyboardType ? props.keyboardType : 'default'}
              secureTextEntry={props.secureTextEntry ? true : false}
            />
      </View>
    )
}