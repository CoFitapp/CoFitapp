import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

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
  }
})