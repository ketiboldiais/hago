import { getRelativeFrequencies } from './getRelativeFrequencies';

export function getCumulativeRelativeFrequencies(list: number[]) {
  let res = getRelativeFrequencies(list);
  let keys = [];
  let vals = [];
  let entryCount = 0;
  for (let key in res) {
    vals.push(res[key]);
    keys.push(key);
    entryCount++;
  }
  let output = {};
  output[keys[0]] = vals[0];
  let sum = vals[0];
  for (let i = 1; i < entryCount; i++) {
    sum = vals[i] + output[keys[i - 1]];
    output[keys[i]] = sum;
  }
  return output;
}
