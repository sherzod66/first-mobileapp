import { COLORS } from "../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
  },
  text: {
    color: COLORS.GREY4,
    marginRight: 20,
    marginVertical: 5,
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
});
