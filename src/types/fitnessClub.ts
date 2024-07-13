import { BaseUser, GENDER, User, WorkoutPlan } from ".";

export type FitnessClub = BaseUser & {
  age: number;
  email: string;
  city: string;
  avatar: string;
  experience: number;
  aboutMe: string;
  telegramLink: string;
  instagramLink: string;
  disciples: User[];
  requestedDisciples: User[];
  workoutPlans: WorkoutPlan[];
};
