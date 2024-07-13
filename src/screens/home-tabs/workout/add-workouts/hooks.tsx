import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MAIN, ROUTES, WORKOUT } from "../../../../navigation/ROUTES";
import { WorkoutStackParamList } from "..";
import { Workout } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { showErrToast } from "../../../../utils/showToast";
import { useTranslation } from "react-i18next";

export type AddWorkoutsScreenNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  WORKOUT.ADD_WORKOUTS
>;

export type AddWorkoutsScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  WORKOUT.ADD_WORKOUTS
>;

export const AddWorkoutHooks = () => {
  const navigation = useNavigation<AddWorkoutsScreenNavigationProp>();
  const route = useRoute<AddWorkoutsScreenRouteProp>();
  const { index, defaultWorkouts } = route.params ?? {};
  const { t, i18n } = useTranslation();

  const [show, setShow] = useState<number | undefined>();
  const [approach, setApproach] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [modalError, setModalError] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([...defaultWorkouts]);
  console.log(JSON.stringify(workouts, null, 4));

  const onPress = (index: number) => {
    const { exercise } = workouts[index];

    navigation.navigate(WORKOUT.EXERCISE, {
      exercise,
    });
  };

  const setToWorkouts = (arr: Workout[]) => {
    setWorkouts([...arr]);
  };

  useEffect(() => {
    EventEmitter.addListener("onSetToWorkouts", setToWorkouts);

    return () => {
      EventEmitter.removeListener("onSetToWorkouts", setToWorkouts);
    };
  }, []);

  const onAddExercise = () => {
    navigation.navigate(WORKOUT.EXERCISES, {
      defaultExercises: workouts.map((w) => w.exercise),
      defaultWorkouts: workouts,
    });
  };

  const onShow = (index: number) => {
    let arr = [...workouts];
    let obj = { ...arr[index] };
    setApproach(obj.approach > 1 ? obj.approach.toString() : "");
    setRepetitions(obj.repetitions);
    setShow(index);
  };

  const onHide = () => {
    setShow(undefined);
  };

  useEffect(() => {
    if (approach) {
      setApproach(approach.replace(/[^\d.-]+/g, ""));
    }

    // if (repetitions) {
    //   let str = repetitions.replace(/[^\d.-]+/g, "");

    //   if (str.length === 1) {
    //     str = str + "-";
    //   }

    //   if (str.length === 2 && str[1] !== "-") {
    //     str = str[0] + "-" + str.slice(1);
    //   }

    //   if (str.length === 3 && str[1] !== "-") {
    //     str = str[0] + "-" + str.slice(1);
    //   }

    //   setRepetitions(str);
    // }
  }, [approach, repetitions]);

  const onSet = () => {
    if (!approach || !repetitions) {
      if (!approach) {
        setModalError("Enter approach");
      }

      if (!repetitions) {
        setModalError("Enter repetitions");
      }

      return;
    }

    if (typeof show !== "undefined") {
      let arr = [...workouts];
      let obj = { ...arr[show] };
      obj.approach = Number(approach ?? "1");
      obj.repetitions = repetitions;
      arr[show] = { ...obj };
      setWorkouts([...arr]);
    }

    setShow(undefined);
  };

  const onSave = () => {
    let condition = false;

    for (let i = 0; i < workouts.length; i++) {
      if (!workouts[i].repetitions) {
        condition = true;
      }
    }

    if (condition) {
      showErrToast("Set all workouts approach/repetitions");
      return;
    }

    EventEmitter.notify("onSetGroupWorkouts", {
      arr: [...workouts],
      i: index,
    });
    navigation.goBack();
  };

  return {
    show,
    approach,
    setApproach,
    repetitions,
    setRepetitions,
    modalError,
    onPress,
    onShow,
    onHide,
    onSet,
    workouts,
    onAddExercise,
    onSave,
    index,
    i18n,
    setWorkouts,
  };
};

export const WeightAndRepititionHooks = () => {
  const [weightAndRepititions, setWeightAndRepititions] = useState<
    { weight: number; repititions: number }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const onShow = (i: number) => {
    setCurrentIndex(i);
  };
  const onDissmiss = () => {
    setCurrentIndex(-1);
  };

  const onSubmit = () => {};

  const setItem =
    (key: "weight" | "repititions", index: number) =>
    (value: number | string) => {
      let el = {};
      if (!!weightAndRepititions?.[index]) {
      }
    };

  const currentItem =
    currentIndex === -1 || !weightAndRepititions[currentIndex]
      ? { weight: 40, repititions: 8 }
      : weightAndRepititions[currentIndex];

  return {
    onShow,
    onDissmiss,
    onSubmit,
    currentIndex,
    weight: currentItem.weight,
    repititions: currentItem.repititions,
  };
};
