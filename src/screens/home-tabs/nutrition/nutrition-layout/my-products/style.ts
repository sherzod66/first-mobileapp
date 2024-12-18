import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
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
  textMy: {
    fontSize: 14,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
    marginLeft: 10,
  },
  scrollCont: {
    margin: 25,
    flexDirection: "row",
  },
  tabCont: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  greenText: {
    fontSize: 12,
    lineHeight: 16,
    marginRight: 10,
    fontWeight: "600",
    color: COLORS.GREEN2,
  },
  greenLine: {
    height: 2,
    width: "70%",
    marginTop: 4,
    marginRight: 4,
    alignSelf: "center",
    backgroundColor: COLORS.GREEN2,
  },
  button: {
    // marginTop: 15,
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
  deleteBtn: {
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  editBtn: {
    margin: 0,
    padding: 0,
    marginTop: 10,
    color: COLORS.RED,
    fontSize: 12,
  },
  deleteBtnText: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.RED,
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
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 25,
    backgroundColor: COLORS.RED,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .55)",
  },
  modalBox: {
    borderRadius: 10,
    paddingVertical: 32,
    paddingHorizontal: 22,
    backgroundColor: COLORS.GREY2,
  },
  modalTitle: {
    fontSize: 21,
    lineHeight: 25,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.WHITE,
  },
  modalText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  modalText33: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
    marginTop: 10,
  },
  modalInputCont: {
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: COLORS.GREY12,
  },
  modalTextCont: {
    marginTop: 15,
    borderRadius: 10,
    paddingTop: 14,
    paddingLeft: 20,
    backgroundColor: COLORS.GREY12,
    color: COLORS.WHITE,
    width: 100,
    height: 50,
  },
  modalInputCont1: {
    width: 100,
    height: 50,
  },
  modalInputCont2: {
    width: 100,
    height: 50,
    padding: 0,
  },
  modalInput: {
    marginRight: 0,
    color: COLORS.WHITE,
    textAlign: "center",
    backgroundColor: "transparent",
  },
  modalInputRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalInputCol: {
    alignItems: "center",
  },
  modalBtnRow: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalBtn1: {
    width: 120,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  modalBtnText1: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  modalBtn2: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    backgroundColor: COLORS.RED,
  },
  modalBtnText2: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  modalMiniText: {
    fontSize: 10,
    marginTop: 20,
    lineHeight: 13,
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.GREY14,
  },
  text: {
    color: COLORS.WHITE,
  },
});
