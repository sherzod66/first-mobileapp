import { Dimensions, StyleSheet } from "react-native";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBack: {
    width: Width,
    height: Height / 1.5,
    justifyContent: "flex-end",
  },
  list: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  flag: {
    width: 30.8,
    height: 24,
    marginRight: 19,
  },
  item: {
    color: "#ffffff",
    flexDirection: "row",
    backgroundColor: "#13111A",
    marginBottom: 15,
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
