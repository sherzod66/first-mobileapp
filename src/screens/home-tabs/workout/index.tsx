import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkoutLayout from "./workout-layout";
import WorkoutResults from "./workout-results";
import CreateWorkoutPlan from "./create-workout-plan";
import AddWorkouts from "./add-workouts";
import WorkoutExercises from "./exercises";
import WorkoutExercise from "./exercise";
import WorkoutPlanScreen from "./workout-plan";

import { WORKOUT } from "../../../navigation/ROUTES";
import {
  Exercise,
  ScheduleWorkout,
  Workout,
  WorkoutPlan,
} from "../../../types";

export type WorkoutStackParamList = {
  [WORKOUT.WORKOUT_LAYOUT]: undefined;
  [WORKOUT.WORKOUT_RESULTS]: {
    schedule: ScheduleWorkout;
    workoutIndex: number;
    weekIndex: number;
  };
  [WORKOUT.CREATE_WORKOUT_PLAN]: undefined;
  [WORKOUT.ADD_WORKOUTS]: {
    index: number;
    defaultWorkouts: Workout[];
  };
  [WORKOUT.EXERCISES]: {
    defaultWorkouts: Workout[];
    defaultExercises: Exercise[];
  };
  [WORKOUT.EXERCISE]: {
    exercise: Exercise;
  };
  [WORKOUT.WORKOUT_PLAN]: {
    workoutPlan: WorkoutPlan;
  };
};

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WORKOUT.WORKOUT_LAYOUT}
        component={WorkoutLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.WORKOUT_RESULTS}
        component={WorkoutResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.CREATE_WORKOUT_PLAN}
        component={CreateWorkoutPlan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.ADD_WORKOUTS}
        component={AddWorkouts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.EXERCISES}
        component={WorkoutExercises}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.EXERCISE}
        component={WorkoutExercise}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={WORKOUT.WORKOUT_PLAN}
        component={WorkoutPlanScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutStack;
