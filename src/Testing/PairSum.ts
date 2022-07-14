const getExecutionTime = (func: Function, args: any[]) => {
  let start = performance.now();

  func.apply(null, args);

  let stop = performance.now();

  const time = stop - start;
  return time;
};

const pairSum1 = (arr: number[], S: number) => {
  const arrayLength = arr.length;
  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < arrayLength; j++) {
      if (arr[i] + arr[j] === S) return [arr[i], arr[j]];
    }
  }
  return [];
};

const pairSum2 = (arr: number[], target: number) => {
  const arrayLength = arr.length;
  const sortedArr = arr.sort();

  let start = 0;
  let end = arrayLength - 1;
  let middle: number;

  while (start <= end) {
    middle = Math.floor((start + end) / 2);

    let left = middle - 1 < 0 ? 0 : middle - 1;
    let sum = sortedArr[left] + sortedArr[middle];

    if (sum === target) return [sortedArr[left], sortedArr[middle]];
    else if (sum < target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
};

const pairSum3 = (arr: number[], target: number) => {
  const arrayLength = arr.length;
  let numset = new Set();
  for (let i = 0; i < arrayLength; i++) {
    let current = arr[i];
    let diff = target - current;
    if (numset.has(diff)) {
      return [diff, current];
    } else {
      numset.add(current);
    }
  }
};

const shuffle = (array: number[]) => {
  let tmp: number;
  let current: number;
  let top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

function generateRandomArray(length: number) {
  let arr = [];
  for (let i = 0; i < length; ++i) {
    arr[i] = i;
  }
  arr = shuffle(arr);
  return arr;
}

const arr = generateRandomArray(100);

const ComparisonTest = (
  funcs: Function[],
  startInput: number,
  interval: number,
  maxInputs: number,
  groupNames: string[]
) => {
  let results = [];
  const testArrays = [];
  const functionCount = funcs.length;
  for (let i = startInput; i < maxInputs; i += interval) {
    const arr = generateRandomArray(i);
    testArrays.push(arr);
  }
  const testArrCount = testArrays.length;
  for (let i = 0; i < testArrCount; i++) {
    let currentArray = testArrays[i];
    let inputCount = currentArray.length;
    for (let j = 0; j < functionCount; j++) {
      let f = funcs[j];
      let time = getExecutionTime(f, [currentArray]);
      let x = inputCount;
      let y = time * 100;
      let g = groupNames[j];
      results.push({ x, y, g });
    }
  }
  return results;
};

const report = ComparisonTest([pairSum1, pairSum2, pairSum3], 1000, 50, 2000, [
  'pairSum1',
  'pairSum2',
  'pairSum3',
]);

console.log(report);

// const test1 = getExecutionTime(pairSum1, [arr])
// const test2 = getExecutionTime(pairSum2, [arr])
// const test3 = getExecutionTime(pairSum3, [arr])

// test1
// test2
// test3
