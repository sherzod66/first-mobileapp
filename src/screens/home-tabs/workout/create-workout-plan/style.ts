import { COLORS } from "./../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
  },
  inputInner: {
    backgroundColor: COLORS.GREY3,
    color: COLORS.WHITE,
  },
  inputTopText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  descriptionBox: {
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: COLORS.GREY6,
    fontSize: 12,
    fontWeight: "400",
  },
  button: {
    marginTop: 5,
    borderRadius: 10,
    paddingVertical: 18,
    backgroundColor: COLORS.BLACK,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    marginBottom: 10,
  },
  greenButton: {
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 18,
    backgroundColor: COLORS.GREEN2,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 10,
  },
  box: {
    height: 55,
    marginBottom: 10,
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  inputMultiline: {
    backgroundColor: COLORS.GREY3,
    borderRadius: 10,
    height: 130,
    marginBottom: 30,
  },
  saveBtn: {
    marginTop: 40,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 18,
    backgroundColor: COLORS.RED,
  },
  saveBtnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
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
});
