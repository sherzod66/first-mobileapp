import { useState } from "react";

export const MyTrainerHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};
