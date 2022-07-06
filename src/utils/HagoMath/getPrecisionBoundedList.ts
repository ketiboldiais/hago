/**
 * @description
 * Returns an array of elements within
 * the precision bound. If no elements are within
 * the precision bound, an empty array is returned.
 *
 * Example:
 * Given the array:
 *  const x = [1.12, 1.14, 1.21, 1.2, 2.3, 2.12, 2.14]
 *
 * Calling:
 *  getPrecisionBoundedList(x, 2);
 *
 * Returns:
 *   [ 1.12, 1.14, 1.21, 2.12, 2.14 ]
 */

import { getPrecision } from './getPrecision';

export function getPrecisionBoundedList(
  list: number[],
  precisionBound: number
) {
  let result: number[] = [];
  const arrLength = list.length;
  for (let i = 0; i < arrLength; i++) {
    const current = list[i];
    const currentPrecision = getPrecision(list[i]);
    if (currentPrecision === precisionBound) result.push(current);
  }
  return result;
}
