import { NativeModules,PixelRatio,FlatList, StyleSheet, Text, View, useWindowDimensions,Image, Touchable, TouchableOpacity, TextInput, ImageBackground, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import images from '../../constants/images'
import colors from '../../constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;
const Map = ({navigation}) => {
  const {height,width} = useWindowDimensions();
  const [events, setEvents] = useState([
    {
      'image': images.event1,
      'distance': "8+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event2,
      'distance': "12+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event1,
      'distance': "8+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
    {
      'image': images.event2,
      'distance': "12+",
      'time': "Tue, Sep 12 | 7:00pm",
      'name': "Fitness Challenge - Get Trophy by Courier",
      'location': "4550 Mueller bivid park, NJ"
    },
  ])
  return (
    <View>
      <Text>djkfhjksd</Text>
    </View>
  )
}
export default Map