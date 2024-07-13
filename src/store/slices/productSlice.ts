import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Product } from "../../types";

const initialState: Product[] = [];

const {
  actions: {
    setProducts,
    addProduct,
    addProductByIndex,
    removeProduct,
    clearProducts,
  },
  reducer,
} = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      return [...action.payload];
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      return [...state, action.payload];
    },

    addProductByIndex: (
      state,
      action: PayloadAction<{ index: number; product: Product }>
    ) => {
      return [
        ...state.slice(0, action.payload.index),
        action.payload.product,
        ...state.slice(action.payload.index + 1),
      ];
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    },

    clearProducts: () => {
      return [...initialState];
    },
  },
});

export {
  setProducts,
  addProduct,
  addProductByIndex,
  removeProduct,
  clearProducts,
};

export const selectProducts = ({ products }: RootState) => products;

export default reducer;
