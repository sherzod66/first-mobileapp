import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Category, CategoryType } from "../../types";

export type CategoryState = {
  EXERCISE: Category[];
  PRODUCT: Category[];
  DISH: Category[];
};

const initialState: CategoryState = {
  EXERCISE: [],
  PRODUCT: [],
  DISH: [],
};

const {
  actions: { setCategoriesByType, clearCategoriesByType, clearCategories },
  reducer,
} = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategoriesByType: (
      state,
      action: PayloadAction<{ type: CategoryType; categories: Category[] }>
    ) => {
      const { type, categories } = action.payload;

      const obj: CategoryState = { ...state };

      obj[type] = [...categories];

      return {
        ...obj,
      };
    },
    clearCategoriesByType: (state, action: PayloadAction<CategoryType>) => {
      return {
        ...state,
        [action.payload]: [],
      };
    },
    clearCategories: () => {
      return {
        ...initialState,
      };
    },
  },
});

export { setCategoriesByType, clearCategoriesByType, clearCategories };

export const selectExerciseCategories = ({
  category: { EXERCISE },
}: RootState) => EXERCISE;

export const selectProductCategories = ({ category: { PRODUCT } }: RootState) =>
  PRODUCT;

export const selectDishCategories = ({ category: { DISH } }: RootState) => DISH;

export default reducer;
