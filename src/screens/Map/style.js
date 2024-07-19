import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";
import fonts from "../../constants/fonts";
const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainView: {
    flex: 1,
  },
  autoCompleteView: {
    height: '100%',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: "center",
    marginHorizontal: "10%",
    backgroundColor: 'transparent',
    justifyContent: "center",
    position: "absolute",
    top: Platform.OS == "ios" ? statusBarHeight + 20 : 25
  },
  view: {
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  locIconView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  locIcon: {
    height: 45,
    width: 45,
    resizeMode: 'contain'
  },
  autoComplete: {
    textInputContainer: {
      borderRadius: 10,
      flexDirection: 'row',
      width: '100%',
      justifyContent: "center",
      height: 45,
      alignItems: "center",
      marginHorizontal: 12,
      marginTop: 10,
      backgroundColor: '#fff',
      color: "#000",
      paddingHorizontal: 25,
      shadowColor: '#8d8f91', elevation: 3, shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1
    },
    textInput: {
      alignSelf: 'center',
      color: 'black',
    top:2,
      backgroundColor:'#fff',
      fontSize: 16, marginLeft: 5,
      fontFamily: fonts.SfPro_Medium,
      width: '80%',
    },
    listView:{
      fontFamily: fonts.SfPro_Medium
    },
    container: {
      height: 10,
      backgroundColor: 'transparent',fontFamily:fonts.SfPro_Heavy
    },
    description:{
      color:"#000",
      fontFamily:fonts.SfPro_Medium
    }

  },
  locIcon: {
    width: 15,
    height: 25,
    marginHorizontal: '3%',
    resizeMode: 'contain'
  },

  flatList: {
    width: '20%',
    borderRadius: 5,
    borderTopWidth: 3,
    borderColor: '#AAAAAA',
    alignSelf: 'center',
    marginTop: '2%'
  },
  BgImg: {
    marginRight: 10,
    width: width * 0.5,
    height: 135,
    alignItems: "flex-start"
  },
  kmBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25C3F4",
    height: 30,
    borderRadius: 8, paddingHorizontal: 5,
    // width:85,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 25,
    marginRight: 8
  },
  carIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  kmText: {
    fontFamily: fonts.SfPro_Medium,
    color: "#fff",
    marginLeft: 5
  },


  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  location1: {
    width: 25,
    height: 25,
    marginLeft: '3%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  location2: {
    width: 20,
    height: 20,
    marginLeft: '3%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  user: {
    width: 40,
    height: 40,
    margin: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius:10
  },
})
export default styles;