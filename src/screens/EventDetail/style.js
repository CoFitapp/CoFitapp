import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";
import fonts from '../../constants/fonts';
import colors from "../../constants/colors";
const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS == "ios" ? statusBarHeight : 0
    },

    keyboard: {
        height: height * 1
    },
    view1: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: '10%'
    },
    bgImgView: {
        height: 380,
        width: '100%',
    },
    bgImg: {
        height: "100%",
        width: '100%',
    },
    view2: {
        flexDirection: 'row',
        width: '100%',
        marginTop: Platform.OS == "ios" ? 10 : '5%'
    },
    view0: {
        width: '85%',
    },
    kmView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#25C3F4",
        height: 30,
        borderRadius: 8,
        paddingHorizontal: 5,
        // width: 100,
        justifyContent: "center",
        alignSelf: "flex-end",
        marginRight: 20
    },
    carIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    kmText: {
        fontFamily: fonts.SfPro_Medium,
        color: "#fff",
        marginLeft: 5
    },
    DayView: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '3%'
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
    dayTextView: {
        width: "87%",
        paddingHorizontal: '5%',
        alignSelf: "center"
    },
    dayText: {
        fontSize: 12,
        fontFamily:fonts.SfPro_Regular,
        color: colors.textBlack
    },
    timeText: {
        fontSize: 12,
        fontFamily: "SFProText-Regular",
        color: "#4F555F"
    },
    locView: {
        flexDirection: 'row',
        width: '100%',
        // marginTop: '3%',
        paddingHorizontal: '3%'
    },
    eventText: {
        marginHorizontal: '3%',
        fontFamily:fonts.SfPro_Semibold,
        fontSize: 16,
        color: colors.textBlack
    },
    eventDescription: {
        width: '100%',
        marginTop: '2%',
        paddingHorizontal: '3%',
        paddingVertical: '1%',
    },
    eventDetailText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: fonts.SfPro_Regular,
        color: "#666666"
    },
    shareWithFrndsView: {
        width: '94%',
        height: 1,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: '5%'
    },
    shareWithFrndsText: {
        marginHorizontal: '3%',
        fontFamily: 'SFProText-Semibold',
        fontSize: 18,
        color: "#363C49"
    },
    enjoyText: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: "SFProText-Regular",
        color: "#4F555F"
    },
    view4: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgrey',
        alignSelf: 'center',
        marginVertical: '5%'
    },
    aboutView: {
        flexDirection: 'row',
        paddingHorizontal: '3%',
        width: '100%'
    },
    aboutText: {
        width: '65%',
    },
    readMoreBtn: {
        width: '35%',
        alignItems: 'center',
        justifyContent: "center",
    },
    readMoreClick: {
        backgroundColor: '#F67045',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: "center",
        width: '90%',
        height: 42
    },
    readMoreText: {
        fontSize: 12,
        fontFamily: "SFProText-Semibold",
        letterSpacing: 1,
        color: "#fff"
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
    viewOnMapView: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',
        backgroundColor: '#25C3F4',
        height: 50,
        borderRadius: 5,
        marginHorizontal: '3%'
    },
    viewMapIcon: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    viewOnMapText: {
        marginLeft: '2%',
        fontSize: 14,
        fontFamily: "SFProText-Bold",
        color: "#fff"
    },
    youMay: {
        marginTop: '5%',
        marginBottom:10,
        marginHorizontal: '3%',
        fontFamily: fonts.SfPro_Semibold,
        fontSize: 18,
        color: "#363C49"
    },

    flatListView: {
        borderTopWidth: 0,
        // borderWidth: 1,
        borderRadius: 40,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // borderColor: "#DCE1E9",
        marginHorizontal: width * .03,
        marginTop: 10
    },
    flatListView1: {
        width: width * 0.7,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    flatListItem: {
        height: 185,
        width: '100%'
    },
    flatListImg: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-start'
    },
    kmbutton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: 30,
        borderRadius: 8,
        paddingHorizontal: 5,
        // width: 100,
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: Platform.OS == "ios" ? 5 : 5,
        marginRight: 10
    },
    carImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    kmText: {
        fontFamily: fonts.SfPro_Medium,
        color: "#fff",
        marginLeft: 5
    },
    dateView: {
        flexDirection: "row",
        alignItems: "center",
        // marginLeft: width * .04,
        marginTop: 5,
        // marginBottom:10
    },
    clockIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain"

    },
    dateText: {
        color:colors.textRegular,
        fontFamily: fonts.SfPro_Regular,
        fontSize:12,
        // marginLeft: 10
    },
    summaryText: {
        color: colors.textBlack,
        fontFamily: fonts.SfPro_Semibold,
        // marginLeft: 10,
        fontSize: 16,
        // marginLeft: width * .04,
        marginRight: width * .1,
        marginTop: 10
    },
    locIconB: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        // tintColor: "#363C49"
    },
    locText: {
        color: colors.textRegular,
        fontFamily: fonts.SfPro_Regular,
        // paddingHorizontal: 15,
        fontSize:12
    },
    view3: {
        height: 1,
        width: width * 0.94,
        backgroundColor: "#DCE1E9",
        marginVertical: 10
    },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        alignSelf: "center"
    },
    shareText: {
        color: "#363C49",
        fontFamily: fonts.SfPro_Semibold,
        fontSize: 16,
        marginLeft: 5,
    },
    bottomView: {
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
        paddingHorizontal: '5%',
    },
    bottomBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '96%',
        borderRadius: 10,
        height: 40

    },
    bottomBtn1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40

    },
    googleicon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    btnText: {
        fontSize: 16,
        color: "#fff",
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Bold
    },
    View1: {
        marginTop: statusBarHeight,
        backgroundColor: 'pink'
    },
    skipbtn: {
        height:35,
        width:35,
        borderRadius:35/2,
        justifyContent:"center",
        alignItems:"center",
    },
    skipimg: {
        marginLeft: 5,
        height: 15,
        width: 15,
        resizeMode: "contain",
        tintColor: '#000',
        // padding: 15

    },
    logoView1: {
        height: 450,
        width: '100%',
        paddingHorizontal: 7
    },
    skipView: {
        marginTop: statusBarHeight,
        backgroundColor: 'pink',
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    logoView: {
        marginTop: height * .03,
        height: height * 0.2,
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoimage1: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    cofitImage: {
        height: '70%',
        width: "70%",
        resizeMode: "contain"
    },
    backView: {
        backgroundColor: 'rgba(243, 247, 254, 1)',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginHorizontal: width * 0.05,
        marginTop: -125,
        bottom: -35,
        height: height * 0.03
    },
    startedView: {
        width: '100%',
        paddingHorizontal: 7,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    enterLoc: {
        lineHeight: 30,
        fontSize: 22,
        color: colors.textBlack,
        marginHorizontal: 12,
        fontFamily: fonts.SfPro_Bold,
        marginTop:5
    },
    enterLoc1: {
        lineHeight: 30,
        fontSize: 22,
        color: colors.textBlack,
        marginHorizontal: 12,
        fontFamily: fonts.SfPro_Semibold,
        marginTop:20
    },
    locationinput: {
        borderRadius: 10,
        flexDirection: 'row',
        width: '93%',
        height: 50,
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: 10,
    },
    inputView: {
        width: '10%',
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    locinput: {
        width: "90%",
        color: "#363C49",
        paddingHorizontal: '5%',
        fontFamily: 'SFProText-Regular'
    },
    locinput1: {
        width: "80%",
        color: "#363C49",
        paddingHorizontal: '5%',
        fontFamily: 'SFProText-Regular'
    },
    locIcon: {
        height: 19,
        width: 14,
        resizeMode: 'contain'
    },
    startedText: {
        fontSize: 26,
        color: '#363C49',
        marginTop: "10%",
        fontFamily: "SFProText-Semibold"
    },
    signUpView: {
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    signUpText: {
        fontSize: 15,
        color: "#8B93A1",
        marginTop: 10,
        textAlign: 'center',
        fontFamily: "SFProText-Regular",
        lineHeight: 21
    },

    View: {
        backgroundColor: "#fff",
        height: height * 0.05
    },
    attendEventMainView:{
        position:"absolute",
        bottom:0,
        height:100,
        width:"100%",
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    attendEventMainView1:{
        position:"absolute",
        bottom:0,
        height:100,
        width:"100%",
        paddingHorizontal:20,
        flexDirection:"row",
        backgroundColor:"#fff",
        justifyContent:"space-between",
        alignItems:"center",
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    topHeaderView:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:"5%"
    },
    backImageIcon:{
        height:15,
        width:15,
        resizeMode:"contain"
    },
    backImageView:{
        height:34,
        width:34,
        borderRadius:17,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff"
    },
    bottomSheetTitle:{
        fontSize:18,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.black,
        textAlign:"center",
        marginHorizontal:50,
        marginTop:15
    },
    bottomSheetTimeView:{
      flexDirection:"row",
      marginHorizontal:70 ,
      alignItems:"center",
      marginTop:5
    //   marginHorizontal:
    },
    bottomSheetDateText:{
        fontSize:12,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        maxWidth:'50%'
    },
    seperator:{
        height:12,
        width:1,
        backgroundColor:colors.textRegular,
        marginHorizontal:10
    },
    seperator1:{
        width:"100%",
        height:1,
        backgroundColor:colors.gray,
        marginVertical:20
    },
    ticketSheetView:{
        flexDirection:"row",
        marginHorizontal:20,
        alignItems:"center",
        justifyContent:"space-between"
    },
    ticketType:{
        fontSize:16,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blackMedium
    },
    ticketPrice:{
        fontSize:14,
        fontFamily:fonts.SfPro_Medium,
        color:colors.blackMedium,
        marginTop:10
    },
    addButton:{
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.orange_dark,
        justifyContent:"center",
        alignItems:"center"
    },
    addButton1:{
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textBlack,
        justifyContent:"center",
        alignItems:"center"
    },
    addText:{
        fontSize:14,
        fontFamily:fonts.SfPro_Regular,
        color:colors.orange_dark,
        paddingHorizontal:9,
        paddingVertical:6
    },
    addText1:{
        fontSize:14,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        paddingHorizontal:9,
        paddingVertical:6
    },
    quantityText:{
        fontSize:14,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textBlack,
        marginHorizontal:10
    },
    totalAmount:{
        fontSize:16,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blackMedium
    },
    noOfTicket:{
        fontSize:14,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textBlack,
    },
    modal: {
        justifyContent: "center",
      },
      modalContainer: {
        backgroundColor: "white",
        paddingBottom: 20,
        // paddingHorizontal: 16,
        borderRadius: 8,
        // alignItems: "center",
        // alignSelf: "center",
        // width: "100%",
      },
      status: {
        fontFamily: fonts.SfPro_Bold,
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        color: colors.textBlack
      },
      detailsText: {
        fontFamily: fonts.SfPro_Regular,
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
        lineHeight:20,
        paddingHorizontal: 15,
        color: colors.textRegular
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
    button: {
        borderWidth: 1,
        borderColor: colors.orange_dark,
        backgroundColor: colors.background,
      }
})

export default styles;