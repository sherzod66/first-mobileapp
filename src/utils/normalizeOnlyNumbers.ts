let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const normalizeOnlyNumbers = (value: string) => {
  let newValue = "";

  for (let i = 0; i < value.length; i++) {
    if (nums.find((n) => n === value[i])) {
      newValue = newValue + value[i];
    }
  }

  return Number(newValue);
};
