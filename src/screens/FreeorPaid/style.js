import { StyleSheet, NativeModules } from "react-native";
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
  saveText: { 
    fontFamily: fonts.SfPro_Medium,
    fontSize:14
   },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    width: "100%",
    height:55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 15,
    borderRadius: 11,
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.SfPro_Semibold,
    fontSize:14,
    color:colors.textBlack
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRadioBtn: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "white",
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
});
export default styles;
