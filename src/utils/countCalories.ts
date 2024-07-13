export const countCalories = (p: string, o: string, c: string): number => {
  const count = +p * 4 + +o * 9 + +c * 4;
  return count;
};
