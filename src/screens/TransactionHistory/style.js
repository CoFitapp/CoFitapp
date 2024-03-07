import react from "react";
import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:"#fff",
        flex:1
    },
    monthText:{
        fontSize:14,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.black,
        marginTop:25,
        marginBottom:25,
        marginLeft:20
    },
    flatlistMainView:{
        flexDirection:'row',
        paddingHorizontal:20,
        alignItems:"center",
        width:"100%",
        // justifyContent:"center"
    },
    eventImage:{
        height:56,
        width:56,
        borderRadius:6
    },
    titleText:{
        fontSize:12,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.textBlack
    },
    timeText:{
        fontSize:10,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        marginTop:3
    },
    ticketType:{
        fontSize:10,
        fontFamily:fonts.SfPro_Medium,
        color:colors.blackMedium,
        marginTop:10
    },
    amount:{
     fontSize:14,
     fontFamily:fonts.SfPro_Semibold,
     color:colors.textBlack
    },
    arrow:{
        height:16,
        width:16,
        resizeMode:"contain",
        marginLeft:8
    },
    seperator:{
        height:1,
        width:"100%",
        backgroundColor:colors.gray,
        marginVertical:20
    },
    date:{
        fontSize:12,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.textBlack,
        marginLeft:20,
        marginBottom:15
    }
})
export default styles;