import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  text: {
    color: COLORS.WHITE,
  },
  main: { flex: 1, marginHorizontal: 30 },
  btnCont: {
    marginHorizontal: 30,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  btn: {
    width: 94,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 9,
    lineHeight: 14,
  },
});
