import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 18,
    marginHorizontal: 20,
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderStyle: "dashed",
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
  },
  saveBtn: {
    borderRadius: 10,
    marginBottom: 70,
    paddingVertical: 18,
    backgroundColor: COLORS.RED,
  },
  saveBtnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  main: {
    marginTop: 20,
    flexDirection: "row",
  },
  mainLeft: {
    justifyContent: "space-around",
  },
  mainRight: {
    flex: 1,
    marginLeft: 16,
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
    width: 150,
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btnStyle: {
    marginLeft: 20,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderColor: COLORS.RED2,
  },
  btnTextStyle: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.RED2,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox: {
    padding: 25,
    paddingTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalMain: {
    marginTop: 6,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  modalLeft: {
    flex: 1,
    alignItems: "center",
  },
  modalRight: {
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
  },
  modalInputCont: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY12,
  },
  modalInput: {
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  modalError: {
    marginTop: 20,
    color: COLORS.RED2,
  },
  modalBtnText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: COLORS.RED2,
  },
});
