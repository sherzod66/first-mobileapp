import { COLORS } from "./../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  text: {
    color: COLORS.GREY4,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.WHITE,
    marginHorizontal: 20,
    marginVertical: 15,
    fontWeight: "bold",
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
