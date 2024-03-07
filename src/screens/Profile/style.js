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
    profileView:{
        marginTop:statusBarHeight+25,
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
    name:{
    textAlign:"center",
    marginTop:8,
    color:"#333333",
    fontFamily:fonts.SfPro_Regular,
    marginBottom:25
    },
    view2:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        marginHorizontal:"5%"
    },
    nextArrowIcon:{
        height:24,
        width:24,
        resizeMode:"contain",
        alignSelf:"flex-end"
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
        fontSize:14,
        fontFamily:fonts.SfPro_Medium,
        marginLeft:15,
        color:"#0D131F"
    },
    lineSeperator:{
      width:"100%",
      height:1,
      backgroundColor:"#dbd9d9",
      marginVertical:15
    },
    bottomView: {
        flex: 0.1,
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
        // paddingHorizontal: '5%',
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
    googleicon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    btnText: {
        fontSize: 16,
        color: "#fff",
        marginLeft: '5%',
        fontFamily:fonts.SfPro_Semibold
    },
    View1: {
        marginTop: statusBarHeight,
        backgroundColor: 'pink'
    },
    skipbtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipimg: {
        marginLeft: 5,
        height: 15,
        width: 15,
        resizeMode: "contain",
        tintColor: 'white'
    },
    logoView1: {
        height: 450,
        width: '100%',
        marginTop: '10%',
        paddingHorizontal: 7
    },
    skipView: {
        marginTop: statusBarHeight,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
     
        flex:0.1

    },
    logoView: {
      
        height: height * 0.,
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
        top:-15,
        height: height * 0.03
    
    },
    startedView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        top:-42,
        justifyContent: 'center'
    },
    enterLoc: {
        fontSize: 14,
        color: "#97A0B1",
        marginHorizontal: 12,
        fontFamily: fonts.SfPro_Regular
    },
    locationinput: {
        borderRadius: 10,
        flexDirection: 'row',
        width: '93%',
        height: 50,
        alignItems: "center",
        marginHorizontal: 12,
        marginTop: 10,
        backgroundColor: '#F1F5FC'
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
        fontFamily: fonts.SfPro_Regular
    },
    locinput1: {
        width: "80%",
        color: "#363C49",
        paddingHorizontal: '5%',
        fontFamily: fonts.SfPro_Regular
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
        fontFamily: fonts.SfPro_Semibold
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
        fontFamily: fonts.SfPro_Regular,
        lineHeight: 21
    },

    View: {
        backgroundColor: "#fff",
        height: height * 0.05
    }

})

export default styles;





// import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";

// const { height, width } = Dimensions.get('window')
// const { StatusBarManager } = NativeModules;
// const statusBarHeight = StatusBarManager.HEIGHT;

// const styles = StyleSheet.create({
//     mainView: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     bottomView: {
//         flex: 0.1,
//         paddingVertical: 10,
//         marginTop: 10,
//         width: '100%',
//         // paddingHorizontal: '5%',
//     },
//     bottomBtn: {
//         backgroundColor: '#F67045',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '90%',
//         borderRadius: 5,
//         height: 50,
//         marginLeft:'5%'
//     },
//     googleicon: {
//         height: 30,
//         width: 30,
//         resizeMode: 'contain'
//     },
//     btnText: {
//         fontSize: 16,
//         color: "#fff",
//         marginLeft: '5%',
//         fontFamily: 'SFProText-Semibold'
//     },
//     View1: {
//         marginTop: statusBarHeight,
//         backgroundColor: 'pink'
//     },
//     skipbtn: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     skipimg: {
//         marginLeft: 5,
//         height: 15,
//         width: 15,
//         resizeMode: "contain",
//         tintColor: 'white'
//     },
//     logoView1: {
//         height: 450,
//         width: '100%',
//         marginTop: '10%',
//         paddingHorizontal: 7
//     },
//     skipView: {
//         marginTop: statusBarHeight,
//         paddingHorizontal: 10,
//         alignItems: 'flex-start',
//         justifyContent: 'flex-end'
//     },
//     logoView: {
//         marginTop: height * .03,
//         height: height * 0.2,
//         paddingHorizontal: '10%',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     logoimage1: {
//         height: '100%',
//         width: '100%',
//         resizeMode: 'contain'
//     },
//     cofitImage: {
//         height: '70%',
//         width: "70%",
//         resizeMode: "contain"
//     },
//     backView: {
//         backgroundColor: 'rgba(243, 247, 254, 1)',
//         borderTopRightRadius: 15,
//         borderTopLeftRadius: 15,
//         marginHorizontal: width * 0.05,
//         bottom: -15,
//         height: height * 0.03
//     },
//     startedView: {
//         backgroundColor: "rgba(255, 255, 255, 1)",
//         borderTopRightRadius: 25,
//         borderTopLeftRadius: 25,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     enterLoc: {
//         fontSize: 14,
//         color: "#97A0B1",
//         marginHorizontal: 12,
//         fontFamily: 'SFProText-Regular'
//     },
//     locationinput: {
//         borderRadius: 10,
//         flexDirection: 'row',
//         width: '93%',
//         height: 50,
//         alignItems: "center",
//         marginHorizontal: 12,
//         marginTop: 10,
//         backgroundColor: '#F1F5FC'
//     },
//     inputView: {
//         width: '10%',
//         justifyContent: "flex-end",
//         alignItems: "flex-end"
//     },
//     locinput: {
//         width: "90%",
//         color: "#363C49",
//         paddingHorizontal: '5%',
//         fontFamily: 'SFProText-Regular'
//     },
//     locinput1: {
//         width: "80%",
//         color: "#363C49",
//         paddingHorizontal: '5%',
//         fontFamily: 'SFProText-Regular'
//     },
//     locIcon: {
//         height: 19,
//         width: 14,
//         resizeMode: 'contain'
//     },
//     startedText: {
//         fontSize: 26,
//         color: '#363C49',
//         marginTop: "10%",
//         fontFamily: "SFProText-Semibold"
//     },
//     signUpView: {
//         alignItems: 'center',
//         paddingHorizontal: 12,
//     },
//     signUpText: {
//         fontSize: 15,
//         color: "#8B93A1",
//         marginTop: 10,
//         textAlign: 'center',
//         fontFamily: "SFProText-Regular",
//         lineHeight: 21
//     },
//     View: {
//         backgroundColor: "#fff",
//         height: height * 0.05
//     }

// })

// export default styles;