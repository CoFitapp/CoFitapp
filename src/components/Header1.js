import { NativeModules, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import fonts from '../constants/fonts';
import images from '../constants/images';
import { TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import { TextRegular } from './AppText';

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const Header1 = (props) => {
  const navigation = useNavigation();
  return (
    <View>
    <View style={styles.mainView}>
      <TouchableOpacity activeOpacity={1} onPress={()=>navigation.goBack()} style={{width:"15%",paddingLeft:20}}>
        <FastImage source={images.backArrow} style={{height:15,width:15,resizeMode:"contain"}}/>
      </TouchableOpacity>
      <View style={{width:"70%",}}>
      {/* <Text style={{textAlign:'center',fontFamily:fonts.SfPro_Semibold,fontSize:20,color:colors.black}}>{title}</Text> */}
      </View>
      <TouchableOpacity activeOpacity={1} onPress={props.onPress} style={{width:"15%"}}>
      <TextRegular text="Skip" styles={{color: colors.orange_dark}}/>
      </TouchableOpacity>

    </View>
    <View style={{width:"100%",height:1,backgroundColor:colors.gray,marginVertical:20}}/>
    </View>
  )
}

export default Header1;

const styles = StyleSheet.create({
    mainView:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        paddingTop: Platform.OS == "ios" ? statusBarHeight+10 : 25,
        // backgroundColor:"green"
    }
})