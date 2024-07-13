import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  inputCont: {
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.GREY2,
  },
  input: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  tab1Cont: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  scrollCont: {
    marginBottom: 10,
    flexDirection: "row",
  },
  tab2Cont: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 25,
    borderColor: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  box: {
    padding: 18,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    width: 20,
    height: 20,
    padding: 2,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.GREY6,
  },
  checkboxFilled: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.RED2,
  },
  main: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    fontSize: 14,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text2: {
    marginTop: 3,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "300",
    color: COLORS.WHITE,
  },
  text3: {
    fontSize: 11,
    marginTop: 3,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text4: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text5: {
    fontSize: 13,
    lineHeight: 13,
    marginLeft: 25,
    fontWeight: "700",
    color: COLORS.RED2,
  },
  btn: {
    marginTop: 60,
    paddingVertical: 18,
    marginHorizontal: 25,
    backgroundColor: COLORS.RED,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
});
