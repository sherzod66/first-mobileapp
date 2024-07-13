import { useEffect, useState } from "react";
import { useRedux } from "../../../../store/hooks";
import { selectUser } from "../../../../store/slices/appSlice";

export const NutritionLayoutHooks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [user] = useRedux(selectUser);

  useEffect(() => {
    // console.log("user: ", JSON.stringify(user, null, 4));
  }, []);

  return { activeTab, setActiveTab };
};
