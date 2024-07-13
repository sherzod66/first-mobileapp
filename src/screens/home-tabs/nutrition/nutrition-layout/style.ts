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
  main: { flex: 1 },
  btnCont: {
    marginHorizontal: 20,
    borderRadius: 0,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  btn: {
    width: 75,
    flexShrink: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  btnText1: { fontSize: 11, lineHeight: 15 },
  btnText2: { fontSize: 11, lineHeight: 16 },
});
