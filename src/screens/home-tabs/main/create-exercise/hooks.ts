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
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { Env } from "../../../../../env";
const { ApiUrl } = Env;

type CustomCategory = Partial<
  | Omit<Exercise, "category"> & {
      category: Category & SelectItem;
    }
>;

export const CreateExerciseHook = () => {
  const [exercise, setExercise] = useState<CustomCategory>({});
  const [selectImage, setSelectImage] = useState<Asset>();
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
    if (exercise.category?.label && exercise.title?.ru) {
      let imagePath = "";
      try {
        if (selectImage) {
          const bodyFormData = new FormData();
          bodyFormData.append("image", {
            uri: selectImage.uri,
            type: selectImage.type,
            name: selectImage.fileName,
          });
          const res = await fetch(`${ApiUrl}/uploads/image`, {
            method: "post",
            body: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          const data = await res.json();
          imagePath = data.src;
        }
        const current = {
          description: {
            en: exercise.description ? exercise.description.en : "  ",
            ru: exercise.description ? exercise.description.ru : "  ",
            uz: exercise.description ? exercise.description.uz : "  ",
          },
          image: imagePath.length > 0 ? imagePath : " ",
          metadescription: exercise.metadescription
            ? exercise.metadescription
            : " ",
          title: {
            en: exercise.title ? exercise.title.en : " ",
            ru: exercise.title ? exercise.title.ru : " ",
            uz: exercise.title ? exercise.title.uz : " ",
          },
          video: exercise.video ? exercise.video : " ",
          category: exercise.category?.value,
        };
        console.log(JSON.stringify(current, null, 4));
        const res = await ApiService.post("/exercises", current);
      } catch (error: any) {
        console.log(JSON.stringify(error.response?.data.message, null, 4));
      }
      navigation.navigate(MAIN.EXERCISES as never);
    }
  };
  const ImagePicker = () => {
    let option: ImageLibraryOptions = {
      mediaType: "photo",
    };
    launchImageLibrary(option, (response) => {
      if (response.assets) setSelectImage(response.assets[0]);
    });
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
    ImagePicker,
    selectImage,
    setExercise,
  };
};
