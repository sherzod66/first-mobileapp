import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/COLORS";
import { Measurement } from "../types";
import { ButtonPrimary, EmptyComponent } from "./common";
import moment from "moment";

interface IProps {
  myMeasurements: Measurement[];
  onSet: (i: number, ii: number) => void;
  onSetDate: (i: number) => void;
  onAdd: () => void;
}

const MeasurementBox = ({
  myMeasurements,
  onSet,
  onSetDate,
  onAdd,
}: IProps) => {
  return !!myMeasurements.length ? (
    <View style={styles.container}>
      <View style={styles.box}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {myMeasurements.map((a, ii) => (
              <View
                key={`row-${ii}`}
                style={[styles.row, !!ii && styles.borderTop]}
              >
                <View style={styles.center}>
                  {ii === 0 ? <Text style={styles.title}>{"Дата"}</Text> : null}
                  <TouchableOpacity
                    onPress={() => onSetDate(ii)}
                    style={[
                      styles.dateCol,
                      ii === 0 && styles.radius1,
                      ii === myMeasurements.length - 1 && styles.radius3,
                    ]}
                  >
                    <Text style={styles.text}>
                      {moment(new Date(a.date)).format("DD.MM.YYYY")}
                    </Text>
                  </TouchableOpacity>
                </View>
                {a.data.map((d, i) => (
                  <View style={styles.center} key={`col-${ii}-${i}`}>
                    {ii === 0 ? (
                      <Text style={styles.title}>{d.key}</Text>
                    ) : null}
                    <TouchableOpacity
                      onPress={() => onSet(ii, i)}
                      style={[
                        styles.col,
                        ii === 0 && i === a.data.length - 1 && styles.radius2,
                        ii === myMeasurements.length - 1 &&
                          i === a.data.length - 1 &&
                          styles.radius4,
                      ]}
                    >
                      {d.value ? (
                        <Text style={styles.text}>{d.value}</Text>
                      ) : (
                        <View style={styles.line} />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <ButtonPrimary
        text="+"
        onPress={onAdd}
        style={styles.btn}
        textStyle={styles.btnText}
      />
    </View>
  ) : (
    <EmptyComponent />
  );
};

export default MeasurementBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  box: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  dateCol: {
    width: 85,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.GREY2,
  },
  col: {
    width: 55,
    height: 35,
    borderLeftWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.GREY16,
    backgroundColor: COLORS.GREY2,
  },
  line: {
    width: 30,
    height: 1,
    backgroundColor: COLORS.GREY19,
  },
  btn: {
    padding: 7,
    borderWidth: 1,
    marginLeft: 12,
    borderRadius: 40,
    paddingHorizontal: 10,
    borderColor: COLORS.GREY13,
    backgroundColor: "transparent",
    // width: 30,
    height: 31,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.GREY13,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: COLORS.GREY16,
  },
  radius1: {
    borderTopLeftRadius: 10,
  },
  radius2: {
    borderTopRightRadius: 10,
  },
  radius3: {
    borderBottomLeftRadius: 10,
  },
  radius4: {
    borderBottomRightRadius: 10,
  },
  borderTopRadius: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderColor: "red",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  borderBottomRadius: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderColor: "red",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
});
