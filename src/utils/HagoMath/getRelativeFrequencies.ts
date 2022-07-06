import { getFrequencies } from './getFrequencies';
// function getFrequencies(list: number[]) {
//   const result = list.reduce((obj, b) => {
//     obj[b] = ++obj[b] || 1;
//     return obj;
//   }, {});
//   return result;
// }

export function getRelativeFrequencies(list: number[]) {
  const length = list.length;
  const res = getFrequencies(list);
  for (let key in res) {
    res[key] = res[key] / length;
  }
  return res;
}

// test
// const x = [1, 1, 2, 4, 5, 8, 2, 1];
// const y = getRelativeFrequencies(x);
// y;
