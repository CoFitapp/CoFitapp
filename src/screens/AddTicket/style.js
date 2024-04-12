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
  addTicketBtn: {
    width: "100%",
    height:55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a1a5ac",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  addIcon: { height: 14, width: 14 },
  addTxt: {
    fontFamily: fonts.SfPro_Semibold,
    fontSize: 14,
    marginStart: 16,
    color:colors.textBlack
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
  modal: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  modalContainer: {
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
    color:colors.textBlack
  },
  close: { position: "absolute", left: 0, margin: 24 },
  closeIcon: { 
    height: 14, 
    width: 14 
  },
  separator: {
    height: 1,
    backgroundColor: "#E6E0E8",
    marginTop: 16,
    marginBottom:5
  },
  ticketName: {
    fontFamily: "SFProText-Bold",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 20,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    fontFamily: "SFProText-Medium",
    fontSize: 14,
    borderColor: "#A0A5AB",
    color:"#0D131F",
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlignVertical: "top",
    marginVertical: 20,
  },
  text: {
    fontFamily: "SFProText-Bold",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 10,
  },
  modalNextBtn: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    height: 40,
    width: "100%",
  },
  ticketContainer: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#E6E0E8",
    borderRadius: 8,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    // flexGrow: 1,
  },
  typeTextContainer: { flexDirection: "row", justifyContent: "space-between" },
  typeText: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    color:colors.textBlack
  },
  quantity: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    color: colors.textRegular,
    marginVertical: 10,
  },
  saleType: {
    paddingVertical: 5,
    borderRadius: 6,
    borderColor: colors.green,
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "flex-start",
  },
  saleTypeText: {
    fontFamily: fonts.SfPro_Medium,
    fontSize: 14,
    color: colors.green,
    paddingHorizontal: 10,
  },
  options: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editText: { 
    textDecorationLine: "underline",
     marginHorizontal: 10,
     fontFamily:fonts.SfPro_Medium
     },
  deleteText: { 
    textDecorationLine: "underline", 
    marginStart: 10 ,
    fontFamily:fonts.SfPro_Medium
  },
});
export default styles;
