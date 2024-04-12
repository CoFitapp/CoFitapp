import { Dimensions, StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  interests: {
    marginEnd: 10,
    fontFamily: fonts.SfPro_Regular,
    fontSize: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E0E8",
    paddingHorizontal: 10,
    paddingVertical:8,
    marginBottom: 20,
  },
  pastEventContainer: { width: "40%", marginEnd: 20 },
  pastEventImage: {
    height: Dimensions.get("window").width * 0.5,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    marginBottom: 10,
    color:colors.textBlack
  },
  name: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 12,
  },
  scrollView: {
    marginHorizontal: 12,
    flexGrow: 1,
  },
  userImage: {
    height: 320,
    width: Dimensions.get("window").width * 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    left: 0,
    margin: 10,
    top: Dimensions.get("window").width * 0.16,
  },
  closeIcon: { height: 35, width: 35 },
  nameContainer: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
    position: "absolute",
    alignItems: "center",
    bottom: 20,
    left: 10,
    borderRadius: 8,
    maxWidth: Dimensions.get("window").width * 0.8,
  },
  userName: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  addressContainer: { flexDirection: "row", alignItems: "center" },
  locationIcon: { width: 20, height: 20 },
  locationText: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    color: "white",
    marginLeft:5
  },
  userContactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  sendMsgBtn: {
    alignItems: "center",
    backgroundColor: "#E25F3C",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    width: "60%",
    height: 42,
  },
  sendMsgTxt: {
    color: "white",
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  msgIcon: { width: 47, height: 47 },
  separator: { height: 1, backgroundColor: "#E6E0E8" },
  aboutMe: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    color:colors.textBlack,
    marginVertical: 20,
  },
  desciption: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 12,
    lineHeight:20,
    color:colors.textRegular
  },
  readMore: {
    color: "#25C3F4",
    textDecorationLine: "underline",
    fontFamily: "SFProText-SemiBold",
    fontSize: 14,
    marginVertical: 10,
  },
  optionsContainer: {
    marginVertical: 10,
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  pastEvents: {
    paddingBottom: 80,
  },
});
export default styles;
