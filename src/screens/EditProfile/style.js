import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerView:{
     flexDirection:"row",
     marginTop:statusBarHeight+25,
     alignItems:"center",
     justifyContent:"space-between",
     marginHorizontal:"5%"
    },
    backIconView:{
       height:40,
       width:40,
       borderRadius:20,
       justifyContent:"center",
    //    alignItems:"center",
    // backgroundColor:"red"
    },
    profileView:{
        // marginTop:statusBarHeight+25,
        height:120,
        // left:10,
        width:120,
        alignItems:'center',
        borderColor:"#F1F5FC",
        borderWidth:2,
        borderRadius:120/2,
        justifyContent:'center',
        alignSelf:"center"
    },
    profileImage:{
        height:'100%',
        width:'100%',
        borderRadius:60
    },
    locationView:{
      flexDirection:"row",
      marginHorizontal:"5%",
      alignItems:"center",
      marginTop:15
    //   justifyContent:"space-evenly"
    },
    locationView1:{
      width:"50%",
    //   backgroundColor:"red"
    },
    locationName:{
      fontSize:16,
      fontFamily:fonts.SfPro_Medium,
      marginRight:5,
      color:"#020A23"
    },
    locationView2:{
        width:"50%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
    },
    locationIcon:{
     height:20,
     width:20,
     resizeMode:"contain",
     marginRight:5
    },
    locationText:{
      fontFamily:fonts.SfPro_Semibold,
      fontSize:16,
      color:"#000"
    },
    name:{
    textAlign:"center",
    marginTop:8,
    color:"#333333",
    fontFamily:fonts.SfPro_Regular,
    marginBottom:25
    },
    textInputView:{
    flexDirection:"row",
    marginHorizontal:'5%',
    justifyContent:"space-between",
    marginTop:10
    },
    deleteAccountView:{
        flexDirection:"row",
        // marginHorizontal:'5%',
        justifyContent:"space-between",
        marginTop:10
    },
    inputInnerView:{
      width:"47%",
      height:45,
      backgroundColor:"#fff",
      borderWidth:1.5,
      borderColor:"#A1A5AC",
      borderRadius:11
    },
    seperator: {
      height: 1,
      width: '100%',
      marginVertical: 15,
      backgroundColor: '#E6E0E9'
    },
    phoneInputView1:{
        flexDirection:"row",
        width:"34%",
        height:45,
        backgroundColor:"#fff",
        borderWidth:1.5,
        borderColor:"#A1A5AC",
        borderRadius:11,
        justifyContent:"center",
        alignItems:"center"
    },
    phoneInputView2:{
        width:"60%",
        height:45,
        backgroundColor:"#fff",
        borderWidth:1.5,
        borderColor:"#A1A5AC",
        borderRadius:11
    },
    emailInputView:{
        width:"100%",
        height:45,
        backgroundColor:"#fff",
        borderWidth:1,
        borderColor:"#A1A5AC",
        borderRadius:11
      },


      modal: {
        justifyContent: "center",
      },
      modalContainer: {
        backgroundColor: "white",
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
      },
      check: { height: 100, width: 100 },
      close: { position: "absolute", left: 0, margin: 20 },
      closeIcon: { height: 18, width: 18 },
      status: {
        fontFamily: "SFProText-Bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "800",
        textAlign: "center",
        color: colors.black
      },
      detailsText: {
        fontFamily: "SFProText-Regular",
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
        lineHeight:20,
        color: colors.black
      },
      inviteBtn: {
        alignItems: "center",
        backgroundColor: "#E25F3C",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        height: 50,
      },


    nextArrowIcon:{
        height:24,
        width:24,
        resizeMode:"contain",
        // alignSelf:"flex-end",
    },
    nextArrowIcon1:{
        height:24,
        width:24,
        resizeMode:"contain",
        // alignSelf:"flex-end",
    },
    profileIcon:{
        height:24,
        width:24,
        resizeMode:"contain"
    },
    profileMainView:{
        width:"75%",
        flexDirection:"row",
        alignItems:"center"
    },
    profileText:{
        fontSize:16,
        fontFamily:fonts.SfPro_Medium,
        marginLeft:15
    },
    lineSeperator:{
      width:"100%",
      height:1,
      backgroundColor:"#dbd9d9",
      marginVertical:15
    },

    bottomBtn: {
        borderColor: colors.orange_dark,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 5,
        height: 40,
        marginLeft:'5%'
    },
    bottomBtn1: {
        backgroundColor: colors.orange_dark,
        // borderWidth:1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 5,
        height: 40,
        marginLeft:'5%'
    },
    CancelBtn: {
        backgroundColor: colors.orange_dark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        borderRadius: 8,
        height: 40,
        // marginLeft:'5%'
    },
    DeleteBtn:{
        borderColor: colors.orange_dark,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        borderRadius: 8,
        height: 40,
    },
    btnText2: {
        fontSize: 16,
        color: colors.orange_dark,
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Semibold
    },
    btnText1: {
        fontSize: 16,
        color: "#fff",
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Semibold
    },
    View: {
        backgroundColor: "#fff",
        height: height * 0.05
    },
    handle: {
      height: 5,
      width: 45,
      backgroundColor: '#3C3C43',
      borderRadius: 2,
      alignSelf: 'center',
      marginTop: 10
    },
    pickCity: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: fonts.SfPro_Semibold,
      marginTop: 20
    },
    bottomBtn: {
      backgroundColor: colors.orange_dark,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      borderRadius: 5,
      height: 40,
      marginLeft:'5%'
  },
  btnText: {
      fontSize: 16,
      color: "#fff",
      marginLeft: '5%',
      fontFamily:fonts.SfPro_Semibold
  },
  returnText: {
      fontSize: 14,
      fontFamily: fonts.SfPro_Medium,
      color: colors.textRegular,
      marginLeft: '5%'
  },
  homeLocation: {
    fontSize: 16,
    fontFamily: fonts.SfPro_Semibold,
    color: colors.black,
    marginLeft: '5%',
    marginTop: 5
  },
  returnText1: {
    fontSize: 14,
    fontFamily: fonts.SfPro_Medium,
    color: colors.textRegular,
    marginLeft: '5%',
    paddingVertical: 15
},
button: {
  borderWidth: 1,
  borderColor: colors.orange_dark,
  backgroundColor: colors.background
},
searchView3: {
  flexDirection: "row",
  marginHorizontal: width * .03,
  justifyContent: "space-between",
  alignItems: "center",
  // marginTop: 5
},
searchView1: {
  width: width * .94,
  flexDirection: "row",
  borderRadius: 10,
  height: 37,
  backgroundColor: "#F2F2F2",
  alignItems: "center"
},
searchIcon: {
  height: 20,
  width: 20,
  resizeMode: "contain",
  marginLeft: 10
},
searchTextInput: {
  flex: 1,
  paddingLeft: 10,
  fontFamily: fonts.SfPro_Regular,
  fontSize:14,
  color: "#49454F"
},
seperator1: {
  height: 1,
  width: '100%',
  backgroundColor: '#E6E0E9'
},

})

export default styles;