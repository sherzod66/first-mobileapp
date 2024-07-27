import { RouteProp, useRoute } from "@react-navigation/native";
import { ProfileStackParamList } from "..";
import { PROFILE } from "../../../../navigation/ROUTES";
import { useTranslation } from "react-i18next";

export type ExerciseScreenRouteProp = RouteProp<
  ProfileStackParamList,
  PROFILE.EXERCISE
>;

export const ExerciseHooks = () => {
  const route = useRoute<ExerciseScreenRouteProp>();
  const { exercise } = route.params;
  const { i18n } = useTranslation();

  return { exercise, i18n };
};
