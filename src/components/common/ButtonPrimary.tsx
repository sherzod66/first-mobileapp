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

interface IProps {
  text?: string;
  loading?: boolean;
  multiline?: boolean;
  loadingColor?: string;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  icon?: Element | null;
}

const ButtonPrimary = ({
  style,
  fill,
  textStyle,
  text,
  loading,
  multiline,
  loadingColor = COLORS.RED,
  onPress = () => {},
  disabled,
  icon = null,
}: IProps) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          !fill && { alignSelf: "flex-start" },
          disabled && { backgroundColor: COLORS.GREY3 },
        ]}
      >
        <>
          {icon && icon}
          {icon ? null : loading ? (
            <ActivityIndicator size={"small"} color={loadingColor} />
          ) : (
            <Text
              numberOfLines={multiline ? undefined : 1}
              style={[styles.text, textStyle, disabled && { opacity: 0.25 }]}
            >
              {text}
            </Text>
          )}
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
