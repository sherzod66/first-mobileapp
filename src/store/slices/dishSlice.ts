import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Dish } from "../../types";

const initialState: Dish[] = [];

const {
  actions: { setDishes, addDish, addDishByIndex, removeDish, clearDishes },
  reducer,
} = createSlice({
  name: "dishSlice",
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      return [...action.payload];
    },

    addDish: (state, action: PayloadAction<Dish>) => {
      return [...state, action.payload];
    },

    addDishByIndex: (
      state,
      action: PayloadAction<{ index: number; dish: Dish }>
    ) => {
      return [
        ...state.slice(0, action.payload.index),
        action.payload.dish,
        ...state.slice(action.payload.index + 1),
      ];
    },

    removeDish: (state, action: PayloadAction<number>) => {
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    },

    clearDishes: () => {
      return [...initialState];
    },
  },
});

export { setDishes, addDish, addDishByIndex, removeDish, clearDishes };

export const selectDishes = ({ dishes }: RootState) => dishes;

export default reducer;
