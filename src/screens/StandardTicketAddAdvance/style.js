import { Dimensions, StyleSheet, NativeModules } from "react-native";
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
  details: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  icon: { height: 40, width: 40 },
  text: {
    marginHorizontal: 10,
    maxWidth: "70%",
    fontFamily:fonts.SfPro_Regular,
    fontSize:12
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
    fontSize:16
  },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  eventImage: {
    alignSelf: "center",
    height: 250,
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 20,
    borderRadius:11
  },
  eventName: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 22,
    marginVertical: 10,
    width:"90%",
    color:colors.textBlack
  },
  eventView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    // backgroundColor:"red"
  },
  editTextView:{
  //  marginTop:10
  }, 
  editText:{
   fontFamily:fonts.SfPro_Medium,
   color:colors.orange_dark,
   textDecorationLine:"underline",
   textDecorationColor:colors.orange_dark,
   fontSize:14
  },
  separator: { height: 0.5, backgroundColor: "#aaadab", marginTop: 12 },
  bottomSeparator: {
    height: 0.5,
    backgroundColor: "#aaadab",
    marginVertical: 12,
  },
  publishBtn: {
    alignItems: "center",
    backgroundColor: "#E25F3C",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 40,
  },
  buttonText: {
    color: "white",
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
  },
  modal: {
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  check: { height: 100, width: 100 ,marginTop:5},
  close: { position: "absolute", left: 0, margin: 20 },
  closeIcon: { height: 18, width: 18 },
  closeIcon1: { height: 14, width: 14 },
  status: {
    fontFamily: fonts.SfPro_Bold,
    fontSize: 22,
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  detailsText: {
    fontFamily: fonts.SfPro_Regular,
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color:colors.textRegular
  },
  inviteBtn: {
    alignItems: "center",
    backgroundColor: "#E25F3C",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 40,
  },
  btnText: {
    color: "white",
    fontFamily: fonts.SfPro_Bold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  eventText: {
    // marginTop: '5%',
    marginHorizontal: '3%',
    fontFamily:fonts.SfPro_Bold,
    fontSize: 16,
    color: colors.textBlack
},
dayText:{
fontFamily:fonts.SfPro_Regular,
fontSize:12,
color:colors.textRegular,
marginLeft:10,
// width:'70%'
},
mapView: {
  width: "100%",
  paddingHorizontal: "3%",
  height: 230,
},
mapStyle: {
  width: "100%",
  paddingHorizontal: "3%",
  height: 210,
  marginTop: 15
},
mapImg: {
  height: '100%',
  width: '100%',
  resizeMode: 'contain'
},
locView: {
  flexDirection: 'row',
  width: '100%',
  marginTop: 10,
  paddingHorizontal: '3%',
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
eventDescription: {
  width: '100%',
  marginTop: '4%',
  paddingHorizontal: '3%',
  paddingVertical: '1%',
},
eventDetailText: {
  fontSize: 12,
  lineHeight: 18,
  fontFamily: fonts.SfPro_Regular,
  color: "#69707A"
},
edit: {
  alignItems: "center",
  justifyContent: "center",
  alignSelf:"flex-end",
  marginRight:15,
  marginTop:15
},
editIcon: { height: 40, width: 40 },  
});
export default styles;
