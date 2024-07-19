import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React, { useState } from 'react'
import styles from "./style"
import Header from '../../components/Header'
import images from '../../constants/images'
import colors from '../../constants/colors'
import FastImage from 'react-native-fast-image'
const PaymentMethod = ({navigation}) => {

    return (
    <View style={styles.mainView}>
        <Header title="Payments & Payouts"/>
       <TouchableOpacity onPress={()=>navigation.navigate("PaymentMethod1")} style={[styles.cardView,{marginTop:20}]}>
        <View style={styles.subView1}>
          <Image source={images.creditCard} style={styles.cardView1}/>
          <Text style={styles.text}>Payment Methods</Text>
        </View>
        <View style={styles.subView2}>
        <Image source={images.backArrow} style={styles.nextIcon}/>
        </View>
       </TouchableOpacity>
       <View style={styles.seperator}/>

       <TouchableOpacity onPress={()=>navigation.navigate("PayoutMethod")} style={styles.cardView}>
        <View style={styles.subView1}>
          <FastImage source={images.bank} style={styles.cardView1}/>
          <Text style={styles.text}>Payout Methods</Text>
        </View>
        <View style={styles.subView2}>
        <FastImage source={images.backArrow} style={styles.nextIcon}/>
        </View>
       </TouchableOpacity>
       <View style={styles.seperator}/>
    </View>
  )
}

export default PaymentMethod;