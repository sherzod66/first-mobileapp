import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileStackParamList } from "..";
import { MAIN, PROFILE } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { selectTrainer } from "../../../../store/slices/appSlice";
import { Response, User } from "../../../../types";
import { MainStackParamList } from "../../main";

export type TrainersScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  MAIN.TRAINERS
>;

export type TrainersScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.TRAINERS
>;
export type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export const UsersHooks = () => {
  const [active, setActive] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const trainer = useSelector(selectTrainer);

  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProp<ProfileStackParamList, PROFILE.USERS>>();

  const getUsers = async () => {
    try {
      console.log("====================================");
      console.log("GETTING USERS");
      console.log("====================================");
      const resUsers = await ApiService.get<Response<User[]>>(`/users`);
      setUsers(resUsers.data);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  useEffect(() => {
    console.log({ tr: route.params.isTrainer });

    if (route.params.isTrainer) {
      setUsers(trainer?.disciples || []);
    } else {
      getUsers();
    }
  }, []);

  const onUserPress = (user: User) => {
    //@ts-ignore
    if (route.params.isTrainer) {
      navigation.navigate(PROFILE.STUDENT_DATA, { apprenticeId: user._id });
    } else {
      navigation.navigate(PROFILE.USER, { id: user._id });
    }
  };

  const filteredUsers = !!search
    ? users.filter(
        (e) => e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    : users;

  return {
    search,
    setSearch,
    active,
    setActive,
    users: filteredUsers,
    onUserPress,
  };
};
