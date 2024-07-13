import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  header: { marginHorizontal: 20, marginBottom: 20 },
  categoryBtnCont: {
    marginHorizontal: 25,
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  subCategoryBtnCont: {
    marginVertical: 20,
    marginHorizontal: 60,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  main: { marginHorizontal: 15, marginBottom: 110 },
  createButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
});
