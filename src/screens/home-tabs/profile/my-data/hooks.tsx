import { useRoute } from "@react-navigation/native";
import { useState } from "react";

export const MyDataHooks = () => {
  const [active, setActive] = useState(0);

  const route = useRoute();

  return { active, setActive, apprenticeId: route?.params?.apprenticeId };
};
