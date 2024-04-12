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
        alignItems:"flex-start",
    },
    subView1:{
        width:'80%',
        flexDirection:"row",
        // alignItems:"center",
        // backgroundColor:"red"
    },
    subView3:{
        width:'80%',
        paddingLeft:10
        // flexDirection:"row",
        // alignItems:"center",
        // backgroundColor:"red"
    },
    cardView1:{
      height:24,
      width:24,
      resizeMode:"contain"
    },
    subView2:{
        width:'20%',
        // backgroundColor:"green",
        alignItems:"flex-end",
        paddingTop:5
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
        marginVertical:15
    },
    seperator1:{
        width:"100%",
        height:1,
        // backgroundColor:colors.gray,
        marginVertical:20
    },
    saveText:{
        fontSize:16,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blackMedium,
        marginLeft:20,
        marginTop:5,
    },
    stripeText:{
        fontSize:20,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blue1,
        marginLeft:20,
        marginTop:10,
    },
    linkText: {
       fontFamily: fonts.SfPro_Regular,
       color: colors.textBlack,
       marginLeft: 20,
       marginTop: 5,
    },
    payoutText:{
        fontSize:12,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        marginLeft:20,
        marginTop:5,
        marginBottom:25
    },
    editText:{
        fontSize:14,
        fontFamily:fonts.SfPro_Medium,
        color:colors.black,
        // paddingHorizontal:3,
        paddingVertical:5
    },
    editView:{
        borderWidth:1.4,
        borderColor:colors.black,
        borderRadius:3,
        justifyContent:"center",
        alignItems:"center",
        width:60
    },
    expiry:{
        fontSize:10,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        marginLeft:10,
        marginTop:5
    },
    dot:{
        height:3,
        width:3,
        borderRadius:2,
        backgroundColor:colors.black
    },
    button: {
        backgroundColor: colors.orange_dark,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        width: "90%",
        height: 40,
        marginTop:10
      },
      manageButton: {
        borderColor: colors.orange_dark,
        borderWidth: 1,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        width: "90%",
        height: 40,
        marginTop:20
      },
    //   button: {
    //     backgroundColor: colors.orange_dark,
    //     marginBottom: 40,
    //     alignItems: "center",
    //     alignSelf: "center",
    //     justifyContent: "center",
    //     padding: 10,
    //     borderRadius: 8,
    //     width: "90%",
    //     height: 40,
    //     // position:"absolute",
    //     // bottom:10
    //   },
      buttonText: {
        color: "white",
        fontFamily: fonts.SfPro_Bold,
        fontSize:16
      },
      buttonText1: {
        color: colors.orange_dark,
        fontFamily: fonts.SfPro_Semibold,
        fontSize:16
      },
      checkbox: {
        height:24,
        width:24,
        borderRadius:12,
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
      },
      passImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
      },
      passText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.textBlack,
        marginLeft: 5
      },
      passView: {
        flexDirection:'row',
        alignItems: 'center',
        marginLeft:20,
        marginTop:5,

      },
      allSet: {
        fontSize:12,
        fontFamily:fonts.SfPro_Regular,
        color: colors.textBlack,
        marginLeft:20,
        marginTop: 5
      }
})
export default styles;