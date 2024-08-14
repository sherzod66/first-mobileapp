import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectLanguage, selectUser } from "../../../../store/slices/appSlice";
import { selectExerciseCategories } from "../../../../store/slices/categorySlice";
import { Exercise, ROLES, Response } from "../../../../types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export type ExercisesScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  MAIN.EXERCISES
>;

export const ExercisesHooks = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [removing, setRemoving] = useState(false);
  const [show, setShow] = useState<any>();

  const navigation = useNavigation<ExercisesScreenNavigationProp>();
  const [exerciseCategories] = useRedux(selectExerciseCategories);
  const [language] = useRedux(selectLanguage);
  const user = useSelector(selectUser);
  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setActiveSubCategory(0);
    setShow(false);
  }, [activeCategory]);

  const getExercises = async () => {
    try {
      const resExercises = await ApiService.get<Response<Exercise[]>>(
        `/exercises?category=${exerciseCategories[activeCategory].children[activeSubCategory]._id}`
      );
      setExercises(resExercises.data);
    } catch (e) {
      setExercises([]);
    }
  };

  const onRemove = async (id: string) => {
    try {
      setRemoving(true);
      await ApiService.delete("/exercises/" + id);
      await getExercises();
    } catch (error) {}
    setRemoving(false);
  };

  useEffect(() => {
    setShow(false);
    getExercises();
  }, [activeCategory, activeSubCategory]);

  const onPress = (index: number) => {
    navigation.navigate(MAIN.EXERCISE, { exercise: exercises[index] });
    setShow(false);
  };
  const onEdit = (index: number) => {
    navigation.navigate(MAIN.EDIT_EXERCISE, { exercise: exercises[index] });
    setShow(false);
  };

  const onCreate = () => {
    navigation.navigate(MAIN.CREATE_EXERCISE);
    setShow(false);
  };

  return {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    exerciseCategories,
    language,
    onPress,
    exercises,
    onCreate,
    isSuperAdmin,
    removing,
    onRemove,
    show,
    setShow,
    onEdit,
    i18n,
  };
};
