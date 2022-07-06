export function getPrecision(val: number) {
  return Math.floor(val) === val ? 0 : val.toString().split('.')[1].length || 0;
}

// const test = 3.218125;
// const res = getPrecision(test);
// res
