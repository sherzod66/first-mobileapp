import { View, Text } from "react-native";
import { ButtonPrimary, Header } from "../../../../components/common";
import { WorkoutPlanHooks } from "./hooks";
import { styles } from "./style";

const WorkoutPlanView = () => {
  const { workoutPlan, onPress, loading, disabled } = WorkoutPlanHooks();

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <Header title={workoutPlan.title} />
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text style={styles.text}>{workoutPlan.description}</Text>
        </View>

        <View style={{ marginHorizontal: 30, marginBottom: 90 }}>
          <ButtonPrimary
            fill
            onPress={onPress}
            loading={loading}
            disabled={disabled}
            style={styles.button}
            textStyle={styles.buttonText}
            text={"Добавить в “ Мои программы ”"}
          />
        </View>
      </View>
    </View>
  );
};

export default WorkoutPlanView;
