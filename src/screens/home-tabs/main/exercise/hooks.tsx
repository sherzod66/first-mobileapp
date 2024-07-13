import { RouteProp, useRoute } from "@react-navigation/native";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { useTranslation } from "react-i18next";

export type ExerciseScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.EXERCISE
>;

export const ExerciseHooks = () => {
  const route = useRoute<ExerciseScreenRouteProp>();
  const { exercise } = route.params;
  const { t, i18n } = useTranslation();

  return { exercise, i18n };
};
