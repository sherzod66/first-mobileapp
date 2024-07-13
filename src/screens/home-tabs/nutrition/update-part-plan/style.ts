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
  scroll: {
    flex: 1,
    marginTop: 12,
    // marginHorizontal: 25,
  },
  scrollBox: {},
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
  },
  headerBox: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderColor: COLORS.WHITE,
  },
  main: {
    marginVertical: 10,
    paddingHorizontal: 32,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputCont: {
    padding: 0,
    width: 60,
    paddingVertical: 2,
    paddingHorizontal: 7,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.RED,
    // width:
  },
  input: {
    marginRight: 0,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "transparent",
  },
  line: {
    height: 1,
    backgroundColor: COLORS.GREY16,
  },
  btn: {
    marginTop: 40,
    paddingVertical: 18,
    marginHorizontal: 20,
    backgroundColor: COLORS.RED,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  mh25: {
    marginHorizontal: 25,
  },
  mt5: {
    marginTop: 5,
  },
  text1: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text3: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.GREY14,
  },
  text4: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
  },
  bgGrey: {
    backgroundColor: COLORS.GREY17,
  },
});
