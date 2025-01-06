import { Dimensions, NativeModules, Platform, StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Platform.OS == "ios" ? statusBarHeight+10 : 0
    },
    view1: {
        flexDirection: "row",
        marginHorizontal: width * .03,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    findText: {
        color: "#020A23",
        fontSize: 14,
        fontFamily: fonts.SfPro_Regular
    },
    newJersyView: {
        flexDirection: "row",
        alignItems: "center", width: '100%'
    },
    newJersyText: {
        color: "#020A23",
        fontSize: 16,
        marginLeft:5,
        fontFamily: fonts.SfPro_Bold,
       maxWidth:'90%'
    },
    locicon: {
        height: 24,
        width: 24,
        // marginLeft: 5,
        resizeMode: "contain",
        // tintColor: "#F67045",
        // marginTop: 5
    },
    profileImg: {
        height: 45,
        width: 45,
        borderRadius:7
    },
    searchView: {
        flexDirection: "row",
        marginHorizontal: width * .03,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    searchVieww: {
        flexDirection: "row",
        marginHorizontal: width * .03,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
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
        height: 45,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        justifyContent:'center'
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
        color: "#49454F",
        
    },
    filterView: {
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'center',
        backgroundColor: colors.orange_light,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: colors.orange_light
    },
    filterIcon: {
        height: 22,
        width: 22,
        resizeMode: "contain",
        marginRight: width * .03
    },
    view2: {
        height: 40,
        marginTop: 20
    },
    scroll: {
        flexDirection: "row",
        marginLeft: width * .03
    },
    // scrollItem:{
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: selectedIndex == 0 ? "#25C3F4" : "#fff",
    //     borderRadius: 5,
    //     height: 38,
    //     marginLeft: 5,
    //     borderWidth: 1,
    //     borderColor: "#DCE1E9"
    // },
    eventsText: {
        fontSize: 18,
        fontFamily: fonts.SfPro_Semibold,
        color: "#0D131F",
        marginBottom:20
        // marginLeft: width * .03
    },
    flatListView: {
        borderTopWidth: 0,
        // borderWidth: 1,
        borderRadius: 40,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // borderColor: "#DCE1E9",
        marginHorizontal: width * .03,
        // marginTop: 20
    },
    flatListView1: {
        width: width * 0.94,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
        // borderRadius:11
    },
    flatListItem: {
        // height: 125,
        // width: '45%',
        // backgroundColor: "red",
        borderRadius: 11,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    flatListImg: {
        height: '100%',
        width: '100%',
        // flex: 1,
        // resizeMode: 'cover',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // alignSelf: 'flex-start',
        borderRadius: 11,
        // aspectRatio: 1/1,
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,

    },
    kmbutton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: 30,
        borderRadius: 8,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: Platform.OS == "ios" ? 10 : 10,
        marginRight: 10
    },
    carImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    kmText: {
        fontFamily: fonts.SfPro_Regular,
        color: "#fff",
        fontSize:12,
        marginLeft: 5
    },
    dateView: {
        flexDirection: "row",
        alignItems: "center",
        // marginLeft: width * .05,
        marginTop: 10,
        marginBottom:15
    },
    dateView1: {
        // flexDirection: "row",
        // alignItems: "center",
        // marginLeft: width * .05,
        // marginTop: 10,
        // marginBottom:15
    },
    clockIcon: {
        height: 18,
        width: 18,
        resizeMode: "contain",
        // tintColor:"#25C3F4"
    },
    dateText: {
        color: "#333333",
        fontFamily: fonts.SfPro_Regular,
        fontSize:12,
        marginLeft: 10,
        marginTop: 5
    },
    summaryText: {
        color: "#020A23",
        fontFamily: fonts.SfPro_Semibold,
        marginLeft: 10,
        fontSize: 16,
        // marginLeft: width * .05,
        marginRight: width * .1,
        // marginTop: 5
    },
    locIconB: {
        height: 18,
        width: 18,
        resizeMode: "contain",
        // tintColor: "#363C49"
    },
    locText: {
        color: "#333333",
        fontFamily: fonts.SfPro_Regular,
        fontSize:12,
        // paddingHorizontal: 15
        marginLeft: 10,
        marginTop: 5
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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        height: Dimensions.get('window').height / 2,
        width: '100%'
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
      seperator: {
        height: 1,
        width: '100%',
        marginVertical: 15,
        backgroundColor: '#E6E0E9'
      },
      seperator2: {
        height: 1,
        width: '94%',
        marginVertical: 15,
        marginLeft: '3%',
        backgroundColor: '#E6E0E9'
      },
      seperator1: {
        height: 1,
        width: '100%',
        backgroundColor: '#E6E0E9'
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
        color: colors.orange_dark,
        marginLeft: '5%',

    },
    returnText1: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.textRegular,
        marginLeft: '5%',
        paddingVertical: 15
    },
    currentLocation: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'space-between'

    },
    currentLocation1: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    locationArrow: {
      height: 24,
      width: 24,
      resizeMode: 'contain'
    },
    location: {
      fontSize: 16,
      fontFamily: fonts.SfPro_Semibold,
      color: colors.orange_dark,
      paddingLeft: 7
    },
    next: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      transform: [{rotate: '270deg'}]
    },
    homeLocation: {
      fontSize: 16,
      fontFamily: fonts.SfPro_Semibold,
      color: colors.black,
      marginLeft: '5%',
      marginTop: 5
    }
})

export default styles;