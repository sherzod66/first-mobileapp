import {
  BaseUser,
  Measurement,
  Trainer,
  Exercise,
  WorkoutPlan,
  ScheduleWorkout,
  Product,
  Dish,
  NutritionPlan,
  SchemaNutrition,
} from ".";

export type User = BaseUser & {
  isProAccount: boolean;
  myTrainers: Trainer[];
  favoriteExercises: Exercise[];
  workoutPlans: WorkoutPlan[];
  scheduleWorkouts: ScheduleWorkout[];
  products: Product[];
  dishes: Dish[];
  nutritionPlans: NutritionPlan[];
  schemaNutritions: SchemaNutrition[];
  myMeasurements: Measurement[];
};
