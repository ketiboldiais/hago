import { getSum } from './getSum';

export function getMean(list: number[]) {
  const sum = getSum(list);
  const numberOfElements = list.length;
  const result = sum / numberOfElements;
  return result;
}

// const test = [1, 2, 4, 1, 8, 9];
// const res = getMean(test);
// res
