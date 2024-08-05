import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NutritionStackParamList } from "..";
import { NUTRITION } from "../../../../navigation/ROUTES";
import { Reception } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { getSumValues } from "../../../../utils/getSumValues";
import { convertDishToProduct } from "../../../../utils/convertDishToProduct";

export type AddPartPlanScreenNavigationProp = NativeStackNavigationProp<
  NutritionStackParamList,
  NUTRITION.ADD_PART_PLAN
>;

export type AddPartPlanScreenRouteProp = RouteProp<
  NutritionStackParamList,
  NUTRITION.ADD_PART_PLAN
>;

export const AddPartPlanHooks = () => {
  const navigation = useNavigation<AddPartPlanScreenNavigationProp>();
  const route = useRoute<AddPartPlanScreenRouteProp>();

  const [receptions, setReceptions] = useState<(Reception | null)[]>([null]);

  const { index, defaultReceptions, topCalories, topProtein, topOil, topCarb } =
    route.params ?? {};

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [oil, setOil] = useState(0);
  const [carb, setCarb] = useState(0);

  useEffect(() => {
    let tCalories = 0;
    let tProtein = 0;
    let tOil = 0;
    let tCarb = 0;

    receptions.map((reception) => {
      if (reception) {
        const { products, dishes, amountsP, amountsD } = reception;
        const tProducts = [
          ...products,
          ...dishes.map((d) => convertDishToProduct(d)),
        ];
        const tAmounts = [...amountsP, ...amountsD];

        tCalories += getSumValues(tProducts, tAmounts, "calories");
        tProtein += getSumValues(tProducts, tAmounts, "protein");
        tOil += getSumValues(tProducts, tAmounts, "oil");
        tCarb += getSumValues(tProducts, tAmounts, "carb");
      }
    });

    setCalories(tCalories);
    setProtein(tProtein);
    setOil(tOil);
    setCarb(tCarb);
  }, [receptions]);

  useEffect(() => {
    if (defaultReceptions.length) {
      setReceptions(defaultReceptions);
    }
  }, []);

  const setToReceptions = ({ obj, i }: { obj: Reception; i: number }) => {
    console.log("setToReceptions Main::", obj);
    let arr1 = [...receptions];
    arr1[i] = { ...obj };
    setReceptions(arr1);
  };

  const updateReceptions = (arr: Reception[]) => setReceptions(arr);

  useEffect(() => {
    EventEmitter.addListener("onSetReceptions", setToReceptions);
    EventEmitter.addListener("onUpdateReceptions", updateReceptions);

    return () => {
      EventEmitter.removeListener("onSetReceptions", setToReceptions);
      EventEmitter.removeListener("onUpdateReceptions", updateReceptions);
    };
  }, [receptions]);

  const onDec = () => {
    if (receptions.length !== 1) {
      setReceptions(receptions.slice(0, -1));
    }
  };

  const onInc = () => {
    if (receptions.length !== 5) {
      setReceptions([...receptions, null]);
    }
  };

  const onAddReception = (index: number) => {
    navigation.navigate(NUTRITION.ADD_RECEPTION, {
      index,
      reception: receptions[index],
    });
  };

  const onUpdate = () => {
    navigation.navigate(NUTRITION.UPDATE_PART_PLAN, {
      index,
      topCalories,
      topProtein,
      topOil,
      topCarb,
      // @ts-ignore
      receptions: receptions.filter((r) => !!r),
    });
  };

  const onSave = () => {
    EventEmitter.notify("onSetGroupReceptions", { i: index, arr: receptions });
    navigation.goBack();
  };

  return {
    index,
    topCalories,
    topProtein,
    topOil,
    topCarb,
    calories,
    protein,
    oil,
    carb,
    receptions,
    setReceptions,
    onDec,
    onInc,
    onAddReception,
    onUpdate,
    onSave,
  };
};
