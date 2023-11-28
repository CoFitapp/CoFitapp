import { StyleSheet } from "react-native";
import colors from "../../constants/colors";


const styles = StyleSheet.create({
    bottomBtn: {
        backgroundColor:colors.orange_light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 5,
        height: 50,
        marginLeft:'5%',
        marginVertical:40
    
    },
    btnText: {
        fontSize: 16,
        color: "#fff",
        marginLeft: '5%',
        fontFamily: 'SFProText-Semibold'
    },
    skipimg: {
        marginLeft: 15,
        height: 15,
        width: 15,
        resizeMode: "contain",
        // tintColor: 'white'
    },
    skipbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        flex:1
    },
})

export default styles;