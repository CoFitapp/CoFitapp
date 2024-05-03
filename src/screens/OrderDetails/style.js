import react from "react";
import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#fff",
        flex: 1,
        height: '100%',
        width: "100%"
    },
    monthText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.black,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 20
    },
    flatlistMainView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: "center",
        width: "100%",
        // justifyContent:"center"
    },
    eventImage: {
        height: 90,
        width: 90,
        borderRadius: 6
    },
    titleText: {
        fontSize: 16,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.textBlack
    },
    timeText: {
        fontSize: 12,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular,
        marginTop: 5
    },
    ticketType: {
        fontSize: 12,
        fontFamily: fonts.SfPro_Medium,
        color: colors.blackMedium,
        marginTop: 5
    },
    amount: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.textBlack
    },
    arrow: {
        height: 16,
        width: 16,
        resizeMode: "contain",
        marginLeft: 8
    },
    seperator: {
        height: 1,
        width: "90%",
        backgroundColor: colors.gray,
        marginVertical: 20,
        alignSelf: "center"
    },
    date: {
        fontSize: 12,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.textBlack,
        marginLeft: 20,
        marginBottom: 15
    },
    reviewText: {
        fontSize: 12,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular,
        marginHorizontal: 20,
        marginTop: 5,
        lineHeight: 18
    },
    editDetailView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        alignItems: "center"
    },
    detailText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.blackMedium
    },
    editText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        // textDecorationLine: "underline",
        color: colors.blue
    },
    name: {
        fontSize: 12,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular,
        marginLeft: 20,
        marginTop: 5
    },
    emailAndPhoneView: {
        flexDirection: "row",
        marginTop: 5,
        marginLeft: 20
    },
    couponView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    couponSubView: {
        flexDirection: "row",
        alignItems: "center",
    },
    couponImage: {
        height: 24,
        width: 24,
        resizeMode: "contain"
    },
    couponText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.blackMedium,
        marginLeft: 8
    },
    nextImage: {
        height: 14,
        width: 14,
        resizeMode: "contain",
        transform: [{ rotate: "180deg" }]
    },
    orderSummaryText: {
        fontSize: 18,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.textBlack,
        marginLeft: 20
    },
    ticketPriceView: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    priceText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular
    },
    priceValue: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.blackMedium
    },
    bookingFeeView: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    bookingFeeSubView: {
        flexDirection: "row",
        alignItems: "center"
    },
    bookingText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular
    },
    infoImage: {
        height: 16,
        width: 16,
        resizeMode: "contain",
        marginLeft: 10
    },
    TotalPriceText: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Semibold,
        color: colors.blackMedium
    },
    cardView: {
        flexDirection: "row",

        width: '100%',
        paddingHorizontal: 20,
        alignItems: "center"
    },
    subView1: {
        width: '80%',
        flexDirection: "row",
        alignItems: "center",
    },
    cardView1: {
        height: 24,
        width: 24,
        resizeMode: "contain"
    },
    subView2: {
        width: '20%',
        // backgroundColor:"green",
        alignItems: "flex-end"
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.SfPro_Medium,
        color: colors.blackMedium,
        marginLeft: 10
    },
    expiry:{
        fontSize: 12,
        fontFamily: fonts.SfPro_Regular,
        color: colors.textRegular,
        marginLeft: 10
    },
    checkbox: {
      height:24,
      width:24,
      borderRadius:12,
      borderWidth:2,
      justifyContent:"center",
      alignItems:"center",
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
      modal: {
        justifyContent: "center",
        // height:200,
        // marginVertical:300
        flex: 1,
      },
      modalContainer: {
        backgroundColor: "white",
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        flex:1
      },
      check: { height: 100, width: 100 },
      close: { position: "absolute", left: 0, margin: 20 },
      closeIcon: { height: 18, width: 18 },
      status: {
        fontFamily: "SFProText-Bold",
        fontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "800",
        textAlign: "center",
      },
      detailsText: {
        fontFamily: "SFProText-Regular",
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",
        lineHeight:20
      },
      modalView: {
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 20
      },
      promoText: {
       fontFamily: fonts.SfPro_Semibold,
       fontSize: 18,
       color: colors.textBlack,
       textAlign: 'center',
    //    marginTop: 20,
       marginBottom: 20
      },
      inputView: {
         height: 45,
         marginHorizontal: 20,
         borderRadius: 11,
         borderColor: '#A1A5AC',
         borderWidth: 1,
         justifyContent: 'center',
         marginBottom: 10
      },
      input:{
        flex: 1,
        paddingLeft: 10,
        fontFamily: fonts.SfPro_Regular
      },
      modalBtnView: {
        flexDirection: 'row'
      },
      CancelBtn: {
        // backgroundColor: colors.orange_dark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '42%',
        borderRadius: 8,
        height: 40,
        marginLeft: 20
        // marginLeft:'5%'
    },
    DeleteBtn:{
        borderColor: colors.orange_dark,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '42%',
        borderRadius: 8,
        height: 40,
        marginRight: 20
    },
    btnText: {
        fontSize: 16,
        color: colors.orange_dark,
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Semibold
    },
    btnText1: {
        fontSize: 16,
        color: "#fff",
        marginLeft: '5%',
        fontFamily: fonts.SfPro_Semibold
    },
    promoError: {
      marginLeft:20,
      fontSize: 12,
      fontFamily: fonts.SfPro_Regular,
      color: '#D66972'
    },
    promoApply: {
        color: '#E25F3C',
        fontSize: 12,
        fontFamily: fonts.SfPro_Regular
    }
})
export default styles;