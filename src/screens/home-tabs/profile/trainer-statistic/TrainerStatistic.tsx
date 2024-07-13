import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ButtonTabs, Header } from "../../../../components/common";
import { styles } from "./style";
import { useTrainerStatistic } from "./useTrainerStatistic";
import { formatPrice } from "../../../../utils/formatPrice";

const TrainerStatistic = () => {
  const { user, activeTab, setActiveTab } = useTrainerStatistic();
  return (
    <View style={styles.container}>
      <Header title="Статистика" />
      <ButtonTabs
        primary
        active={activeTab}
        setActive={setActiveTab}
        containerStyle={styles.btnCont}
        titles={["Планы тренировок", "Планы питания"]}
        scroll={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab
          ? user?.nutritionPlans.map((nutrition, i) => (
              <TouchableOpacity key={i}>
                <View style={[styles.box, !!i && styles.mt8]}>
                  <Text style={styles.title}>{nutrition.title}</Text>
                  <View style={styles.main}>
                    <View style={styles.center}>
                      <Text style={styles.text2}>{"Используют: "}</Text>
                      <Text style={styles.text3}>{nutrition.users.length}</Text>
                    </View>
                    <View style={[styles.center, styles.ml20]}>
                      <Text style={styles.text2}>{"Прибыли: "}</Text>
                      <Text style={styles.text3}>
                        {formatPrice(nutrition.price * nutrition.users.length)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.title, { textAlign: "right" }]}>
                    {nutrition.price
                      ? `${formatPrice(nutrition.price)} UZS`
                      : "Бесплатно"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          : user?.workoutPlans.map((workout, i) => (
              <TouchableOpacity key={i}>
                <View style={[styles.box, !!i && styles.mt8]}>
                  <Text style={styles.title}>{workout.title}</Text>
                  <View style={styles.main}>
                    <View style={styles.center}>
                      <Text style={styles.text2}>{"Используют: "}</Text>
                      <Text style={styles.text3}>{workout.users.length}</Text>
                    </View>
                    <View style={[styles.center, styles.ml20]}>
                      <Text style={styles.text2}>{"Заработано: "}</Text>
                      <Text style={styles.text3}>
                        {formatPrice(workout.price * workout.users.length)} UZS
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.title, { textAlign: "right" }]}>
                    {workout.price
                      ? `${formatPrice(workout.price)} UZS`
                      : "Бесплатно"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

export default TrainerStatistic;
