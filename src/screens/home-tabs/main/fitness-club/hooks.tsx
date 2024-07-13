import { RouteProp, useRoute } from "@react-navigation/native";
import { MainStackParamList } from "..";
import { MAIN } from "../../../../navigation/ROUTES";
import { Linking, Alert } from "react-native";
import { ApiService } from "../../../../services";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/slices/appSlice";

export type TrainerScreenRouteProp = RouteProp<
  MainStackParamList,
  MAIN.FITNESS_CLUB
>;

export const TrainerHooks = () => {
  const route = useRoute<TrainerScreenRouteProp>();
  const { trainer } = route.params ?? {};
  const user = useSelector(selectUser);

  const openLink = (link: string) => () => {
    Linking.openURL(link);
  };

  const onPlansPress = (planType: string) => () => {
    Alert.alert("Внимание", `Пока нету ${planType}`);
  };

  const onApplicationPress = async () => {
    try {
      const res = await ApiService.put(
        "/trainers/request-add-trainer/" + trainer._id,
        { discipleId: user?._id }
      );
      Alert.alert("Внимание", `Ваша заявка принята`);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return { trainer, openLink, onPlansPress, onApplicationPress };
};
