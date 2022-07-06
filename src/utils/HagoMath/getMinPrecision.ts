import { getPrecision } from './getPrecision';

/**
 * @description
 * Returns the minimum number of
 * decimal places given each element
 * in the array
 */
export function getMinPrecision(list: number[]) {
  let min_precision = Infinity;
  const arrLength = list.length;
  for (let i = 0; i < arrLength; i++) {
    const current_element = list[i];
    const precision_of_current_element = getPrecision(current_element);
    min_precision =
      precision_of_current_element < min_precision
        ? precision_of_current_element
        : min_precision;
  }
  return min_precision;
}

const test = getMinPrecision([1.12, 1.14, 1.21, 1.2, 2.3, 2.12, 2.14]);
test;
