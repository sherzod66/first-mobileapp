import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RouteProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { GENDER, Trainer, Response, ROLES } from "../../../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/slices/appSlice";
import EventEmitter from "../../../../utils/EventEmitter";

export type TrainersScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  MAIN.TRAINERS
>;

export type TrainersScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.TRAINERS
>;

export const TrainersHooks = () => {
  const [active, setActive] = useState(0);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [search, setSearch] = useState("");
  const user = useSelector(selectUser);
  const isSuperAdmin = user?.role === ROLES.SUPERADMIN;

  const navigation = useNavigation<TrainersScreenNavigationProp>();
  const route = useRoute<TrainersScreenRouteProp>();
  const { individual, workout } = route.params ?? {};

  const getTrainers = async () => {
    try {
      const resTrainers = await ApiService.get<Response<Trainer[]>>(
        `/trainers?gender=${active ? GENDER.FEMALE : GENDER.MALE}`
      );
      setTrainers(resTrainers.data);
    } catch (e) {}
  };

  // useFocusEffect(() => {
  //   getTrainers();
  // });

  useEffect(() => {
    getTrainers();
  }, [active]);

  useEffect(() => {
    EventEmitter.addListener("refreshTrainers", getTrainers);
    return () => EventEmitter.removeListener("refreshTrainers", getTrainers);
  }, []);

  const onPress = (index: number) => {
    navigation.navigate(MAIN.TRAINER, { trainer: trainers[index] });
  };

  const onCreateTrainer = () => {
    navigation.navigate(MAIN.CREATE_TRAINER);
  };

  const filteredTrainers = !!search
    ? trainers.filter(
        (e) => e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    : trainers;

  return {
    search,
    setSearch,
    active,
    setActive,
    trainers: filteredTrainers,
    onPress,
    individual,
    isSuperAdmin,
    onCreateTrainer,
    workout,
  };
};
