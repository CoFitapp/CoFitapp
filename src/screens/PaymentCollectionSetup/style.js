import { StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  tickIcon: { height: 20, width: 20 },
  descriptionText: {
    marginHorizontal: 10,
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
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    height: 22,
    width: 22,
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
  saveTxt: { fontFamily: fonts.interRegular, fontWeight: "600" },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 100,
    width: 100,
    marginVertical: 10,
  },
  connectText: {
    color: "#25C3F4",
    textDecorationLine: "underline",
    fontFamily: "SFProText-SemiBold",
    fontSize: 14,
    marginVertical: 10,
  },
  separator: { height: 1, backgroundColor: "#E6E0E8", marginTop: 16 },
  bottomSeparator: {
    height: 1,
    backgroundColor: "#E6E0E8",
    marginVertical: 16,
  },
  nextButton: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 50,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: fonts.SfPro_Bold,
  },
});
export default styles;
