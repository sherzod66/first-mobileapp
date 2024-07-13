import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  row: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noneBtn: {
    backgroundColor: "transparent",
  },
  redText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.RED,
  },
  text: {
    fontSize: 11,
    lineHeight: 12,
    fontWeight: "600",
    color: COLORS.GREY6,
  },
  btn: {
    marginTop: 50,
    borderWidth: 1,
    paddingVertical: 18,
    marginHorizontal: 20,
    borderStyle: "dashed",
    borderColor: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox: {
    padding: 25,
    paddingTop: 18,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.GREY2,
  },
  modalHeader: {
    alignSelf: "flex-end",
  },
  modalText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalInputCont: {
    width: 150,
    height: 50,
    padding: 0,
    marginTop: 11,
    borderRadius: 10,
    backgroundColor: COLORS.GREY12,
  },
  modalInput: {
    fontSize: 11,
    lineHeight: 16,
    marginRight: 0,
    fontWeight: "400",
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  modalBtn: {
    marginTop: 23,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: COLORS.RED2,
  },
  modalBtnText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalCalendar: {
    marginTop: 16,
    alignSelf: "stretch",
  },
  modalBox1: {
    padding: 47,
    paddingTop: 33,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  modalText1: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.WHITE,
  },
  modalText2: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.GREY20,
  },
  modalBtnRow: {
    marginTop: 47,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    justifyContent: "space-between",
  },
  modalBtn1: {
    backgroundColor: "transparent",
  },
});
