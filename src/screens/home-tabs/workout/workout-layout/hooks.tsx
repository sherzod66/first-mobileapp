import { useState } from "react";

export const WorkoutLayoutHooks = () => {
  const [activeTab, setActiveTab] = useState(0);

  return { activeTab, setActiveTab };
};
