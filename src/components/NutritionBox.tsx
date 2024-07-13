import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/COLORS";

interface IProps {
  simple?: boolean;
}

const NutritionBox = ({ simple }: IProps) => {
  return simple ? (
    <View style={styles.sContainer}>
      <View style={styles.sTop}>
        <Text style={styles.sCalorie}>2000 ккал.</Text>
        {true && <Text style={styles.sPrice}>50.000 сум</Text>}
      </View>
      <View style={styles.sMiddle}>
        <View style={styles.sMidBox}>
          <Text style={styles.sMidText1}>20%</Text>
          <Text style={styles.sMidText2}>Белков</Text>
          <Text style={styles.sMidText3}>100гр</Text>
        </View>
        <View style={[styles.sMidBox, { marginLeft: 20 }]}>
          <Text style={styles.sMidText1}>20%</Text>
          <Text style={styles.sMidText2}>Жиров</Text>
          <Text style={styles.sMidText3}>100гр</Text>
        </View>
        <View style={[styles.sMidBox, { marginLeft: 20 }]}>
          <Text style={styles.sMidText1}>20%</Text>
          <Text style={styles.sMidText2}>Углеводов</Text>
          <Text style={styles.sMidText3}>100гр</Text>
        </View>
      </View>
      <View style={styles.sBottom}>
        <Text style={styles.sCompiled}>{`Compiled by:`}</Text>
        <Text style={styles.sName}>{"Arkadiy Novikov"}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={{ color: COLORS.WHITE }}>NutritionBox</Text>
    </View>
  );
};

export default NutritionBox;

const styles = StyleSheet.create({
  sContainer: {
    paddingVertical: 18,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  sTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sCalorie: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  sPrice: {
    marginRight: 12,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: COLORS.RED2,
  },
  sMiddle: {
    marginTop: 18,
    flexDirection: "row",
  },
  sMidBox: {
    alignItems: "center",
  },
  sMidText1: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  sMidText2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    marginTop: 3,
    color: COLORS.GREY6,
  },
  sMidText3: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "700",
    marginTop: 5,
    color: COLORS.WHITE,
  },
  sBottom: {
    marginTop: 15,
    flexDirection: "row",
  },
  sCompiled: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  sName: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400",
    marginLeft: 3,
    color: COLORS.WHITE,
  },
  container: {
    flex: 1,
  },
});
