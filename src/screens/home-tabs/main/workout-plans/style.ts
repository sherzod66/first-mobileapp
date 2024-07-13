import { COLORS } from "./../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  header: { marginHorizontal: 20, marginBottom: 20 },
  text: {
    color: COLORS.GREY4,
    marginHorizontal: 25,
    textAlign: "center",
  },
  main: { marginHorizontal: 20, marginBottom: 30 },
  buttonCont: { marginBottom: 90, marginHorizontal: 20 },
  button: {
    borderRadius: 10,
    paddingVertical: 18,
    backgroundColor: COLORS.RED,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
  },
  levelBtnCont: {
    marginVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginLeft: 90,
  },
  genderBtnCont: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});
