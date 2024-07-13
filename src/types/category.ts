import { BaseData, MultiLanguageName } from ".";

export type Category = BaseData & {
  name: MultiLanguageName;
  type: CategoryType;
  parent: Category | string | null;
  children: Category[];
};

export enum CategoryType {
  EXERCISE = "EXERCISE",
  PRODUCT = "PRODUCT",
  DISH = "DISH",
}

// export type CategoryType = "EXERCISE" | "PRODUCT" | "DISH";
