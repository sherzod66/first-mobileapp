import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../constants/COLORS";
import { ROUTES, WORKOUT } from "../navigation/ROUTES";
import { ScheduleWorkout, Workout } from "../types";
import { Assets } from "../utils/requireAssets";
import { Icon } from "./common";

interface Props {
  data: ScheduleWorkout;
}

const ScheduleWorkoutComponent = ({ data }: Props) => {
  // const { plan, results } = schedule ?? {};
  const { plan, results } = data;

  const [show, setShow] = useState<any>({});

  const navigation = useNavigation();

  const onPress = (workoutIndex: number, weekIndex: number) => {
    // @ts-ignore
    navigation.navigate(WORKOUT.WORKOUT_RESULTS, {
      schedule: data,
      workoutIndex,
      weekIndex,
    });
  };

  return plan ? (
    <View style={styles.container}>
      <Text style={styles.topTitle}>{plan.title}</Text>

      {plan.workouts &&
        plan.workouts.length &&
        plan.workouts.map((ww, ii) => (
          <ScrollView
            key={ii}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={[
                styles.main,
                !show[ii] && {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <View style={styles.workoutStake}>
                <TouchableWithoutFeedback
                  onPress={() => setShow({ [ii]: !show[ii] })}
                >
                  <View style={styles.titleColumn}>
                    <Text style={styles.title}>{`Тренировка ${ii + 1}`}</Text>
                    <Icon
                      source={Assets.icons.arrow}
                      width={6}
                      height={9}
                      style={{
                        marginLeft: 8,
                        alignSelf: "center",
                        transform: [{ rotate: show[ii] ? "90deg" : "-90deg" }],
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
                {show[ii] && (
                  <>
                    {ww.map((w, i) => (
                      <View
                        key={`${ii}/${w.exercise._id}`}
                        style={[
                          styles.column,
                          styles.itemsStart,
                          !i && { borderTopWidth: 0 },
                        ]}
                      >
                        <Text style={styles.text2}>{w.exercise.title}</Text>
                      </View>
                    ))}
                  </>
                )}
              </View>

              <View style={styles.setsStake}>
                <View style={styles.titleColumn}>
                  <Text style={[styles.text, { color: COLORS.GREEN2 }]}>
                    {"Сеты"}
                  </Text>
                </View>
                {show[ii] && (
                  <>
                    {ww.map((w: Workout, i) => (
                      <View
                        key={`${ii}/${i}/${w.exercise._id}`}
                        style={[styles.column, !i && { borderTopWidth: 0 }]}
                      >
                        <Text style={[styles.text2, { color: COLORS.GREY11 }]}>
                          {`${w.approach}x${w.repetitions}`}
                        </Text>
                      </View>
                    ))}
                  </>
                )}
              </View>

              {new Array(plan.week).fill(1).map((a, i) => (
                <TouchableWithoutFeedback
                  key={`${ii}/${i}/s/${plan._id}`}
                  onPress={() => onPress(ii, i)}
                >
                  <View
                    style={[
                      styles.weekStake,
                      !i && { backgroundColor: "aqua" },
                    ]}
                  >
                    <View style={styles.titleColumn}>
                      <Text style={styles.text}>{`Неделя ${i + 1}`}</Text>
                    </View>
                    {show[ii] && (
                      <>
                        {plan.workouts[0].map((w, iii) => {
                          let str = "-";

                          if (results) {
                            const approachLength = results[ii][i][iii].length;
                            const { repeat, weight } =
                              results[ii][i][iii][approachLength - 1];
                            if (weight && repeat) {
                              str = `${weight}/${repeat}`;
                            }
                          }

                          return (
                            <View
                              key={`${ii}/${i}/${iii}/${w.exercise._id}}`}
                              style={[
                                styles.column,
                                !iii && { borderTopWidth: 0 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.text2,
                                  {
                                    color:
                                      str === "-"
                                        ? COLORS.GREY11
                                        : COLORS.WHITE,
                                  },
                                ]}
                              >
                                {str}
                              </Text>
                            </View>
                          );
                        })}
                      </>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>
        ))}
    </View>
  ) : (
    <View />
  );
};

export default ScheduleWorkoutComponent;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: COLORS.GREEN,
  },
  topTitle: {
    fontSize: 17,
    marginTop: 20,
    lineHeight: 23,
    marginBottom: 10,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  main: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    flexDirection: "row",
  },
  header: {},
  workoutStake: {},
  setsStake: {
    borderLeftWidth: 1,
    borderColor: COLORS.GREY10,
  },
  weekStake: {
    borderLeftWidth: 1,
    borderColor: COLORS.GREY10,
  },
  titleColumn: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.GREY3,
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  column: {
    height: 40,
    backgroundColor: COLORS.GREY9,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.GREY10,
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  text2: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLORS.GREY10,
  },
});
