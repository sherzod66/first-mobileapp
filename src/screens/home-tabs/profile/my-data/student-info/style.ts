import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollCont: {
    marginTop: 18,
  },
  tabsCont: {
    marginHorizontal: 25,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  dateRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 17,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  recommendation: {
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: COLORS.WHITE,
  },
  recommendationText: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
    textAlign: "center",
    textAlignVertical: "center",
  },
  weekRow: {
    marginTop: 18,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekItem: {
    width: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    // borderColor: COLORS.WHITE,
    borderColor: COLORS.GREY6,
  },
  weekText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    // color: COLORS.WHITE,
    color: COLORS.GREY6,
  },
  calendar: {
    marginTop: 17,
    marginHorizontal: 20,
  },
  row: {
    margin: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row1: {
    paddingTop: 8,
    marginBottom: 20,
    paddingBottom: 12,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  box: {
    alignItems: "center",
    justifyContent: "space-between",
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
  col2: {
    height: 50,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  mt2: {
    marginTop: 2,
  },
  mh20: {
    marginHorizontal: 20,
  },
  borderNone: {
    borderWidth: 0,
  },
  bgGrey: {
    backgroundColor: COLORS.GREY17,
  },
  borderWhite: { borderColor: COLORS.WHITE },
  textWhite: { color: COLORS.WHITE },
  borderYellow: {
    borderColor: COLORS.YELLOW3,
  },
  textYellow: {
    color: COLORS.YELLOW3,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
});
