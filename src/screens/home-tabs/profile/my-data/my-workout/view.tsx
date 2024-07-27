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
import { Workout } from "../../../../../types";
import { Assets } from "../../../../../utils/requireAssets";
import { MyWorkoutHooks } from "./hooks";
import { styles } from "./style";

const MyWorkoutView = ({ apprenticeId = "" }) => {
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
    exercisePress,
  } = MyWorkoutHooks(apprenticeId);

  return (
    <View style={styles.container}>
      {!!!data ? (
        <EmptyComponent />
      ) : (
        <View>
          <Text style={styles.topTitle}>{data.plan.title}</Text>

          {data.plan.workouts &&
            data.plan.workouts.length &&
            data.plan.workouts.map((ww, ii) => (
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
                        <Text style={styles.title}>{`Тренировка ${
                          ii + 1
                        }`}</Text>
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
                            onPress={() => exercisePress(w.exercise)}
                            key={`${ii}/${w.exercise?._id}`}
                            style={[
                              styles.column,
                              styles.itemsStart,
                              !i && { borderTopWidth: 0 },
                            ]}
                          >
                            <Text style={styles.text2}>
                              {w.exercise?.title[i18n.language as "ru"]}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </>
                    )}
                  </View>

                  {new Array(4).fill(1).map((a, i) => (
                    <TouchableWithoutFeedback
                      onPress={() => onPress(ii, data.activeWeek + i)}
                      key={`${ii}/${data.activeWeek + i}/s/${data.plan._id}`}
                    >
                      <View style={styles.weekStake}>
                        <View style={styles.titleColumn}>
                          <Text style={styles.text}>{`Неделя ${
                            data.activeWeek + i + 1
                          }`}</Text>
                        </View>
                        {show[ii] && (
                          <>
                            {data.plan.workouts[ii].map((w, iii) => {
                              let str = "-";

                              const { repeat, weight } =
                                data.results[ii][data.activeWeek + i][iii][
                                  data.results[ii][data.activeWeek + i][iii]
                                    .length - 1
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
                                  key={`${ii}/${data.activeWeek + i}/${iii}/${
                                    w.exercise?._id
                                  }}`}
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

          <View style={styles.btnRow}>
            {/* <ScrollView horizontal>
              {new Array(Math.round(data.plan?.week / 4)).fill(1).map((a, i) => (
                <ButtonPrimary
                  key={`btn-${i}`}
                  textStyle={
                    data.activeWeek === i * 4
                      ? styles.btnText2
                      : styles.btnText1
                  }
                  text={`Неделя ${i * 4 + 1}-${i * 4 + 4}`}
                  style={!!!i ? styles.btn1 : { ...styles.btn1, ...styles.ml8 }}
                />
              ))}
            </ScrollView> */}
          </View>

          <ButtonPrimary
            multiline
            style={styles.btn2}
            text="Статус выполнения"
            textStyle={styles.btnText3}
            onPress={() => setShowModal(true)}
          />
        </View>
      )}

      <Modal
        show={showModal}
        loading={modalLoading}
        onHide={onHide}
        onPress={onFinish}
      />
    </View>
  );
};

export default MyWorkoutView;
