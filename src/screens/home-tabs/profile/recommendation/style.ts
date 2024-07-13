import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: COLORS.BLACK,
  },
  text: {
    fontSize: 12,
    marginTop: 20,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
});
