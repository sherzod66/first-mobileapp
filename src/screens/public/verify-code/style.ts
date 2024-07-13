import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },

  header: {},
  main: {
    marginVertical: 30,
    flexDirection: "row",
    marginHorizontal: 50,
    justifyContent: "space-between",
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E9EF",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
    backgroundColor: COLORS.GREY,
    color: COLORS.WHITE,
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.WHITE,
    textAlign: "center",
    marginBottom: 10,
  },
  textOne: {
    fontSize: 15.5,
    fontWeight: "400",
    color: COLORS.WHITE,
    textAlign: "center",
  },
  textTwo: {
    fontSize: 14.5,
    fontWeight: "600",
    color: COLORS.WHITE,
    textAlign: "center",
  },
  row: {
    marginTop: 6,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "center",
  },
  text2: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text3: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  line: {
    marginHorizontal: 0,
    backgroundColor: COLORS.WHITE,
  },
  btn: {
    borderBottomWidth: 1,
    borderColor: COLORS.WHITE,
    marginHorizontal: 20,
  },
  footerBox: {
    flexDirection: "row",
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    width: 140,
    marginLeft: 10,
    alignItems: "center",
  },
});
