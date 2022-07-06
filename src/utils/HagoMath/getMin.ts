export function getMin(list: number[]) {
  let length = list.length;
  let atIndex = length;
  let min = Infinity;
  while (length--) {
    if (list[length] < min) {
      min = list[length];
      atIndex = length;
    }
  }
  return { min, atIndex };
}

// const test = [1, 2, 1, 8, 0, 8, 1, 2, 3, 8];
// const res = getMin(test);
// res;
