import { COLORS } from "./../../../../constants/COLORS";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerRight: {
    justifyContent: "space-between",
    paddingVertical: 10,
    flex: 1,
    paddingRight: 20,
  },
  textName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  textOld: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.WHITE,
    marginTop: 5,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 20,
    borderRadius: 120,
  },
  about: {
    height: 45,
    backgroundColor: COLORS.GREY2,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
  },
  aboutText: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
  textCart: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.WHITE,
    marginVertical: 5,
  },
  aboutView: {
    backgroundColor: COLORS.GREY2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
});
