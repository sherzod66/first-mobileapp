import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { WorkoutStackParamList } from "../..";
import { WORKOUT } from "../../../../../navigation/ROUTES";
import { ApiService } from "../../../../../services";
import { useRedux } from "../../../../../store/hooks";
import { selectUser, setUser } from "../../../../../store/slices/appSlice";
import {
  Exercise,
  Response,
  ScheduleWorkout,
  User,
} from "../../../../../types";
import { useTranslation } from "react-i18next";

export type ScheduleWorkoutScreenNavigationProp = NavigationProp<
  WorkoutStackParamList,
  WORKOUT.WORKOUT_LAYOUT
>;

export const ScheduleWorkoutHooks = () => {
  const [show, setShow] = useState<any>({});
  const [data, setData] = useState<ScheduleWorkout | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const { i18n } = useTranslation();

  const [user, dispatch] = useRedux(selectUser);

  const navigation = useNavigation<ScheduleWorkoutScreenNavigationProp>();

  const effect = async () => {
    if (user) {
      setData(user.scheduleWorkouts.find((s) => s.current) ?? null);
    }
  };

  useEffect(() => {
    effect();
  }, [user]);

  const onHide = () => {
    setShowModal(false);
  };

  const onFinish = async () => {
    if (user) {
      setModalLoading(true);

      try {
        await ApiService.put(`/users/finish-schedule-workout/${user._id}`);

        const res = await ApiService.get<Response<User>>("/users/me");

        dispatch(setUser(res.data));
      } catch (e) {
        console.log("e: ", e);
      }

      setModalLoading(false);
      setShowModal(false);
    }
  };

  const onPress = (workoutIndex: number, weekIndex: number) => {
    if (data) {
      navigation.navigate(WORKOUT.WORKOUT_RESULTS, {
        schedule: data,
        weekIndex,
        workoutIndex,
      });
    }
  };
  const onPressExercise = (exercise: Exercise) => {
    navigation.navigate(WORKOUT.EXERCISE, {
      exercise,
    });
  };

  return {
    data,
    setData,
    show,
    setShow,
    showModal,
    setShowModal,
    modalLoading,
    onPress,
    onHide,
    onFinish,
    i18n,
    onPressExercise,
  };
};
