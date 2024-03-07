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
    bottomBtn1: {
        backgroundColor:colors.orange_light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
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
       
        height: 15,
        width: 15,
        resizeMode: "contain",
        // tintColor: 'white'
    },
    skipbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,marginLeft:10
    },
    skipbtn1: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent:'center',
        right:5
    },
})

export default styles;