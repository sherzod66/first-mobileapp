import { COLORS } from "../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
  },
  favoriteBtnCont: { justifyContent: "center" },
  categoryBtnCont: {
    marginTop: 15,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  subCategoryBtnCont: {
    marginVertical: 15,
    marginHorizontal: 40,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 18,
    marginHorizontal: 15,
    backgroundColor: COLORS.RED,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 15,
  },
});
