import { BaseUser, GENDER, User, WorkoutPlan } from ".";

export type Trainer = BaseUser & {
  trainerGenderType: GENDER;
  age: number;
  email: string;
  city: string;
  isPhoneNumber: boolean;
  avatar: string;
  speciality: string;
  experience: number;
  education: string;
  aboutMe: string;
  telegramLink: string;
  instagramLink: string;
  disciples: User[];
  requestedDisciples: User[];
  workoutPlans: WorkoutPlan[];
};
