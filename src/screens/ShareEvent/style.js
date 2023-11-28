import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";
import fonts from '../../constants/fonts';
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
        paddingHorizontal:5,
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
        backgroundColor: '#FFE9E2'
    },
    calImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    dayTextView: {
        width: "87%",
        paddingHorizontal: '5%',
        alignSelf: "center"
    },
    dayText: {
        fontSize: 14,
        fontFamily: "SFProText-Semibold",
        color: "#363C49"
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
        // marginTop: '5%',
        marginHorizontal: '3%',
        fontFamily: 'SFProText-Semibold',
        fontSize: 18,
        color: "#363C49"
    },
    eventDescription: {
        width: '100%',
        marginTop: '2%',
        paddingHorizontal: '3%',
        paddingVertical: '1%',
    },
    eventDetailText: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: "SFProText-Regular",
        color: "#69707A"
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
        height: 350,
    },
    mapStyle: {
        width: "100%",
        paddingHorizontal: "3%",
        height: 320,
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
         marginHorizontal: '3%', 
         fontFamily: 'SFProText-Semibold', 
         fontSize: 24, 
         color: "#363C49"
    },

    flatListView: {
        borderTopWidth: 0,
        borderWidth: 1,
        borderRadius: 40,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: "#DCE1E9",
        marginHorizontal: width * .03,
        marginTop: 10
    },
    flatListView1: {
        width: width * 0.94,
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
        backgroundColor: "#25C3F4",
        height: 30,
        borderRadius: 8,
        paddingHorizontal:5,
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
        marginLeft: width * .07,
        marginTop: 10
    },
    clockIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain"

    },
    dateText: {
        color: "#363C49",
        fontFamily: fonts.SfPro_Regular,
        marginLeft: 10
    },
    summaryText: {
        color: "#363C49",
        fontFamily: fonts.SfPro_Heavy,
        marginLeft: 10,
        fontSize: 18,
        marginLeft: width * .07,
        marginRight: width * .1,
        marginTop: 10
    },
    locIconB: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        tintColor: "#363C49"
    },
    locText: {
        color: "#363C49",
        fontFamily: fonts.SfPro_Medium,
        paddingHorizontal:15
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
        backgroundColor: '#F67045', 
        flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'center', 
         width: '100%',
          borderRadius: 5,
           height: 50

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
          fontFamily: 'SFProText-Semibold'
    },
    View1: {
        marginTop: statusBarHeight, 
        backgroundColor: 'pink'
    },
    skipbtn: {
        flexDirection: 'row', 
        alignItems: 'center',
         padding: 10, 
         alignSelf: 'flex-start'
    },
    skipimg: {
        marginLeft: 5,
         height: 15,
          width: 15, 
          resizeMode: "contain",
           tintColor: '#000'
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
    cofitImage:{
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
          borderTopRightRadius: 23, 
          borderTopLeftRadius: 23,
    },
    enterLoc: {
        marginVertical: '5%',
         lineHeight: 30, 
         fontSize: 22,
          color: "#363C49",
           marginHorizontal: 12, 
           fontFamily: 'SFProText-Bold'
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
    }

})

export default styles;