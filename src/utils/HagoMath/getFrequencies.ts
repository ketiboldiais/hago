
export function getFrequencies(list: number[]) {
  const result = list.reduce((obj, b) => {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});
  return result;
}

// tests
// const n = [1, 2, 3, 2, 1, 5];
// const res = getFrequencies(n);
// res;
