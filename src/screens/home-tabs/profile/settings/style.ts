import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
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
  animatedOne: {
    backgroundColor: COLORS.GREY2,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  textOne: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btnLanguage: {
    marginVertical: 10,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  activeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
});
