import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectUser } from "../../../../store/slices/appSlice";
import { GENDER, LEVEL, Response, WorkoutPlan } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { getNewData } from "../../../../utils/getNewData";

export type WorkoutPlansScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  MAIN.WORKOUT_PLANS
>;

export const WorkoutPlansHooks = () => {
  const [activeGender, setActiveGender] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

  const [user] = useRedux(selectUser);
  const { workoutPlans: userWorkoutPlans } = user ?? {};

  const navigation = useNavigation<WorkoutPlansScreenNavigationProp>();

  const removePlan = (id: string) => {
    setWorkoutPlans(workoutPlans.filter((a) => a._id !== id));
  };

  const getWorkoutPlans = async () => {
    try {
      const resWorkoutPlans = await ApiService.get<Response<WorkoutPlan[]>>(
        `/workout-plans?gender=${Object.values(GENDER)[activeGender]}&level=${
          Object.values(LEVEL)[activeLevel]
        }&isPublic=true`
      );
      setWorkoutPlans(getNewData(resWorkoutPlans.data));
    } catch (e) {
      console.log("e: ", e);
    }
  };

  useEffect(() => {
    EventEmitter.addListener("onRemoveWorkoutPlan", removePlan);
    return () => {
      EventEmitter.removeListener("onRemoveWorkoutPlan", removePlan);
    };
  }, [workoutPlans]);

  useEffect(() => {
    getWorkoutPlans();
    // setActiveLevel(0);
  }, [activeGender, activeLevel]);

  const onPress = (index: number) => {
    navigation.navigate(MAIN.WORKOUT_PLAN, {
      workoutPlan: workoutPlans[index],
    });
  };

  const onIndividualPress = () => {
    navigation.navigate(MAIN.TRAINERS, { individual: true, workout: true });
  };

  return {
    activeGender,
    setActiveGender,
    activeLevel,
    setActiveLevel,
    workoutPlans,
    onPress,
    onIndividualPress,
  };
};
