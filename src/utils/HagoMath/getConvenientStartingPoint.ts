import { getMaxPrecision } from './getMaxPrecision';
import { getMin } from './getMin';

/**
 * Returns a convenient starting point
 * to use for intervals, given an array of
 * numbers.
 *
 * For example, given the array:
 *   const x = [3.12, 3.19, 3.2, 4.25, 5.1, 8.9, 9.002, 1.221];
 * Calling:
 *   getConvenientStartingPoint(x);
 * Returns:
 *   1.2205000000000001
 */

export function getConvenientStartingPoint(list: number[]) {
  const min = getMin(list).min;
  const precisionBound = getMaxPrecision(list) + 1;
  const multiplier = 10 ** precisionBound;
  const offset = 5 / multiplier;
  return min - offset;
}
