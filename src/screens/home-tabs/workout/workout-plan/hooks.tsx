import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { WorkoutStackParamList } from "..";
import { WORKOUT } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectUser, setUser } from "../../../../store/slices/appSlice";
import { Response, User, WorkoutPlan } from "../../../../types";

export type WorkoutPlanScreenNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  WORKOUT.WORKOUT_PLAN
>;

export type WorkoutPlanScreenRouteProp = RouteProp<
  WorkoutStackParamList,
  WORKOUT.WORKOUT_PLAN
>;

export const WorkoutPlanHooks = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [user, dispatch] = useRedux(selectUser);

  const navigation = useNavigation<WorkoutPlanScreenNavigationProp>();
  const route = useRoute<WorkoutPlanScreenRouteProp>();
  const { workoutPlan } = route.params;

  const onPress = async () => {
    if (user) {
      try {
        setLoading(true);

        await ApiService.put(`/users/set-schedule-workout/${user._id}`, {
          planId: workoutPlan._id,
        });

        const res = await ApiService.get<Response<User>>("/users/me");

        dispatch(setUser(res.data));

        setLoading(false);
        navigation.goBack();
      } catch (e) {
        setLoading(false);
        console.log("e: ", JSON.stringify(e, null, 4));
      }
    }
  };

  return { workoutPlan, onPress, loading, disabled };
};
