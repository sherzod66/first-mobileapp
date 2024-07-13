import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ProfileStackParamList } from "..";
import { PROFILE } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectUser, setUser } from "../../../../store/slices/appSlice";
import { Response, ScheduleWorkout, User } from "../../../../types";

export type WorkoutResultsScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  PROFILE.WORKOUT_RESULTS
>;

export type WorkoutResultsScreenRouteProp = RouteProp<
  ProfileStackParamList,
  PROFILE.WORKOUT_RESULTS
>;

export const WorkoutResultsHooks = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [weight, setWeight] = useState("");
  const [repeat, setRepeat] = useState("");
  const [exerciseIndex, setExerciseIndex] = useState<number | undefined>();
  const [approachIndex, setApproachIndex] = useState<number | undefined>();
  const [modalError, setModalError] = useState("");
  const [data, setData] = useState<ScheduleWorkout | null>(null);

  const [user, dispatch] = useRedux(selectUser);

  const navigation = useNavigation<WorkoutResultsScreenNavigationProp>();
  const route = useRoute<WorkoutResultsScreenRouteProp>();
  const { workoutIndex, weekIndex } = route.params;

  const effect = async () => {
    if (user) {
      setData(user.scheduleWorkouts.find((s) => !s.isFinished) ?? null);
    }
  };

  useEffect(() => {
    effect();
  }, [user]);

  useEffect(() => {
    if (weight) {
      setWeight(weight.replace(/[^\d.-]+/g, ""));
    }
    if (repeat) {
      setRepeat(repeat.replace(/[^\d.-]+/g, ""));
    }
  }, [weight, repeat]);

  const onPress = (index: number) => {
    if (data) {
      const { exercise } = data.plan.workouts[workoutIndex][index];

      navigation.navigate(PROFILE.EXERCISE, {
        exercise,
      });
    }
  };

  const onShow = (eIndex: number, aIndex: number) => {
    setExerciseIndex(eIndex);
    setApproachIndex(aIndex);
    setShow(true);
  };

  const onHide = () => {
    setExerciseIndex(undefined);
    setApproachIndex(undefined);
    setWeight("");
    setRepeat("");
    setShow(false);
  };

  const onSubmit = async () => {
    if (!repeat || !weight) {
      if (!weight) {
        setModalError("Enter weight");
      }

      if (!repeat) {
        setModalError("Enter repeat");
      }

      return;
    }

    if (user) {
      setLoading(true);

      try {
        await ApiService.put(`/users/set-workout-result/${user._id}`, {
          group: Number(workoutIndex),
          week: Number(weekIndex),
          workout: Number(exerciseIndex),
          approach: Number(approachIndex),
          weight: Number(weight),
          repeat: Number(repeat),
        });

        const res = await ApiService.get<Response<User>>("/users/me");

        dispatch(setUser(res.data));
      } catch (e) {
        console.log("e: ", e);
      }

      setLoading(false);
      setShow(false);
      setExerciseIndex(undefined);
      setApproachIndex(undefined);
      setWeight("");
      setRepeat("");
    }
  };

  return {
    loading,
    setLoading,
    show,
    setShow,
    weight,
    setWeight,
    repeat,
    setRepeat,
    modalError,
    data,
    workoutIndex,
    weekIndex,
    onPress,
    onShow,
    onHide,
    onSubmit,
  };
};
