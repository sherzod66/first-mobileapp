import { Dish, Product } from "../types";
import { getSumValues } from "./getSumValues";

export const convertDishToProduct = (dish: Dish): Product => {
  const { products, amounts } = dish;

  return {
    ...dish,
    name: {
      en: dish.name,
      ru: dish.name,
      uz: dish.name,
    },
    calories: getSumValues(products, amounts, "calories"),
    protein: getSumValues(products, amounts, "protein"),
    oil: getSumValues(products, amounts, "oil"),
    carb: getSumValues(products, amounts, "carb"),
  };
};
