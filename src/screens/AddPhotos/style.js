import { StyleSheet, NativeModules, Dimensions } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
    marginHorizontal: 12,
    marginTop: statusBarHeight / 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  back: {
    height: 22,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    height: 18,
    width: 18,
  },
  save: {
    width: 105,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  saveTxt: { 
    fontFamily: fonts.SfPro_Medium,
    fontSize:14
   },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height:55,
    // paddingVertical: 16,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#a1a5ac",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  add: { height: 14, width: 14 },
  text: {
    fontFamily: fonts.SfPro_Regular,
    color:colors.textRegular,
    fontSize: 14,
    marginStart: 16,
  },
  camera: { height: 22, width: 22 },
  nextBtn: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 40,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: fonts.SfPro_Bold,
    fontSize:16
  },
  eventImage: {
    alignSelf: "center",
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 10,
  },
});
export default styles;
