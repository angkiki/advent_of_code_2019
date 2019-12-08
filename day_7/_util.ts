export const permutation = (array: number[]): number[][] => {
  const p = (array: number[], temp: number[]) => {
    let i: number, x: number;
    if (!array.length) {
      result.push(temp);
    }
    for (i = 0; i < array.length; i++) {
      x = array.splice(i, 1)[0];
      p(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  };

  const result = [];
  p(array, []);
  return result;
};
