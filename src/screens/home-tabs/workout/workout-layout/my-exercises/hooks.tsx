import { useState, useEffect } from "react";
import { ApiService } from "../../../../../services";
import { useRedux } from "../../../../../store/hooks";
import {
  selectLanguage,
  selectUser,
  setUser,
} from "../../../../../store/slices/appSlice";
import { selectExerciseCategories } from "../../../../../store/slices/categorySlice";
import { Exercise, Response } from "../../../../../types";
import { showSuccessToast } from "../../../../../utils/showToast";
import { useTranslation } from "react-i18next";

export const MyExercisesHooks = () => {
  const [isFavorite, setIsFavorite] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<any>();
  const [show, setShow] = useState<any>();
  const [select, setSelect] = useState<any[]>([]);
  const [loadingSelect, setLoadingSelect] = useState(false);

  const [language] = useRedux(selectLanguage);
  const [exerciseCategories] = useRedux(selectExerciseCategories);
  const [user, dispatch] = useRedux(selectUser);
  const { favoriteExercises } = user ?? {};
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setActiveCategory(0);
    setActiveSubCategory(0);
    setSelect([]);
  }, [isFavorite]);

  useEffect(() => {
    setActiveSubCategory(0);
  }, [activeCategory]);

  const getExercises = async () => {
    if (!isFavorite) {
      let arr: Exercise[] = [];

      favoriteExercises?.map((e, i) => {
        const { _id } =
          exerciseCategories[activeCategory].children[activeSubCategory];

        if (_id === e.category?._id) {
          arr.push(e);
        }
      });

      setExercises(arr);
    } else {
      try {
        const resExercises = await ApiService.get<Response<Exercise[]>>(
          `/exercises?category=${exerciseCategories[activeCategory].children[activeSubCategory]._id}`
        );
        let arr: Exercise[] = [];

        // resExercises.data.map((e) => {
        //   const found = favoriteExercises?.find((a) => a._id === e._id);

        //   if (!found) {
        //     arr.push(e);
        //   }
        // });

        setExercises(resExercises.data);
      } catch (e) {
        console.log("e: ", e);
      }
    }
  };

  useEffect(() => {
    getExercises();
  }, [isFavorite, activeCategory, activeSubCategory, user]);

  const onRemove = async (i: number) => {
    setLoading({ [i]: !(loading && loading[i]) });
    try {
      const exerciseId = exercises[i]._id;

      await ApiService.patch(`/users/remove-favorite-exercise/${user?._id}`, {
        exerciseId,
      });

      let arr = [...exercises];
      arr = [...arr.slice(0, i), ...arr.slice(i + 1)];

      setExercises([...arr]);

      const index = favoriteExercises?.findIndex((e) => e._id === exerciseId);

      if (typeof index !== "undefined") {
        let arr1 = [...(favoriteExercises ?? [])];
        arr1 = [...arr1.slice(0, index), ...arr1.slice(index + 1)];

        let obj = {
          ...user,
          favoriteExercises: [...arr1],
        };

        // @ts-ignore
        dispatch(setUser({ ...obj }));
      }

      setLoading(undefined);
      setShow(undefined);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  const onSelect = (id: any) => {
    let arr: any[] = [...select];
    let foundIndex = select.findIndex((a) => a === id);

    if (foundIndex === -1) {
      arr.push(id);
    } else {
      arr = [...arr.slice(0, foundIndex), ...arr.slice(foundIndex + 1)];
    }

    setSelect([...arr]);
  };

  const onAdd = async () => {
    setLoadingSelect(true);
    try {
      let arr: Exercise[] = [...exercises];
      let newArr: Exercise[] = [...(favoriteExercises ?? [])];

      for (let i = 0; i < select.length; i++) {
        await ApiService.put(`/users/add-favorite-exercise/${user?._id}`, {
          exerciseId: select[i],
        });

        const found = arr.find((e) => e._id === select[i]);
        found && newArr.push(found);
        arr = arr.filter((e) => e._id !== select[i]);
      }

      let obj = {
        ...user,
        favoriteExercises: [...newArr],
      };

      // @ts-ignore
      const resUser = await ApiService.get<Response<User>>("/users/me");
      dispatch(setUser(resUser.data));
      showSuccessToast("Успешно добавлено!");
      setLoadingSelect(false);
    } catch (e) {
      setLoadingSelect(false);
      console.log("e: ", JSON.stringify(e, null, 4));
    }
  };

  return {
    isFavorite,
    setIsFavorite,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    exerciseCategories,
    language,
    exercises,
    onRemove,
    loading,
    show,
    setShow,
    select,
    setSelect,
    onSelect,
    onAdd,
    loadingSelect,
    i18n,
  };
};
