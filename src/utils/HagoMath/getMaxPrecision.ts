import { getPrecision } from './getPrecision';

/**
 * @description
 * Returns the maximum number of
 * decimal places given each element
 * in the array.
 *
 * For example, given the array:
 *   const x = [1.12, 1.14, 1.21, 1.2, 2.3, 2.12, 2.14]
 *
 * calling:
 *   getMaxPrecision(x)
 *
 * returns:
 *   2
 */
export function getMaxPrecision(list: number[]) {
  let max_precision = -Infinity;
  const arrLength = list.length;
  for (let i = 0; i < arrLength; i++) {
    const current_element = list[i];
    const precision_of_current_element = getPrecision(current_element);
    max_precision =
      precision_of_current_element > max_precision
        ? precision_of_current_element
        : max_precision;
  }
  return max_precision;
}
