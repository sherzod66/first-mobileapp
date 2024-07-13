import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/COLORS";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY,
    marginHorizontal: 20,
    paddingBottom: 15,
  },
  profileNameBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtnBox: {},
  profileImageBox: {},
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.WHITE,
    // testID: "center",
  },
  profileId: {
    fontSize: 16,
    fontWeight: "300",
    color: COLORS.WHITE,
    marginTop: 5,
    textAlign: "center",
  },
  profileBtn: {
    width: 90,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.YELLOW,
    borderRadius: 5,
  },
  profileBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btnCont: {
    marginVertical: 20,
    marginHorizontal: 25,
    justifyContent: "center",
  },
  profileBorder: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  titleBtn: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.RED,
  },
  box: {
    padding: 23,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  main: {
    marginTop: 25,
    flexDirection: "row",
  },
  btn: {
    marginTop: 25,
    paddingVertical: 17,
    marginHorizontal: 25,
    backgroundColor: COLORS.RED2,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  center: {
    alignItems: "center",
  },
  ml20: {
    marginLeft: 20,
  },
  mt8: {
    marginTop: 8,
  },
  text1: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 5,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  text3: {
    fontSize: 13,
    marginTop: 3,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
  },
});
