import { Dimensions, PixelRatio, StyleSheet, NativeModules, Platform } from "react-native";
import fonts from '../../constants/fonts';
const { height, width } = Dimensions.get('window')
const { StatusBarManager } = NativeModules;
const statusBarHeight = StatusBarManager.HEIGHT;
const fontScale = PixelRatio.getFontScale();
const fontSize = size => size / fontScale;
const styles = StyleSheet.create({

  mainView: {
    backgroundColor: "#fff",
    flex: 1
  },
  view1: {
    // marginTop: statusBarHeight
  },
  swiperView: {
    height: height,
    // marginTop: height * .05
  },
  img: {
    height: height,
    width: width,
    resizeMode: "contain"
  },
  browse: {
    color: "#fff",
    fontSize: fontSize(24),
    marginLeft: 15,
    // textAlign: "center",
    marginTop: height * .04,
    fontFamily: fonts.SfPro_Semibold
  },
  fitness: {
    color: "#363C49",
    fontSize: fontSize(32),
    textAlign: "center",
    fontFamily: fonts.SfPro_Semibold
  },
  mission: {
    color: "#FCFCFC",
    fontSize: fontSize(14),
    marginHorizontal: 30,
    lineHeight: fontSize(22),
    marginTop: 10,
    marginBottom: 50,
    marginLeft: 15,
    // textAlign: 'center',
    fontFamily: fonts.SfPro_Medium
  },
  choose: {
    color: "#363C49",
    fontSize: fontSize(32),
    textAlign: "center",
    marginTop: 20,
    fontFamily: fonts.SfPro_Semibold
  },
  mission1: {
    color: "#8B93A1",
    fontSize: fontSize(16),
    marginHorizontal: 30,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: fonts.SfPro_Medium
  },
  bottom: {
    marginBottom: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20
  },
  startedBtn: {
    height: 48,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: "#E25F3C",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  startedText: {
    color: "#fff",
    fontSize: fontSize(16)
  },
  nextImg: {
    height: 10,
    width: 15,
    resizeMode: "contain",
    marginLeft: 5
  },
  skipBtn: {
    height: 48,
    width: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DCE1E9",
    justifyContent: "center",
    alignItems: "center"
  },
  skipText: {
    color: "#8B93A1",
    fontSize: fontSize(16)
  },
  nextBtn: {
    height: 48,
    width: 90,
    borderRadius: 10,
    backgroundColor: "#25C3F4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 2
  },
  activeDot: {
    height: 8,
    width: 22,
    borderRadius: 4,
    borderColor: '#fff',
    backgroundColor: '#25C3F4',
    marginHorizontal: 2
  }
})
export default styles

