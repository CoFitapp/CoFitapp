import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  photo: {
    paddingHorizontal: 20
  },

  bottom: {
    height: 160,
    borderTopWidth: 1,
    borderColor: colors.gray
  },
  button: {
    borderWidth: 1,
    borderColor: colors.orange_dark,
    backgroundColor: colors.background
  }
})