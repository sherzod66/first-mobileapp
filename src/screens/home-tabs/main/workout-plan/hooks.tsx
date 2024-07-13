import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectUser, setUser } from "../../../../store/slices/appSlice";
import { Response, User, WorkoutPlan } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";

export type WorkoutPlanScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  MAIN.WORKOUT_PLAN
>;

export type WorkoutPlanScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.WORKOUT_PLAN
>;

export const WorkoutPlanHooks = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [user, dispatch] = useRedux(selectUser);

  const navigation = useNavigation<WorkoutPlanScreenNavigationProp>();
  const route = useRoute<WorkoutPlanScreenRouteProp>();
  const { workoutPlan } = route.params;

  const onPress = async () => {
    try {
      setLoading(true);

      await ApiService.put<Response<WorkoutPlan>>(
        `/users/add-workout-plan/${user?._id}`,
        {
          planId: workoutPlan._id,
        }
      );

      let obj: any = {
        ...user,
        // @ts-ignore
        workoutPlans: [...user?.workoutPlans, workoutPlan],
      };

      dispatch(setUser({ ...obj }));
      EventEmitter.notify("onRemoveWorkoutPlan", workoutPlan._id);
      setLoading(false);
      setDisabled(true);
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      console.log("e: ", JSON.stringify(e, null, 4));
    }
  };

  return { workoutPlan, onPress, loading, disabled };
};
