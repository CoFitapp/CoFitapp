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
  quickText: {
    fontFamily: fonts.SfPro_Bold,
    color:colors.textBlack,
    fontSize: 16,
    marginVertical: 20,
  },
  instructionsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    color:colors.textRegular
  },
  checkBox: {
    borderColor: "#c2c2c2",
    borderWidth: 1,
    borderRadius: 4,
    padding: 2,
    height: 24,
    width: 24,
    alignItems: "center",
  },
  tickIcon: { height: 20, width: 20 },
  separator: { height: 1, backgroundColor: "#E6E0E8", marginTop: 16 },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    fontFamily: fonts.SfPro_Regular,
    lineHeight:22,
    fontSize: 14,
    borderColor: "#A0A5AB",
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 160,
    textAlignVertical: "top",
  },
  bottomSeparator: {
    height: 1,
    backgroundColor: "#E6E0E8",
    marginVertical: 16,
  },
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
});
export default styles;
