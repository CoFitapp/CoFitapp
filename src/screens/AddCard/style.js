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
        // backgroundColor: colors.orange_dark,
        marginBottom: 40,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
        width: "90%",
        height: 40,
        // position:"absolute",
        // bottom:10
      },
      buttonText: {
        color: "white",
        fontFamily: fonts.SfPro_Bold,
        fontSize:16
      },
      textInputView:{
        flexDirection:"row",
        marginHorizontal:'5%',
        justifyContent:"space-between",
        marginTop:15
        },
        inputInnerView:{
        //   width:"47%",
          height:45,
          backgroundColor:"#fff",
          borderWidth:1,
          borderColor:"#A1A5AC",
          borderRadius:11
        },
        inputInnerView3:{
              width:"47%",
              height:45,
              backgroundColor:"#fff",
              borderWidth:1,
              borderColor:"#A1A5AC",
              borderRadius:11
            },
        inputInnerView2:{
              width:"14%",
              height:45,
              backgroundColor:"#fff",
              borderWidth:1,
              borderColor:"#25C3F4",
              borderRadius:11,
              justifyContent:"center",
              alignItems:"center"
            },
        inputInnerView1:{
            width:"100%",
            height:45,
            backgroundColor:"#fff",
            borderWidth:1,
            borderColor:"#A1A5AC",
            borderRadius:11
          },
          eText:{
            marginTop:20,
            marginLeft:20,
            fontSize:14,
            fontFamily:fonts.SfPro_Medium,
            color:colors.blackMedium
          },
          phoneInputView1:{
            flexDirection:"row",
            width:"34%",
            height:45,
            backgroundColor:"#fff",
            borderWidth:1,
            borderColor:"#A1A5AC",
            borderRadius:11,
            justifyContent:"center",
            alignItems:"center"
        },
        phoneInputView2:{
            width:"60%",
            height:45,
            backgroundColor:"#fff",
            borderWidth:1,
            borderColor:"#A1A5AC",
            borderRadius:11
        },
        nextArrowIcon:{
            height:24,
            width:24,
            resizeMode:"contain",
            // alignSelf:"flex-end",
        },
        checkBoxView:{
            marginHorizontal:20,
            marginTop:20,
            alignItems:"flex-start",
            flexDirection:"row"
        },
        term1:{
            // marginLeft:15,
            fontSize:12,
            fontFamily:fonts.SfPro_Regular,
            color:colors.textRegular
        },
        term2:{
            fontSize:12,
            fontFamily:fonts.SfPro_Medium,
            color:colors.orange_dark
        },
        cameraIcon:{
            height:20,
            width:20,
            resizeMode:"contain",
            tintColor:"#25C3F4"
        },
        secureText:{
            fontSize:12,
            fontFamily:fonts.SfPro_Regular,
            color:colors.textRegular,
            marginHorizontal:20,
            marginTop:20
        },
        acceptText:{
            fontSize:12,
            fontFamily:fonts.SfPro_Regular,
            color:colors.textRegular,
            marginHorizontal:20,
            marginTop:40
        },
        cardsView:{
            flexDirection:"row",
            marginTop:20,
            marginLeft:10,
            alignItems:"center"
        },
        cardIcon:{
            height:20,
            width:28,
            resizeMode:"contain",
            marginLeft:10
        }
})
export default styles;