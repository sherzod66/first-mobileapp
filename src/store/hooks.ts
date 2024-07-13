import { useSelector, useDispatch } from "react-redux";
import equal from "fast-deep-equal";
import { RootState } from "./slices";

export const useRedux = <S extends {} = RootState, A extends unknown = unknown>(
  selector: (state: S) => A
) => {
  const state = useSelector(selector, equal);
  const dispatch = useDispatch();

  return [state, dispatch] as const;
};
