import { BaseData, MultiLanguageName } from ".";
import { Category } from "./category";
import { Trainer } from "./trainer";
import { User } from "./user";

export type Product = BaseData & {
  name: MultiLanguageName;
  calories: number;
  protein: number;
  oil: number;
  carb: number;
  category: Category;
  creatorTrainer?: Trainer;
  creatorUser?: User;
};
