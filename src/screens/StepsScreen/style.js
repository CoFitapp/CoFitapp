import { StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
    marginHorizontal: 12,
    flexGrow: 1,
    marginTop: statusBarHeight / 2,
  },
  cancel: {
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  cancelIcon: {
    height: 22,
    width: 22,
  },
  heading: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 20,
    marginTop: 30,
    color:colors.textBlack
  },
  button: {
    backgroundColor: colors.orange_dark,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    height: 40,
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.SfPro_Bold,
    fontSize:16
  },
});
export default styles;
