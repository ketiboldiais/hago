export function getMin(data: string | any[], key: string | number) {
  let min = data[0][key];
  const length = data.length;
  if (length === 1) return { min, atIndex: 0 };
  else {
    let atIndex: number;
    for (let i = 1; i < length; i++) {
      let current = data[i][key];
      if (min < current) {
        min = min;
      } else {
        min = current;
        atIndex = i;
      }
    }
    return { min, atIndex };
  }
}

export function getMax(data: string | any[], key: string | number) {
  let max = data[0][key];
  const length = data.length;
  if (length === 1) return { max, atIndex: 0 };
  else {
    let atIndex: number;
    for (let i = 1; i < length; i++) {
      let current = data[i][key];
      max = max > current ? max : current;
      atIndex = i;
    }
    return { max, atIndex };
  }
}

export function getSum(
  data: { dataset: string | any[] },
  key: string | number
) {
  let sum = 0;
  let length = data.dataset.length;
  for (let i = 0; i < length; i++) {
    let current = data.dataset[i][key];
    sum += current;
  }
  return sum;
}

export function getValCount(
  data: { dataset: string | any[] },
  key: string | number
) {
  let count = 0;
  for (let i = 0; i < data.dataset.length; i++) {
    if (data.dataset[i][key] !== undefined) count++;
  }
  return count;
}

export function getMean(data: any, key: any) {
  let sum = getSum(data, key);
  let count = getValCount(data, key);
  return sum / count;
}

export function countDecimalPlaces(val: number) {
  if (Math.floor(val) === val) return 0;
  return val.toString().split('.')[1].length || 0;
}

export function getDecimalPlaceLowerBound(
  data: { dataset: string | any[] },
  key: string | number
) {
  let currentLower = countDecimalPlaces(data.dataset[0][key]);
  for (let i = 1; i < data.dataset.length; i++) {
    let entry = data.dataset[i][key];
    let entryDecimalPlaces = countDecimalPlaces(entry);
    currentLower =
      entryDecimalPlaces < currentLower ? entryDecimalPlaces : currentLower;
  }
  return currentLower;
}

export function getDecimalPlaceUpperBound(
  data: { dataset: string | any[] },
  key: string | number
) {
  let currentUpper = countDecimalPlaces(data.dataset[0][key]);
  for (let i = 1; i < data.dataset.length; i++) {
    let entry = data.dataset[i][key];
    let entryDecimalPlaces = countDecimalPlaces(entry);
    currentUpper =
      entryDecimalPlaces > currentUpper ? entryDecimalPlaces : currentUpper;
  }
  return currentUpper;
}

export function getSmallestValueWithLeastDecimalPlaces(
  data: { dataset: any[] },
  key: string | number
) {
  const bound = getDecimalPlaceLowerBound(data, key);
  const boundedData = data.dataset.filter((d: { [x: string]: number }) => {
    return countDecimalPlaces(d[key]) <= bound;
  });
  boundedData;
  return getMin(boundedData, key)['min'];
}

export function getLargestValueWithLeastDecimalPlaces(
  data: { dataset: any[] },
  key: string | number
) {
  const bound = getDecimalPlaceLowerBound(data, key);
  const boundedData = data.dataset.filter((d: { [x: string]: number }) => {
    return countDecimalPlaces(d[key]) <= bound;
  });
  boundedData;
  return getMin(boundedData, key)['max'];
}

export function getSmallestValueWithMostDecimalPlaces(
  data: { dataset: any[] },
  key: string | number
) {
  const bound = getDecimalPlaceUpperBound(data, key);
  const boundedData = data.dataset.filter((d: { [x: string]: number }) => {
    return countDecimalPlaces(d[key]) >= bound;
  });
  boundedData;
  return getMin(boundedData, key)['min'];
}

export function getLargestValueWithMostDecimalPlaces(
  data: { dataset: any[] },
  key: string | number
) {
  const bound = getDecimalPlaceUpperBound(data, key);
  const boundedData = data.dataset.filter((d: { [x: string]: number }) => {
    return countDecimalPlaces(d[key]) >= bound;
  });
  boundedData;
  return getMax(boundedData, key)['max'];
}

export function getConvenientStartingPoint(data: { dataset: any }, key: any) {
  const smallest_value_with_most_decimal_places =
    getSmallestValueWithMostDecimalPlaces(data, key);
  const smallest_value = getMin(data.dataset, key)['min'];
  if (smallest_value_with_most_decimal_places === smallest_value) {
    return smallest_value - 0.05;
  } else {
    let n = countDecimalPlaces(smallest_value_with_most_decimal_places);
    let diff = 5 / 10 ** n;
    return smallest_value - diff;
  }
}

export function Valize(data: string | any[]) {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    let x = parseFloat(data[i][0]);
    let y = parseFloat(data[i][1]);
    let val = { x, y };
    output.push(val);
  }
  return output;
}
