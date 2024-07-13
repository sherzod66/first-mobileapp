import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: COLORS.BLACK,
  },
  mid: {
    marginTop: 25,
    flexDirection: "row",
  },
  left: {
    alignItems: "center",
  },
  inputCont: {
    width: 100,
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  input: {
    color: COLORS.WHITE,
    backgroundColor: "transparent",
    textAlign: "center",
  },
  right: {
    marginLeft: 30,
    alignItems: "center",
  },
  rightRow: {
    flex: 1,
    marginTop: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  inActiveBtn: {
    borderColor: COLORS.GREY8,
  },
  inActiveBtnText: {
    color: COLORS.GREY8,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
  },
  checkbox: {
    width: 16,
    height: 16,
    padding: 2,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 11,
    borderColor: COLORS.WHITE,
  },
  checkboxFilled: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.GREY8,
  },
  result: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: COLORS.GREY2,
    marginHorizontal: 40,
  },
  ml15: {
    marginLeft: 15,
  },
  title: {
    fontSize: 21,
    lineHeight: 25,
    marginRight: 70,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  title1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  title2: {
    fontSize: 16,
    marginTop: 25,
    lineHeight: 22,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  title3: {
    fontSize: 16,
    // marginTop: 40,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.WHITE,
  },
  text1: {
    fontSize: 12,
    marginTop: 20,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text3: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.GREY8,
  },
  text: {
    color: COLORS.WHITE,
  },
});
