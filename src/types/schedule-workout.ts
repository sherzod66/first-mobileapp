import { WorkoutPlan, BaseData } from ".";

export type ScheduleWorkout = BaseData & {
  isFinished: boolean;
  activeWeek: number;
  plan: WorkoutPlan;
  results: ExerciseResult[][][][]; // [0] group workout | [1] week | [2] workout | [3] approach
};

export type ExerciseResult = {
  weight: number;
  repeat: number;
  made: boolean;
};
