import { COLORS } from "./../../../../constants/COLORS";
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
  textRole: {
    color: COLORS.GREY4,
    marginRight: 20,
    marginTop: 10,
  },
  animated: {
    flexDirection: "row",
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  topColumn: {
    backgroundColor: COLORS.GREY,
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
  },
  textOne: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  animatedOne: {
    backgroundColor: COLORS.GREY2,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  btnLanguage: {
    marginVertical: 10,
  },
});
