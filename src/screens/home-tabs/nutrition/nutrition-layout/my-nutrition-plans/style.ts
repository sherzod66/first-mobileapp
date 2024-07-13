import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  btnCont: {
    marginVertical: 20,
    justifyContent: "center",
  },
  box: {
    padding: 23,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  main: {
    marginTop: 25,
    flexDirection: "row",
  },
  btn: {
    marginTop: 25,
    paddingVertical: 17,
    marginHorizontal: 25,
    backgroundColor: COLORS.RED2,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  center: {
    alignItems: "center",
  },
  ml20: {
    marginLeft: 20,
  },
  mt8: {
    marginTop: 8,
  },
  text1: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.GREY6,
  },
  text3: {
    fontSize: 13,
    marginTop: 3,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
  },
});
