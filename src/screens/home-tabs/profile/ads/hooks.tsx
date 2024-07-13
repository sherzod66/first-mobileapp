import { useEffect, useState } from "react";
import { IAdItem } from "./ad-item";
import { showErrToast } from "../../../../utils/showToast";
import { ApiService } from "../../../../services";
import { BaseData } from "../../../../types";
import { AxiosResponse } from "axios";

export const useAdsHook = () => {
  const [state, setState] = useState<IAdItem>({});
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState<IAdItem[]>([]);

  const onInputChange = (key: keyof IAdItem) => (value: string) => {
    setState({ ...state, [key]: value });
  };

  const onAdSubmit = async () => {
    if (!state.imageUrl) {
      showErrToast("Пожалуйста, заполните все поля");
      return;
    }
    try {
      setLoading(true);
      let res = await ApiService.post("/ads", state);
      await fetchAds();
    } catch (error) {}
    setLoading(false);
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

  return { onInputChange, loading, onAdSubmit, ads, fetchAds };
};
