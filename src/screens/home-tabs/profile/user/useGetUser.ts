import { useEffect, useMemo, useState } from "react";
import { Response, User } from "../../../../types";
import { ApiService } from "../../../../services";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PROFILE } from "../../../../navigation/ROUTES";
import { ProfileStackParamList } from "..";

export type UserScreenRouteProp = RouteProp<
  ProfileStackParamList,
  PROFILE.USER
>;

export type TIsShow = {
  favoriteExercise: boolean;
  product: boolean;
  dishes: boolean;
  role: boolean;
  isPro: boolean;
};
const isShowDefault: TIsShow = {
  dishes: true,
  favoriteExercise: true,
  isPro: true,
  product: true,
  role: true,
};

export const useGetUser = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isShow, setIsShow] = useState<TIsShow>(isShowDefault);
  const route = useRoute<UserScreenRouteProp>();
  const [invalidates, setInvalidates] = useState<boolean>(false);
  const { id } = route.params;

  const getUser = async () => {
    try {
      setLoading(true);
      const req = await ApiService.get<Response<User>>(`/users/${id}`);
      setUser(req.data);
      setLoading(false);
    } catch (e) {
      setUser(null);
      setLoading(false);
    }
  };
  const openList = (value: keyof TIsShow) => {
    setIsShow((prev) => ({ ...prev, [value]: !isShow[value] }));
  };

  useEffect(() => {
    getUser();
  }, [id, invalidates]);

  const changeRole = async (
    value: "SUPERADMIN" | "ADMIN" | "TRAINER" | "USER"
  ) => {
    try {
      const req = await ApiService.patch<Response<User>>(
        `/users/update-role/${user?._id}`,
        { role: value }
      );
      console.log(value);
      setInvalidates(true);
    } catch (e) {
      setInvalidates(false);
      console.log(e);
    }
  };

  return useMemo(
    () => ({ isLoading, user, openList, isShow, changeRole }),
    [isLoading, user, isShow]
  );
};
