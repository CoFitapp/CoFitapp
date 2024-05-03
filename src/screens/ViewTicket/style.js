import react from "react";
import { NativeModules, StyleSheet, useWindowDimensions } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";


const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
// const { height, width } = useWindowDimensions();

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:"#E7ECF0",
        flex:1
    },
    mainView1:{
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        paddingTop: Platform.OS == "ios" ? statusBarHeight+10 : 25,
        backgroundColor:"#fff",
        paddingBottom: 15
    },
    seperator:{
        width:"100%",
        height:1,
        backgroundColor:colors.gray,
        marginVertical:15
    },
    button: {
        backgroundColor: colors.orange_dark,
        marginBottom: 40,
        marginTop:20,
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
      ticketCardView:{
        marginHorizontal:20,
        // paddingHorizontal:20,
        marginTop:40,
        backgroundColor:"#fff",
      //  width:350,
       borderRadius:11,
       shadowOffset: { width: 1, height: 1 },
        shadowColor: 'gray',
        shadowOpacity: 0.3,
      },
      eventImage:{
        height:180,
        width:'100%',
        alignSelf:"center",
        // marginHorizontal:20,
        marginVertical:20,
        borderRadius:6
        // marginHorizontal:20
      },
      eventTitle:{
        fontSize:16,
        fontFamily:fonts.SfPro_Semibold,
        color:colors.blackMedium
      },
      date:{
        fontSize:12,
        fontFamily:fonts.SfPro_Regular,
        color:colors.textRegular,
        marginTop:5
      },
      dottedSeperator:{
        borderStyle:"dashed",
        borderWidth: 1,
        borderRadius: 1,
        height:100,
        marginVertical:20,
        borderColor:"#000"
      },
      ticketType:{
        fontSize:14,
        fontFamily:fonts.SfPro_Medium,
        textAlign:"center",
        marginTop:10
      },
      ticketType2:{
        fontSize:14,
        fontFamily:fonts.SfPro_Regular,
        textAlign:"center",
        // marginTop:10
      },
      ticketType1:{
        fontSize:12,
        fontFamily:fonts.SfPro_Medium,
        textAlign:"center",
        // marginTop:10,
        color:'#000',
        paddingHorizontal:10,
        paddingVertical: 7,
        letterSpacing: 0,
      },
      barcodeImg:{
        height:55,
        width:"100%",
        // resizeMode:"contain",
        marginTop:15
      },
      cancellationView:{
        width:"100%",
        backgroundColor:"#F4F4F4",
        marginTop:15
      },
      cancellationText:{
        textAlign:"center",
        paddingVertical:4

      },
      totalAmountView:{
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginVertical:20
      },
      amountText:{
        fontSize:14,
        fontFamily:fonts.SfPro_Bold,
        color:colors.blackMedium
      }
})
export default styles;