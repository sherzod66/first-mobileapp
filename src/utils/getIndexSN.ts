import { SchemaNutrition } from "../types";

interface IProps {
  schemaNutritions?: SchemaNutrition[];
  year: number;
  month: number;
  day: number;
}

export const getIndexSN = ({ schemaNutritions, year, month, day }: IProps) =>
  (schemaNutritions ?? [])
    .map((sN) => {
      const sNDate = new Date(sN.date);
      const sNYear = sNDate.getFullYear();
      const sNMonth = sNDate.getMonth();
      const sNDay = sNDate.getDate();

      return { sNYear, sNMonth, sNDay };
    })
    .findIndex(
      ({ sNYear, sNMonth, sNDay }) =>
        sNYear === year && sNMonth === month && sNDay === day
    );
