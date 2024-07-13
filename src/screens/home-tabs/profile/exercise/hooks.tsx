import { RouteProp, useRoute } from "@react-navigation/native";
import { ProfileStackParamList } from "..";
import { PROFILE } from "../../../../navigation/ROUTES";

export type ExerciseScreenRouteProp = RouteProp<
  ProfileStackParamList,
  PROFILE.EXERCISE
>;

export const ExerciseHooks = () => {
  const route = useRoute<ExerciseScreenRouteProp>();
  const { exercise } = route.params;

  return { exercise };
};
