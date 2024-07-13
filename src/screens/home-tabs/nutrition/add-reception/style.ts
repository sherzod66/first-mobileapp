import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  row: {
    marginTop: 12,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: "row",
    paddingHorizontal: 25,
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  box1: {
    height: 50,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY17,
  },
  box2: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY17,
  },
  main: {
    flex: 1,
    marginTop: 35,
    marginHorizontal: 25,
  },
  recommendation: {
    marginTop: 40,
  },
  recomInputCont: {
    padding: 10,
    height: 120,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  recomInput: {
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  btn: {
    marginTop: 55,
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
  mh25: {
    marginHorizontal: 25,
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
    padding: 5,
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
