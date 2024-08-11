import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  ButtonPrimary,
  EmptyComponent,
  Icon,
} from "../../../../../components/common";
import Modal from "./modal";
import { COLORS } from "../../../../../constants/COLORS";
import { ScheduleWorkout } from "../../../../../types";
import { Assets } from "../../../../../utils/requireAssets";
import { ScheduleWorkoutHooks } from "./hooks";
import { styles } from "./style";
import tempData from "./workout.json";

const getIsFinish = (
  scheduleWorkout: ScheduleWorkout | null,
  workoutIndex: number,
  i: number
) => {
  const repeatAndWeight: string[] = [];
  if (scheduleWorkout) {
    scheduleWorkout.plan.workouts[workoutIndex].forEach((w, iii) => {
      const { repeat, weight } =
        scheduleWorkout.results[workoutIndex][scheduleWorkout.activeWeek + i][
          iii
        ][
          scheduleWorkout.results[workoutIndex][scheduleWorkout.activeWeek + i][
            iii
          ].length - 1
        ];
      if (repeat && weight) {
        repeatAndWeight.push(`${weight}/${repeat}`);
      } else {
        repeatAndWeight.push("-");
      }
    });
  }
  const isLine = repeatAndWeight.some((item) => item.includes("-"));
  console.log(repeatAndWeight);
  if (!isLine) {
    return {
      color: COLORS.GREEN,
    };
  }
};

const ScheduleWorkoutView = () => {
  const {
    data,
    show,
    setShow,
    showModal,
    setShowModal,
    modalLoading,
    onPress,
    onHide,
    onFinish,
    i18n,
    onPressExercise,
  } = ScheduleWorkoutHooks();
  let showData = !data ? tempData : data;
  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={{ marginBottom: 100 }}>
          <Text style={styles.topTitle}>{showData.plan.title}</Text>

          {showData.plan.workouts &&
            showData.plan.workouts.length &&
            showData.plan.workouts.map((ww, ii) => (
              <View style={{ flexDirection: "row" }}>
                <View style={styles.workoutStake}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setShow((prev) => ({ ...prev, [ii]: !show[ii] }))
                    }
                  >
                    <View style={[styles.titleColumn, { marginTop: 10 }]}>
                      <Text style={styles.title}>{`Тренировка ${ii + 1}`}</Text>
                      <Icon
                        source={Assets.icons.arrow}
                        width={6}
                        height={9}
                        style={{
                          marginLeft: 8,
                          alignSelf: "center",
                          transform: [
                            { rotate: show[ii] ? "90deg" : "-90deg" },
                          ],
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {show[ii] && (
                    <>
                      {ww.map((w, i) => (
                        <TouchableOpacity
                          key={`${ii}/${w.exercise?._id}`}
                          style={[
                            styles.column,
                            styles.itemsStart,
                            !i && { borderTopWidth: 0 },
                          ]}
                          onPress={() => onPressExercise(w.exercise)}
                        >
                          <Text numberOfLines={1} style={styles.textEllipsis}>
                            {
                              w.exercise?.title[
                                i18n.language as "ru" | "en" | "uz"
                              ]
                            }
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                </View>
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
                    {new Array(4).fill(1).map((a, i) => (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          !showData.isFinished &&
                          onPress(ii, showData.activeWeek + i)
                        }
                        key={`${ii}/${showData.activeWeek + i}/s/${
                          showData.plan?._id
                        }`}
                      >
                        <View style={styles.weekStake}>
                          {!showData.isFinished && (
                            <View style={styles.titleColumn}>
                              <Text
                                style={[styles.text, getIsFinish(data, ii, i)]}
                              >{`Неделя ${showData.activeWeek + i + 1}`}</Text>
                            </View>
                          )}
                          {show[ii] && (
                            <>
                              {showData.plan.workouts[ii].map((w, iii) => {
                                //console.log(w);
                                let str = "-";
                                //console.log(JSON.stringify(showData, null, 4));
                                if (showData.isFinished) {
                                  return null;
                                }
                                const { repeat, weight } =
                                  showData.results[ii][showData.activeWeek + i][
                                    iii
                                  ][
                                    showData.results[ii][
                                      showData.activeWeek + i
                                    ][iii].length - 1
                                  ];
                                if (weight && repeat) {
                                  str = `${weight}/${repeat}`;
                                }

                                return (
                                  <View
                                    style={[
                                      styles.column,
                                      !iii && { borderTopWidth: 0 },
                                    ]}
                                    key={`${ii}/${
                                      showData.activeWeek + i
                                    }/${iii}/${w.exercise?._id}}`}
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
              </View>
            ))}

          {/* {!!data && (
            <View style={styles.btnRow}>
              <ScrollView horizontal>
                {new Array(Math.round(showData.plan.week / 4))
                  .fill(1)
                  .map((a, i) => (
                    <ButtonPrimary
                      key={`btn-${i}`}
                      textStyle={
                        showData.activeWeek === i * 4
                          ? styles.btnText2
                          : styles.btnText1
                      }
                      text={`Неделя ${i * 4 + 1}-${i * 4 + 4}`}
                      style={
                        !!!i ? styles.btn1 : { ...styles.btn1, ...styles.ml8 }
                      }
                    />
                  ))}
              </ScrollView>
            </View>
          )}

          {!!data && (
            <ButtonPrimary
              multiline
              style={styles.btn2}
              text="Статус выполнения"
              textStyle={styles.btnText3}
              onPress={() => setShowModal(true)}
            />
          )} */}
          {!data ? <EmptyComponent /> : <></>}
        </ScrollView>
      </View>

      <Modal
        show={showModal}
        loading={modalLoading}
        onHide={onHide}
        onPress={onFinish}
      />
    </View>
  );
};

export default ScheduleWorkoutView;
