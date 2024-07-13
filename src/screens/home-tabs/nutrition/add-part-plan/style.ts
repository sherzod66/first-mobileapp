import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  row: {
    marginTop: 25,
    flexDirection: "row",
    marginHorizontal: 25,
    justifyContent: "space-between",
  },
  row1: {
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
    backgroundColor: COLORS.GREY2,
  },
  box2: {
    width: 50,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  buttons: {
    marginTop: 13,
    marginHorizontal: 25,
  },
  btn1: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    borderColor: COLORS.WHITE,
    backgroundColor: "transparent",
  },
  btn2: {
    marginTop: 8,
    paddingVertical: 20,
    backgroundColor: COLORS.GREEN2,
  },
  btn3: {
    marginTop: 50,
    borderWidth: 1,
    paddingVertical: 14,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    borderColor: COLORS.RED,
    // borderColor: COLORS.GREY6,
    backgroundColor: "transparent",
  },
  btn4: {
    marginTop: 60,
    paddingVertical: 18,
    marginHorizontal: 20,
    backgroundColor: COLORS.RED,
  },
  mt7: {
    marginTop: 7,
  },
  mh25: {
    marginHorizontal: 25,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text1: {
    fontSize: 14,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.RED,
    // color: COLORS.GREY6,
    textAlign: "center",
  },
  text3: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  bgGrey: {
    backgroundColor: COLORS.GREY17,
  },
  borderGrey: {
    borderColor: COLORS.GREY6,
  },
  textGrey: {
    color: COLORS.GREY6,
  },
});
