import react from "react";
import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:"#fff",
        flex:1
    },
    cardView:{
        flexDirection:"row",
        // marginTop:20,
        width:'100%',
        paddingHorizontal:20,
        alignItems:"center"
    },
    subView1:{
        width:'80%',
        flexDirection:"row",
        alignItems:"center",
        // backgroundColor:"red"
    },
    cardView1:{
      height:24,
      width:24,
      resizeMode:"contain"
    },
    subView2:{
        width:'20%',
        // alignSelf:"flex-end"
    },
    nextIcon:{
        height:14,
        width:14,
        resizeMode:"contain",
        transform:[{rotate:"180deg"}],
        alignSelf:"flex-end"
    },
    text:{
     fontSize:14,
     fontFamily:fonts.SfPro_Medium,
     color:colors.blackMedium,
     marginLeft:10
    },
    seperator:{
        width:"100%",
        height:1,
        backgroundColor:colors.gray,
        marginVertical:20
    }
})
export default styles;