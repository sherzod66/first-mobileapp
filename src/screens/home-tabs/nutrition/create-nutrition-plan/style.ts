import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  inputTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  inputCont: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  input: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box1: {
    width: 60,
    height: 50,
    marginTop: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  box2: {
    width: 80,
    height: 50,
    marginTop: 8,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.GREY2,
  },
  col1: {
    width: 38,
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.GREY16,
  },
  col2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  colLine: {
    height: 1,
    width: "70%",
    marginVertical: 3,
    backgroundColor: COLORS.GREY16,
  },
  mt10: {
    marginTop: 10,
  },
  center: {
    alignItems: "center",
  },
  buttons: {
    marginTop: 16,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btn1: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    borderColor: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  btn2: {
    paddingVertical: 20,
    backgroundColor: COLORS.GREEN2,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.WHITE,
  },
  text1: {
    fontSize: 14,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  description: {
    marginTop: 40,
  },
  descInputCont: {
    padding: 5,
    height: 80,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  descInput: {
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  btn3: {
    marginTop: 40,
    paddingVertical: 18,
    marginHorizontal: 20,
    backgroundColor: COLORS.RED,
  },
  btn3Text: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox1: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  modalHeader1: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitleBox: {
    flex: 1,
    paddingRight: 30,
  },
  modalRow1: {
    marginTop: 25,
    flexDirection: "row",
  },
  modalInputCont1: {
    flex: 1,
    padding: 10,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GREY18,
  },
  modalInput1: {
    marginRight: 0,
    backgroundColor: "transparent",
  },
  modalBtn1: {
    paddingVertical: 16,
    paddingHorizontal: 50,
    backgroundColor: COLORS.RED,
  },
  modalBtnText1: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modalBtn2: {
    marginTop: 27,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: COLORS.RED2,
  },
  modalBtnText2: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalBox2: {
    paddingTop: 18,
    borderRadius: 10,
    paddingBottom: 25,
    paddingHorizontal: 32,
    backgroundColor: COLORS.GREY2,
  },
  modalHeader2: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalRow2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalCol: {
    width: "45%",
    alignItems: "center",
  },
  modalInputCont2: {
    height: 40,
    width: "100%",
    // padding: 10,
    // marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY17,
  },
  modalInputCont3: {
    height: 40,
    width: "100%",
    padding: 10,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY17,
  },
  modalInput2: {
    marginRight: 0,
    backgroundColor: "transparent",
  },
  modalCenter: {
    alignItems: "center",
  },

  animated: {
    flexDirection: "row",
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  animatedOne: {
    backgroundColor: COLORS.GREY2,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  textOne: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btnLanguage: {
    marginVertical: 10,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  activeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  inputTopText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  inputInner: {
    backgroundColor: COLORS.GREY3,
    color: COLORS.WHITE,
  },
});
