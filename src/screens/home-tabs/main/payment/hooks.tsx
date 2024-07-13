import { useState } from "react";

export const PaymentHooks = () => {
  const [state, setState] = useState("");

  return { state, setState };
};
