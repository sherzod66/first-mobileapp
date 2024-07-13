import { PRODUCT_AMOUNT } from "../constants/AMOUNT";
import { Product } from "../types";

export const getSumValues = (
  products: Product[],
  amounts: number[],
  key: "calories" | "protein" | "oil" | "carb"
): number =>
  products
    .map((p, i) => {
      // console.log("p: ", JSON.stringify(p, null, 4));
      let calculatedValue = 0;

      if (p.category?.type === "PRODUCT") {
        calculatedValue = (amounts[i] ?? 0) / PRODUCT_AMOUNT;
      } else {
        // @ts-ignore
        let DISH_AMOUNT = (p?.amounts as number[])?.reduce(
          (acc, val) => acc + val,
          0
        );

        calculatedValue = (amounts[i] ?? 0) / DISH_AMOUNT;
      }

      return p[key] * calculatedValue;
    })
    .reduce((acc, val) => acc + val, 0);
