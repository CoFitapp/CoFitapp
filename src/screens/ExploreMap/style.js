import { Dimensions, StyleSheet,NativeModules } from "react-native";
const {height,width} = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const styles=StyleSheet.create({

    mainView:{
        flex:1,
        backgroundColor:"#fff"
    },
})

export default styles;