import { useState } from "react";
import { useRedux } from "../../../../store/hooks";
import { selectUser } from "../../../../store/slices/appSlice";

export const useTrainerStatistic = () => {
  const [user, dispatch] = useRedux(selectUser);
  const [activeTab, setActiveTab] = useState(0);

  return { user, activeTab, setActiveTab };
};
