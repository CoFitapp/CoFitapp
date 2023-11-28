import { Dimensions, StyleSheet, NativeModules } from "react-native";
const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    bottomView: {
        flex: 0.1,
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
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingHorizontal: 10
    },
    skipimg: {
        marginLeft: 5,
        height: 15,
        width: 15,
        resizeMode: "contain"
    },
    logoView1: {
        height: 450,
        width: '100%',
        marginTop: '10%'
    },
    skipView: {
        paddingHorizontal: 10,
        marginTop: statusBarHeight,
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    logoView: {
        height: height * 0.1,
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
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
        bottom: -15,
        height: height * 0.03
    },
    startedView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterLoc: {
        fontSize: 14,
        color: "#97A0B1",
        marginHorizontal: 25,
        fontFamily: 'SFProText-Regular'
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