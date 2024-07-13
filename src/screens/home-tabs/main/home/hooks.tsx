import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IAdItem } from "../../profile/ads/ad-item";
import { ApiService } from "../../../../services";
import { AxiosResponse } from "axios";

export const MainHomeHooks = () => {
  const navigation = useNavigation();
  const [ads, setAds] = useState<IAdItem[]>([]);

  const onPress = (route: never) => {
    navigation.navigate(route);
  };

  const fetchAds = async () => {
    try {
      let res = await ApiService.get<AxiosResponse<IAdItem[]>>("/ads");
      setAds(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return {
    onPress,
    ads,
    fetchAds,
  };
};
