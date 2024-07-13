import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 30,
    backgroundColor: COLORS.BLACK,
  },
  title: {
    fontSize: 21,
    lineHeight: 25,
    marginBottom: 10,
    fontWeight: "700",
    color: COLORS.WHITE,
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
  box: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
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
  col3: {
    height: 50,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  mt7: {
    marginTop: 7,
  },
  mh20: {
    marginHorizontal: 20,
    // flexDirection: "row",
    // justifyContent: "center",
  },
  bgGrey: {
    backgroundColor: COLORS.GREY17,
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
    padding: 0,
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
