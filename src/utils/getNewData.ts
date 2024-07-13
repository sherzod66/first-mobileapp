export const getNewData = (arr1: any[] = [], arr2: any[] = []) => {
  let arr: any[] = [];

  arr1.map((a) => {
    const found = arr2.find((aa) => a._id === aa._id);

    if (!found) {
      arr.push(a);
    }
  });

  return arr;
};
