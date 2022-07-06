import { getMaxPrecision } from './getMaxPrecision';
import { getMin } from './getMin';
import { getPrecisionBoundedList } from './getPrecisionBoundedList';

/**
 * @public
 * Returns the smallest most precise number
 * within the array argument.
 *
 * For example, given the array:
 *   const x = [1.23, 1.21, 1.1, 3.2, 5.31, 2.1, 6.31];
 * calling:
 *   getMostPreciseMin(x);
 * returns:
 *   {min: 1.21, atIndex: 1};
 */
export function getMostPreciseMin(list: number[]) {
  const maxPrecision = getMaxPrecision(list);
  const precisionBoundedList = getPrecisionBoundedList(list, maxPrecision);
  const result = getMin(precisionBoundedList);
  return result;
}
