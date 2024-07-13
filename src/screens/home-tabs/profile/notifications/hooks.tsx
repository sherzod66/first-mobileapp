import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrainer,
  selectUser,
  setTrainer,
} from "../../../../store/slices/appSlice";
import { NOTIFICATION_TYPES, ROLES, Trainer } from "../../../../types";
import { ApiService } from "../../../../services";
import { AxiosResponse } from "axios";
import { showSuccessToast } from "../../../../utils/showToast";

export interface IUserNotification {
  type: NOTIFICATION_TYPES;
  name: string;
  data?: any;
}

export const NotificationsHooks = () => {
  const user = useSelector(selectUser);
  const [notifications, setNotifications] = useState<IUserNotification[]>([]);
  const trainer = useSelector(selectTrainer);
  const dispatch = useDispatch();
  const fetchNotifications = async () => {
    try {
      const res = await ApiService.get<AxiosResponse<Trainer>>(
        `/trainers/find/${user?.phoneNumber}`
      );
      dispatch(setTrainer(res.data));
      setNotifications(
        res.data.requestedDisciples.map((e) => {
          return {
            data: e,
            type: NOTIFICATION_TYPES.REQUSTED_DISCIPLE,
            name: e.name,
          };
        })
      );
    } catch (error) {}
  };

  const acceptDisciple = async (e: any) => {
    try {
      const res = await ApiService.put(
        "/trainers/add-disciple/" + trainer?._id,
        {
          discipleId: e._id,
        }
      );
      await fetchNotifications();
      showSuccessToast("Ученик дабавлен");
    } catch (error) {}
  };
  const removeDisciple = async (e: any) => {
    try {
      const res = await ApiService.patch(
        "/trainers/remove-disciple/" + trainer?._id,
        {
          discipleId: e?._id,
        }
      );
      await fetchNotifications();
      showSuccessToast("Ученик удален");
    } catch (error) {}
  };

  useEffect(() => {
    if (user?.role === ROLES.TRAINER) {
      fetchNotifications();
    }
  }, [user]);

  return { notifications, acceptDisciple, removeDisciple };
};
