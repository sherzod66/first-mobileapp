import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  btnCont: {
    marginVertical: 20,
    marginHorizontal: 25,
    justifyContent: "center",
  },
  row: {
    paddingBottom: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLORS.GREY11,
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleBox: {
    flex: 1,
    justifyContent: "center",
  },
  titleBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  col1: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  col2: {
    height: 50,
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  col3: {
    height: 50,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  colLine: {
    height: 1,
    width: "50%",
    marginVertical: 3,
    backgroundColor: COLORS.GREY12,
  },
  row2: {
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    borderColor: COLORS.GREY11,
  },
  changeBtn: {
    paddingVertical: 7,
    paddingHorizontal: 18,
  },
  text1: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 10,
    lineHeight: 12,
    marginLeft: 15,
    fontWeight: "500",
    color: COLORS.WHITE,
  },
  btnBox: {
    marginTop: 60,
    paddingHorizontal: 45,
  },
  btn1: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.GREEN2,
    backgroundColor: "transparent",
  },
  btnText1: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.GREEN2,
  },
  btn2: {
    marginTop: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.YELLOW2,
    backgroundColor: "transparent",
  },
  btnText2: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.YELLOW2,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  modalTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    flex: 1,
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modalText1: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  modalText2: {
    fontSize: 12,
    lineHeight: 13,
    marginHorizontal: 20,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modalText3: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
    textAlign: "center",
  },
  modalInputRow: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalInputBox: {
    width: "45%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    justifyContent: "center",
    backgroundColor: COLORS.GREY15,
  },
  modalInputCont: {
    flex: 1,
    padding: 0,
    marginRight: 5,
    backgroundColor: "transparent",
  },
  modalInput: {
    margin: 0,
    height: 50,
    fontSize: 12,
    lineHeight: 13,
    marginRight: 0,
    fontWeight: "400",
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  ml20: {
    flex: 1,
    marginLeft: 18,
  },
  modalBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBtn1: {
    width: 120,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 17,
    backgroundColor: "transparent",
  },
  modalBtnText1: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  modalBtn2: {
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
  modalErrorText: {
    color: COLORS.RED,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
});