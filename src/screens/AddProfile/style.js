import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  locationText:{
    fontFamily:fonts.SfPro_Semibold,
    fontSize:16,
    color: colors.black
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '5%',
    justifyContent: 'space-between',
    marginTop: 15
  },
  login: {
    fontSize: 14,
    fontFamily: fonts.SfPro_Medium,
    color: colors.orange_dark
  },
  pText: {
    paddingLeft: '5%',
    marginTop: 10
  },
  passwordCheckView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  tick: {
    height: 14,
    width: 14,
    marginLeft: '5%'
  },
  password1: {
    fontSize: 12,
    paddingLeft: 5
  },
  bottom: {
    height: '10%',
    borderTopWidth: 1,
    borderColor: colors.gray
  },
  view: {
    width:"90%",
    height:45,
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#A1A5AC",
    borderRadius:11,
    marginLeft: '5%',
    marginTop: 10,
    justifyContent: 'center',
    paddingLeft: 10
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
checkBoxView:{
    marginHorizontal:20,
    marginTop:20,
    alignItems:"flex-start",
    flexDirection:"row"
},
  checkbox: {
    height:16,
    width:16,
    resizeMode:"contain"
  },
  uncheck: {
    height:16,
    width:16,
    borderWidth:1.2,
    borderColor:"#C9C9C9"
  },
  terms: {
    flexDirection:"row",
    width:"94%",
    marginLeft:10,
    flexWrap:"wrap"
  },
  handle: {
    height: 5,
    width: 45,
    backgroundColor: '#3C3C43',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10
  },
  pickCity: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.SfPro_Semibold,
    marginTop: 20
  },
  seperator: {
    height: 1,
    width: '100%',
    marginVertical: 15,
    backgroundColor: '#E6E0E9'
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.SfPro_Medium,
    color: colors.black,
    paddingLeft: 10
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  }
})