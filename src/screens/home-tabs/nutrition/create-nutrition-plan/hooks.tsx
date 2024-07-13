import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NutritionStackParamList } from "..";
import { NUTRITION } from "../../../../navigation/ROUTES";
import {
  NUTRITION_TYPE,
  NutritionPlan,
  ROLES,
  Reception,
  Response,
} from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { ApiService } from "../../../../services";
import { useRedux } from "../../../../store/hooks";
import { selectUser, setUser } from "../../../../store/slices/appSlice";

export type CreateNutritionPlanScreenNavigationProp = NativeStackNavigationProp<
  NutritionStackParamList,
  NUTRITION.CREATE_NUTRITION_PLAN
>;

export type CreateNutritionPlanScreenRouteProp = RouteProp<
  NutritionStackParamList,
  NUTRITION.CREATE_NUTRITION_PLAN
>;

export const CreateNutritionHooks = () => {
  const navigation = useNavigation<CreateNutritionPlanScreenNavigationProp>();
  const route = useRoute<CreateNutritionPlanScreenRouteProp>();

  const { type } = route.params ?? {};

  const [user, dispatch] = useRedux(selectUser);
  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;
  const isTrainer = user?.role === ROLES.TRAINER;

  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState(0);
  const [proteinPercent, setProteinPercent] = useState(0);
  const [oilPercent, setOilPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [groupReceptions, setGroupReceptions] = useState<Reception[][]>([[]]);
  const [show, setShow] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [publicly, setPublic] = useState(false);
  const [toggle, setToggle] = useState(type === NUTRITION_TYPE.FAT);
  const [price, setPrice] = useState("");
  console.log(publicly);

  useEffect(() => {
    setCreator(user?._id || "");
  }, []);

  let protein = 0;
  let oil = 0;
  let carbPercent = 0;
  let carb = 0;

  if (calories && proteinPercent) {
    protein = Math.trunc((calories * proteinPercent) / 400);
  }

  if (calories && oilPercent) {
    oil = Math.trunc((calories * oilPercent) / 900);
  }

  if (calories && proteinPercent && oilPercent) {
    carbPercent = 100 - (oilPercent + proteinPercent);
    carb = Math.trunc((calories * carbPercent) / 400);
  }

  const isModalDisabled =
    !creator ||
    !title ||
    !calories ||
    !proteinPercent ||
    !oilPercent ||
    !description ||
    !groupReceptions.every((g) => g.length);

  const setToGroupReceptions = ({
    arr,
    i,
  }: {
    arr: Reception[];
    i: number;
  }) => {
    let arr1 = [...groupReceptions];
    arr1[i] = [...arr];
    setGroupReceptions(arr1);
  };

  useEffect(() => {
    EventEmitter.addListener("onSetGroupReceptions", setToGroupReceptions);

    return () => {
      EventEmitter.removeListener("onSetGroupReceptions", setToGroupReceptions);
    };
  }, [groupReceptions]);

  const onClose = (prop?: any) => {
    setShow({});
    if (prop === "a") {
      setCalories(0);
    }
    if (prop === "b") {
      setProteinPercent(0);
    }
    if (prop === "c") {
      setOilPercent(0);
    }
  };

  const onDec = () => {
    if (groupReceptions.length !== 1) {
      setGroupReceptions(groupReceptions.slice(0, -1));
    }
  };

  const onInc = () => {
    if (groupReceptions.length !== 5) {
      setGroupReceptions([...groupReceptions, []]);
    }
  };

  const onAddReceptions = (index: number) => {
    navigation.navigate(NUTRITION.ADD_PART_PLAN, {
      index,
      topCalories: calories,
      topProtein: protein,
      topOil: oil,
      topCarb: carb,
      defaultReceptions: groupReceptions[index],
    });
  };

  const onSave = async () => {
    if (user) {
      setLoading(true);
      try {
        const obj = {
          price: +price,
          creatorName: creator,
          title,
          description,
          calories,
          proteinPercent,
          oilPercent,
          type: toggle ? NUTRITION_TYPE.THIN : NUTRITION_TYPE.FAT,
          creator: user._id,
          nutritions: groupReceptions.map((g) =>
            g.map((r) => ({
              ...r,
              products: r.products.map((p) => p._id),
              dishes: r.dishes.map((d) => d._id),
            }))
          ),
          isPublic: publicly,
        };
        console.log(JSON.stringify(obj, null, 4));
        const res1 = await ApiService.post<Response<NutritionPlan>>(
          "/nutrition-plans",
          obj
        );
        const res2 = await ApiService.get<Response<NutritionPlan>>(
          `/nutrition-plans/${res1.data._id}`
        );

        dispatch(
          setUser({
            ...user,
            nutritionPlans: [...user.nutritionPlans, res2.data],
          })
        );

        setLoading(false);
        navigation.goBack();
      } catch (e) {
        console.log("e: ", JSON.stringify(e, null, 4));
        setLoading(false);
      }
    }
  };

  return {
    loading,
    creator,
    setCreator,
    title,
    setTitle,
    calories,
    setCalories,
    proteinPercent,
    setProteinPercent,
    protein,
    oilPercent,
    setOilPercent,
    oil,
    carbPercent,
    carb,
    description,
    setDescription,
    groupReceptions,
    setGroupReceptions,
    show,
    setShow,
    isModalDisabled,
    onClose,
    onDec,
    onInc,
    onAddReceptions,
    onSave,
    toggle,
    setToggle,
    isSuperAdmin,
    price,
    setPrice,
    type,
    publicly,
    setPublic,
    isTrainer,
  };
};
