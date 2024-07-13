import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingVertical: 20,
    // justifyContent: "center",
  },
  inputCont: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  input: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.GREY2,
  },
  textOne: { fontSize: 12, fontWeight: "600", color: COLORS.WHITE },
});
