import { StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
    marginHorizontal: 12,
    flexGrow: 1,
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
  ticketContainer: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#E6E0E8",
    borderRadius: 8,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  typeTextContainer: { flexDirection: "row", justifyContent: "space-between" },
  typeText: {
    fontFamily: "SFProText-Semibold",
    fontWeight: "800",
    fontSize: 14,
  },
  quantity: {
    fontFamily: "SFProText-Regular",
    fontSize: 14,
    color: "#49454f",
    marginVertical: 10,
  },
  saleType: {
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "green",
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "flex-start",
  },
  saleTypeText: {
    fontFamily: "SFProText-Medium",
    fontSize: 14,
    color: "green",
    paddingHorizontal: 10,
  },
  options: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editText: { textDecorationLine: "underline", marginHorizontal: 10 },
  deleteText: { textDecorationLine: "underline", marginStart: 10 },
  addTicket: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a1a5ac",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  addTicketText: {
    fontFamily: "SFProText-Bold",
    fontSize: 14,
    marginStart: 16,
  },
  nextBtn: {
    backgroundColor: "#c9c9c9",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: fonts.SfPro_Bold,
  },
});
export default styles;
