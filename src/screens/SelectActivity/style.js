import { StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
    marginHorizontal: 12,
    // flexGrow: 1,
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
  saveBtn: {
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
  heading: {
    fontFamily: fonts.SfPro_Bold,
    marginVertical: 14,
    fontSize: 16,
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
    // marginLeft: "5%",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: fonts.SfPro_Bold,
    fontSize:16
  },
});
export default styles;
