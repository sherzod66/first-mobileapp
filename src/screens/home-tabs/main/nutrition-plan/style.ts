import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, backgroundColor: COLORS.BLACK },
  text: {
    color: COLORS.GREY4,
    marginTop: 20,
  },
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
});
