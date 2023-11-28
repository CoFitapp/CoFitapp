import { Dimensions, StyleSheet, NativeModules, Platform } from "react-native";
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
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: '5%',
    },
    bottomBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#DCE1E9",
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        height: 50

    },
    googleicon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    continueText: {
        fontSize: 14,
        color: "#363C49",
        marginLeft: '5%',
        fontFamily: 'SFProText-Semibold'
    },
    View1: {
        marginTop: statusBarHeight,
    },
    skipbtn: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingHorizontal: 10
    },
    skipimg: {
        marginLeft: 5,
        height: 6,
        width: 7,
        resizeMode: "contain"
    },
    logoView1: {
        height: height * 0.54,
        marginTop: '3%',
        width: '100%',
    },
    skipView: {
        paddingHorizontal: 10,
        alignItems: 'flex-end',
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
        height: '100%',
        width: "70%",
        resizeMode: "contain"
    },
    backView: {
        backgroundColor: 'rgba(243, 247, 254, 1)',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginHorizontal: width * 0.05,
        bottom: -12,
        height: height * 0.03
    },
    startedView: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startedText: {
        fontSize: 28,
        color: '#363C49',
        marginTop: "7%",
        fontFamily: "SFProText-Semibold"
    },
    signUpView: {
        alignItems: 'center',
        paddingHorizontal: 45,
    },
    signUpText: {
        fontSize: 14,
        color: "#8B93A1",
        marginTop: 10,
        textAlign: 'center',
        fontFamily: "SFProText-Regular"
    },

    View: {
        backgroundColor: "#fff",
        height: height * 0.05
    },
    loginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#DCE1E9",
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        height: 50
    },
    googleIcon1: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    googleText: {
        fontSize: 16,
        color: "#363C49",
        marginLeft: '5%'
    }


})

export default styles;