import { BaseData, Product, Category } from ".";
import { Trainer } from "./trainer";
import { User } from "./user";

export type Dish = BaseData & {
  name: string;
  products: Product[];
  amounts: number[];
  category: Category;
  creatorTrainer?: Trainer;
  creatorUser?: User;
};
