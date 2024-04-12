import { Dimensions, StyleSheet, NativeModules } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    alignItems: "center",
    marginVertical: 0,
    width: (Dimensions.get("window").width * 1) / 3 - 20,
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  eventDetails: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  eventDetails1: {
    // marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  iconView:{
   height:40,
   width:40,
   justifyContent:"center",
   alignItems:"center",
   backgroundColor:"#dfe9eb",
   borderRadius:7
  },
  eventIcon: { height: 25, width: 25 },
  detailsView: {
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 4,
    maxWidth: "80%",
  },
  data: {
    fontFamily:fonts.SfPro_Semibold,
    fontSize: 14,
    color:colors.textBlack
  },
  data1: {
    fontFamily:fonts.SfPro_Regular,
    fontSize: 14,
    color:colors.textRegular
  },
  ticketView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  ticketType: { 
    fontSize: 14, 
    fontFamily: fonts.SfPro_Medium,
    color:colors.textBlack
   },
  rightArrow: { height: 20, width: 20 },
  instructionsView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  instructionsIcon: { height: 16, width: 16 },
  instructionsTitle: {
    fontFamily: fonts.SfPro_Regular,
    marginHorizontal: 10,
    fontSize: 12,
    color:colors.textRegular
  },
  usersView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  userImage: { height: 40, width: 40, borderRadius: 20 },
  userName: {
    fontFamily: fonts.SfPro_Medium,
    marginHorizontal: 25,
    color:colors.textBlack,
    fontSize: 14,
    marginVertical: 10,
  },
  showDetailsView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  manageHeading: {
    fontSize: 14,
    fontFamily: fonts.SfPro_Bold,
    color:colors.textBlack
  },
  rightIcon: { height: 24, width: 24 },
  title: { 
    fontSize: 14, 
    fontFamily: fonts.SfPro_Regular,
   color:colors.textRegular
  },
  separator: {
    height: 1,
    backgroundColor: "#E6E0E9",
    marginVertical: 20,
  },
  separator1: {
    height: 1,
    backgroundColor: "#E6E0E9",
    marginVertical: 20,
  },
  scrollView: {
    padding: 8,
    marginHorizontal: 12,
    flexGrow: 1,
    marginTop: statusBarHeight / 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  back: {
    height: 30,
    width: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    left: 0,
  },
  backIcon: {
    height: 16,
    width: 16,
  },
  headerTitle: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 20,
    color:"#020A23",
    alignSelf: "center",
  },
  delete: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  deleteIcon: { height: 20, width: 20 },
  eventImage: {
    alignSelf: "center",
    height: 240,
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 10,
    borderRadius:10,
    marginTop:30,
    marginBottom:20
  },
  edit: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 15,
  },
  editIcon: { height: 35, width: 35 },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EAEAEB",
    borderRadius: 8,
    paddingHorizontal: 2,
    alignItems: "center",
    height: 32,
  },
  eventHeading: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    color:colors.textBlack
  },
  eventDetailsText: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 12,
  },
  readMoreText: {
    color: "#25C3F4",
    textDecorationLine: "underline",
    fontFamily: fonts.SfPro_Semibold,
    fontSize: 12,
    marginVertical: 10,
  },
  mapImage: {
    alignSelf: "center",
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.9,
  },
  locView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    alignItems:"center"
  },
  calBg: {
    borderRadius: 6,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF3F9'
  },
  calImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  locationContainer: {
    // paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
    alignSelf: "flex-start",backgroundColor:"red"
  },
  locationIcon: { height: 40, width: 40 },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    height: 20,
    zIndex: 20,
    width: 20,
    position: "absolute",
    left: 10,
  },
  input: {
    paddingStart: 50,
    paddingEnd: 20,
    borderRadius: 12,
    width: "100%",
    color:colors.textRegular,
    backgroundColor: "#EAEAEB",
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    // paddingVertical: 10,
    height:37
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  attendeesCount: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 14,
    color:colors.textBlack
  },
  sortByContainer: { flexDirection: "row", alignItems: "center" },
  sortByText: {
    fontFamily: fonts.SfPro_Medium,
    fontSize: 12,
  },
  downArrow: { height: 20, width: 20,marginLeft:4 },
  eventName: {
    borderRadius: 12,
    borderWidth: 1,
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    borderColor: "#A0A5AB",
    color:colors.textRegular,
    paddingHorizontal: 16,
    // paddingVertical: 16,
    textAlignVertical: "top",
    marginVertical: 15,
    height:37
  },
  mapView: {
    width: "100%",
    paddingHorizontal: "3%",
    height: 260,
  },
  mapStyle: {
    width: "100%",
    paddingHorizontal: "3%",
    height: 240,
    marginTop: 15,
  },
  viewOnMapView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "blacks",
    height: 50,
    borderRadius: 5,
    marginHorizontal: "3%",
  },
  viewMapIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  viewOnMapText: {
    marginLeft: "2%",
    fontSize: 14,
    fontFamily:fonts.SfPro_Bold,
    color: "#fff",
  },
  dayText:{
    fontSize:12,
    fontFamily:fonts.SfPro_Regular,
    color:colors.textRegular
  },
  dayTextView:{
    marginLeft:10,
    width:"85%"
  }
});
export default styles;
