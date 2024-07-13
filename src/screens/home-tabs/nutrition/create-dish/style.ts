import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  miniTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  inputCont: {
    marginTop: 15,
    backgroundColor: COLORS.GREY2,
    borderRadius: 10,
  },
  input: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  row: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
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
  col3: {
    height: 50,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  title: {
    fontSize: 16,
    marginTop: 45,
    lineHeight: 22,
    fontWeight: "700",
    color: COLORS.WHITE,
    textAlign: "center",
  },
  scrollCont: {
    marginTop: 25,
    flexDirection: "row",
  },
  tabCont: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  btn: {
    marginTop: 30,
    paddingVertical: 18,
    marginHorizontal: 20,
    backgroundColor: COLORS.RED,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox: {
    padding: 16,
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
    padding: 10,
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
});
