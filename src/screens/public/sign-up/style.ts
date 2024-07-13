import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  footerContainer: {
    height: "30%",
    justifyContent: "flex-end",
    paddingBottom: 30,
    alignItems: "center",
  },
  headerContainer: {
    height: "70%",
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    color: COLORS.GREY,
    fontSize: 14,
    fontWeight: "400",
    marginVertical: 25,
  },
  textHeader: {
    color: COLORS.WHITE,
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  btn: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: 17,
    fontWeight: "500",
  },
  textFooter: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.WHITE,
    marginVertical: 10,
  },

  textOne: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.WHITE,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    // width: "30%",
    // justifyContent: "space-around",
  },
});
