import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.BLACK,
  },
  scrollCont: {
    flex: 1,
  },
  compositionRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compositionCol: {
    alignItems: "center",
  },
  compositionTitle: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  compositionBox: {
    marginTop: 12,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.GREY2,
  },
  compositionBox1: {
    padding: 12,
    paddingHorizontal: 10,
  },
  compositionBox2: {
    padding: 12,
    paddingHorizontal: 6,
  },
  compositionLine: {
    width: 1,
    height: "100%",
    backgroundColor: COLORS.GREY16,
  },
  compositionText1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  compositionText2: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: COLORS.WHITE,
    marginTop: 20,
  },
  calories: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.WHITE,
    marginTop: 20,
  },
  planTabsCont: {
    marginTop: 28,
    marginHorizontal: 10,
    alignItems: "center",
  },
  planTabs: {
    backgroundColor: "transparent",
  },
  planTabsBtn: {
    paddingTop: 4,
    paddingBottom: 8,
    // paddingHorizontal: 12,
  },
  planTabsText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  receptTabsCont: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  receptTabs: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  receptTabsBtn: {},
  receptTabsText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  main: {
    marginTop: 25,
    paddingTop: 14,
    paddingLeft: 16,
    paddingRight: 26,
    paddingBottom: 17,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  row: {
    marginTop: 11,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sum: {
    marginTop: 17,
    alignItems: "center",
  },
  text1: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.RED,
  },
  text3: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  btn: {
    marginTop: 26,
    borderWidth: 1,
    paddingVertical: 18,
    marginHorizontal: 20,
    borderColor: COLORS.RED,
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.RED,
  },
  recommendation: {
    padding: 15,
    height: 120,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  mt26: {
    marginTop: 26,
    marginBottom: 26,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
    textAlign: "justify",
  },
  button: {
    borderRadius: 10,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: COLORS.RED,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
  },
});
