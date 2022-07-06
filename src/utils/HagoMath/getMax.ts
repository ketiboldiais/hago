export function getMax(list: number[]) {
  let length = list.length;
  let atIndex = length;
  let max = -Infinity;
  while (length--) {
    if (list[length] > max) {
      max = list[length];
      atIndex = length;
    }
  }
  return { max, atIndex };
}

// const test = [1, 2, 1, 8, 0, 8, 1, 2, 3, 8];
// const res = getMax(test);
// res;
