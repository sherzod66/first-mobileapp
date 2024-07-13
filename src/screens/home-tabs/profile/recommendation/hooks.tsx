import { useState } from "react";

export const RecommendationHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};
