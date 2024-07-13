import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants/COLORS";
import { FC } from "react";

interface IProps {
  text?: string;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonPrimary: FC<IProps> = ({ style, fill, textStyle, text }) => {
  return (
    <TouchableOpacity>
      <View
        style={[styles.container, style, !fill && { alignSelf: "flex-start" }]}
      >
        <>
          <Text style={[styles.text, textStyle && { opacity: 0.25 }]}>
            {text}
          </Text>
        </>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.BLACK,
  },
});

// Welcome
// SignIn
// SignUp
// Trainer
// NutritionPlans
// WorkoutPlans
// WorkoutPlan
// Payment
// WorkoutResults
// MyWorkoutPlans
// CreateWorkoutPlan
// AddWorkout
// MyExercises
