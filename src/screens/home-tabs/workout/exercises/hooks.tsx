import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { WorkoutStackParamList } from "..";
import { WORKOUT } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectLanguage, selectUser } from "../../../../store/slices/appSlice";
import { selectExerciseCategories } from "../../../../store/slices/categorySlice";
import { Exercise, Response, Workout } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { useTranslation } from "react-i18next";

export type WorkoutExercisesScreenNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  WORKOUT.EXERCISES
>;

export type WorkoutExercisesScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  WORKOUT.EXERCISES
>;

export const WorkoutExercisesHooks = () => {
  const navigation = useNavigation<WorkoutExercisesScreenNavigationProp>();
  const route = useRoute<WorkoutExercisesScreenRouteProp>();
  const { defaultWorkouts } = route.params ?? {};

  const [language] = useRedux(selectLanguage);
  const [exerciseCategories] = useRedux(selectExerciseCategories);
  const [user] = useRedux(selectUser);
  const { favoriteExercises } = user ?? {};
  const { t, i18n } = useTranslation();

  const [isFavorite, setIsFavorite] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selected, setSelected] = useState<Workout[]>([]);

  useEffect(() => {
    setActiveCategory(0);
    setActiveSubCategory(0);
  }, [isFavorite]);

  useEffect(() => {
    setActiveSubCategory(0);
  }, [activeCategory]);

  const getExercises = async () => {
    if (!isFavorite) {
      let arr: Exercise[] = [];

      favoriteExercises?.map((e, i) => {
        const { _id } =
          exerciseCategories[activeCategory].children[activeSubCategory];

        if (_id === e.category?._id) {
          arr.push(e);
        }
      });

      setExercises(arr);
    } else {
      try {
        const resExercises = await ApiService.get<Response<Exercise[]>>(
          `/exercises?category=${exerciseCategories[activeCategory].children[activeSubCategory]._id}`
        );
        let arr: Exercise[] = [];

        // resExercises.data.map((e) => {
        //   const found = favoriteExercises?.find((a) => a._id === e._id);

        //   if (!found) {
        //     arr.push(e);
        //   }
        // });

        setExercises(resExercises.data);
      } catch (e) {
        console.log("e: ", e);
      }
    }
  };

  useEffect(() => {
    getExercises();
  }, [isFavorite, activeCategory, activeSubCategory]);

  const onSelect = (e: Exercise) => {
    let arr = [...selected];
    let foundIndex = selected.findIndex(
      (a) => a.exercise._id.toString() === e._id.toString()
    );

    if (foundIndex === -1) {
      arr.push({
        exercise: e,
        approach: 1,
        repetitions: "",
      });
    } else {
      arr = [...arr.slice(0, foundIndex), ...arr.slice(foundIndex + 1)];
    }

    setSelected([...arr]);
  };

  const onAdd = () => {
    EventEmitter.notify("onSetToWorkouts", [...defaultWorkouts, ...selected]);
    navigation.goBack();
  };

  return {
    isFavorite,
    setIsFavorite,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    exercises,
    exerciseCategories,
    language,
    selected,
    onSelect,
    onAdd,
    i18n,
  };
};
