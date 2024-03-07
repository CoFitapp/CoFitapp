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
        marginHorizontal: width * .035,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    findText: {
        color: "#363C49",
        fontSize: 16,
        fontFamily: fonts.SfPro_Medium
    },
    newJersyView: {
        flexDirection: "row",
        alignItems: "center", width: '100%'
    },
    newJersyText: {
        color: "#363C49",
        fontSize: 24,
        fontFamily: fonts.SfPro_Bold,
        marginLeft: 5,
    },
    locicon: {
        height: 20,
        width: 15,
        
        resizeMode: "contain",
        tintColor: "#F67045",
        marginTop: 5
    },
    profileImg: {
        height: 45,
        width: 45,
        borderRadius:10
    },
    searchView: {
        flexDirection: "row",
        marginHorizontal: width * .03,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    searchView1: {
        width: width * .94,
        flexDirection: "row",
        borderRadius: 10,
        height: 50,
        backgroundColor: "#F1F5FC",
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
        fontFamily: fonts.SfPro_Medium,
        color: "#B2BAC7"
    },
    filterView: {
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'center',
        backgroundColor: colors.orange_light,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: colors.orange_light,

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
        fontSize: 30,
        width: width * 0.61,
        fontFamily: fonts.SfPro_Semibold,
        color: "#363C49",
        // marginTop:20,
        marginLeft: width * .03
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
        width: '100%',
        backgroundColor: "#F1F5FC",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
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
        paddingHorizontal: 5,
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
        paddingHorizontal: 15
        // marginLeft: 10
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
        justifyContent: "flex-start", 
        marginBottom: 15, 
        marginLeft: width * .07, 
        alignSelf: "flex-start"
    },
    shareText: {
        color: "#363C49",
        fontFamily: fonts.SfPro_Semibold,
        fontSize: 16,
        marginLeft: 5,
    },
    noEventImage:{
        height:200,
        width:200,
        resizeMode:"contain",
        alignSelf:"center",
        marginTop:height*0.05
    },
    noEventText:{
        fontSize:18,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blackMedium,
        textAlign:"center",
        marginTop:5
    },
    exploreText:{
        fontSize:12,
        fontFamily:fonts.SfPro_Regular,
        textAlign:"center",
        marginTop:5
    }

})

export default styles;