import { StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    alignSelf: "center",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#A0A5AB",
    paddingHorizontal: 16,
    paddingVertical:10
  },
  location: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily: "SFProText-Regular",
  },
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
  backIcon: {
    height: 18,
    width: 18,
  },
  saveIcon: {
    width: 105,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
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
  saveText: { 
    fontFamily: fonts.SfPro_Medium,
    fontSize:14
  },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  typeText: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    marginStart: 12,
    color:colors.textBlack
  },
  button: {
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
  modal: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "white",
    flexGrow: 1,
    borderRadius: 8,
    marginTop: statusBarHeight / 1.5,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 20,
  },
  close: { position: "absolute", left: 0, margin: 24 },
  separator: {
    height: 1,
    backgroundColor: "#E6E0E8",
    marginVertical: 16,
  },
  leftIcon: {
    height: 20,
    zIndex: 25,
    width: 20,
    alignSelf: "center",
  },
  rightIcon: {
    height: 25,
    alignSelf: "center",
    zIndex: 25,
  },
  delete: {
    height: 25,
    zIndex: 25,
    width: 25,
  },
  textInput: {
    // paddingStart: 40,
    // paddingEnd: 40,
    // borderRadius: 12,
    // width: "100%",
    // backgroundColor: "#F2F2F2",
    // fontFamily: "SFProText-Regular",
    // fontSize: 14,
    // paddingVertical: 16,
    // marginVertical: 20,
  },
  locationIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  currentLocationText: {
    fontFamily: "SFProText-Bold",
    fontSize: 16,
    marginStart: 16,
    color: "#25c3f4",
  },
  top: {
    fontFamily: "SFProText-Bold",
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 20,
  },
});
export default styles;
