import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  videoContainer: {
    backgroundColor: COLORS.GREY,
    height: 213,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  text: {
    color: COLORS.GREY4,
    marginVertical: 10,
    textAlign: "center",
    marginHorizontal: 25,
  },
});
