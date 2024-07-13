import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { NutritionPlan, Response } from "../../../../types";
import { useRedux } from "../../../../store/hooks";
import { selectUser, setUser } from "../../../../store/slices/appSlice";
import EventEmitter from "../../../../utils/EventEmitter";
import { showSuccessToast } from "../../../../utils/showToast";
export type ExerciseScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.NUTRITION_DETAIL
>;

export const NutritionPlanHooks = () => {
  const navigation = useNavigation();
  const route = useRoute<ExerciseScreenRouteProp>();
  const { nutritionPlan } = route.params;
  const [loading, setLoading] = useState<boolean>();
  const [user, dispatch] = useRedux(selectUser);

  const [disabled, setDisabled] = useState(false);
  const onPress = async () => {
    try {
      setLoading(true);

      await ApiService.put<Response<NutritionPlan>>(
        `/users/add-nutrition-plan/${user?._id}`,
        {
          planId: nutritionPlan._id,
        }
      );

      let obj: any = {
        ...user,
        // @ts-ignore
        workoutPlans: [...user?.workoutPlans, workoutPlan],
      };

      dispatch(setUser({ ...obj }));
      EventEmitter.notify("onRemoveWorkoutPlan", "workoutPlan._id");
      setLoading(false);
      setDisabled(true);
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      console.log("e: ", JSON.stringify(e, null, 4));
    }
  };

  return { loading, setLoading, nutritionPlan, disabled, onPress };
};
