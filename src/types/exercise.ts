import { BaseData, Category, MultiLanguageName } from ".";

export type Exercise = BaseData & {
  title: MultiLanguageName;
  video: string;
  image: string;
  description: MultiLanguageName;
  metadescription: string;
  parentCategory: Category | null;
  category: Category | null;
};

export type TExercise = {
  title: MultiLanguageName;
  video: string;
  image: string;
  description: MultiLanguageName;
  metadescription: string;
  parentCategory: Category | null;
  category: Category | null;
};
