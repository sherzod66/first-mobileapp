import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: COLORS.BLACK,
  },
  text: {
    fontSize: 12,
    marginTop: 20,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  containerMy: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: COLORS.GREY3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  scrollCont: {
    margin: 30,
    flexDirection: "row",
  },
  tabCont: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
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
  textMy: {
    fontSize: 14,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
    marginLeft: 10,
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
    paddingVertical: 18,
    backgroundColor: COLORS.RED,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
