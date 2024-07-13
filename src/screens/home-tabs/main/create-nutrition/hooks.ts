import { useEffect, useState } from "react";
import { SelectItem } from "../../../../components/common/SelectPrimary";
import { Category, CategoryType, Exercise, Response } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExerciseCategories,
  setCategoriesByType,
} from "../../../../store/slices/categorySlice";
import { ApiService } from "../../../../services";
import { useNavigation } from "@react-navigation/native";
import { MAIN } from "../../../../navigation/ROUTES";
import { Alert } from "react-native";

type CustomCategory = Partial<
  Omit<Exercise, "category"> & {
    category: Category & SelectItem;
  }
>;

export const CreateExerciseHook = () => {
  const [exercise, setExercise] = useState<CustomCategory>({});
  const [category, setCategory] = useState<Partial<Category>>({});
  const [subcategories, setSubcategories] = useState<Category[]>();
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const categories = useSelector(selectExerciseCategories);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onCategoryRemove = async (e: string) => {
    try {
      await ApiService.delete(`/categories/${e}`);
      Alert.alert("Внимание", "Категория успешно удалена");
      const resCategories = await ApiService.get<Response<Category[]>>(
        "/categories?parents=ss"
      );
      dispatch(
        setCategoriesByType({
          type: CategoryType.EXERCISE,
          categories: resCategories.data.filter(
            (v) => v.type === CategoryType.EXERCISE
          ),
        })
      );
      dispatch(
        setCategoriesByType({
          type: CategoryType.PRODUCT,
          categories: resCategories.data.filter(
            (v) => v.type === CategoryType.PRODUCT
          ),
        })
      );
      dispatch(
        setCategoriesByType({
          type: CategoryType.DISH,
          categories: resCategories.data.filter(
            (v) => v.type === CategoryType.DISH
          ),
        })
      );
    } catch (error) {}
  };

  const onModalToggle = () => {
    setCategoryModalVisible((e) => !e);
  };

  const onChange = (key: keyof Exercise) => (value: any) => {
    setExercise({ ...exercise, [key]: value });
  };
  const onCategoryChange = (key: string) => (value: any) => {
    if (key.indexOf(".") !== -1) {
      const [name, lang] = key.split(".");
      setCategory({
        ...category,
        //@ts-ignore
        [name]: { ...(category[name] || {}), [lang]: value },
      });
      return;
    }
    setCategory({ ...category, [key]: value });
  };

  const onCategorySubmit = async () => {
    try {
      const current = {
        ...category,
        parent: category?.parent?.value,
        type: "EXERCISE",
      };
      const res = await ApiService.post("/categories", current);
    } catch (error) {
      console.log("ERROR", JSON.stringify(error));
    }
    setCategory({});
    setCategoryModalVisible(false);
  };

  const onExerciseSubmit = async () => {
    try {
      const current = {
        ...exercise,
        category: exercise.category?.value,
      };
      const res = await ApiService.post("/exercises", current);
    } catch (error) {
      console.log(JSON.stringify(error.response?.data));
    }
    navigation.navigate(MAIN.EXERCISES);
  };

  useEffect(() => {
    if (!!exercise.category) {
      const found = categories.find((e) => e._id === exercise.category?.value);
      setSubcategories(found?.children);
    }
  }, [exercise.category]);

  return {
    onChange,
    subcategories,
    categories,
    categoryModalVisible,
    onModalToggle,
    onCategoryChange,
    onCategorySubmit,
    onExerciseSubmit,
    onCategoryRemove,
  };
};
