import { Dimensions, NativeModules, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  photo: {
    paddingHorizontal: 20
  },
  bottom: {
    height: '10%',
    borderTopWidth: 1,
    borderColor: colors.gray
  },
  button: {
    borderWidth: 1,
    borderColor: colors.orange_dark,
    backgroundColor: colors.background
  },
  account: {
    fontSize: 20,
    fontFamily: fonts.SfPro_Semibold,
    paddingLeft: 15,
    paddingTop: 20
  },
  headerView:{
    flexDirection:"row",
    marginTop:statusBarHeight+25,
    alignItems:"center",
    justifyContent:"space-between",
    marginHorizontal:"5%"
   },
   nextArrowIcon:{
    height:24,
    width:24,
    resizeMode:"contain",
    // alignSelf:"flex-end",
},
   skip: {
    fontFamily: fonts.SfPro_Medium,
    color: colors.orange_dark,
    textDecorationLine: 'underline',
    textDecorationColor: colors.orange_dark
   },
})