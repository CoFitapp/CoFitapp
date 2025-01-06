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
    textInputView:{
    flexDirection:"row",
    marginHorizontal:'5%',
    justifyContent:"space-between",
    marginTop:10
    },
    locationText:{
      fontFamily:fonts.SfPro_Semibold,
      fontSize:16,
      color: colors.black
    },
    orView: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: '5%',
      marginTop: 20,
      marginBottom: 10
    },
    line: {
      width: '42%',
      borderTopWidth: 1,
      borderColor: colors.gray
    },
    deleteAccountView:{
        flexDirection:"row",
        // marginHorizontal:'5%',
        justifyContent:"space-between",
        marginTop:10
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
      status: {
        fontFamily: "SFProText-Bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "800",
        textAlign: "center",
      },
      detailsText: {
        fontFamily: "SFProText-Regular",
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
        lineHeight:20
      },
    nextArrowIcon:{
        height:24,
        width:24,
        resizeMode:"contain",
        // alignSelf:"flex-end",
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

    btnText: {
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
    skip: {
      fontFamily: fonts.SfPro_Medium,
      color: colors.orange_dark,
      textDecorationLine: 'underline',
      textDecorationColor: colors.orange_dark
    },
    logo: {
      height: 40,
      width: 140,
      alignSelf: 'center',
      marginTop: 25
    },
    account: {
      fontSize: 20,
      fontFamily: fonts.SfPro_Semibold,
      paddingLeft: 15,
      paddingTop: 20
    },
    haveAccount: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 30
    },
    login: {
      fontSize: 14,
      fontFamily: fonts.SfPro_Medium,
      color: colors.orange_dark
    },
    password: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: '5%',
        justifyContent: 'space-between',
        marginTop: 15
      },
    forgot: {
      color: colors.blackMedium,
      fontFamily: fonts.SfPro_Medium,
      fontSize: 14,
      textDecorationLine: 'underline'
    },
    forgotView: {
      alignSelf: 'flex-end',
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 10
    },
    socialView: {
      flexDirection: 'row',
      flex: 1,
      // paddingHorizontal: '30%',
      justifyContent: 'center',
      paddingTop: 10,
      // backgroundColor:'red'
      alignItems:'center'
    },
    socialView1: {
      height: 50,
      width: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.blackMedium,
      justifyContent: 'center',
      alignItems: 'center'
    }

})

export default styles;