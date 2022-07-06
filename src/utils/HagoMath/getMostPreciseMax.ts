import { getMaxPrecision } from './getMaxPrecision';
import { getMax } from './getMax';
import { getPrecisionBoundedList } from './getPrecisionBoundedList';

/**
 * @public
 * Returns the smallest most precise number
 * within the array argument.
 *
 * For example, given the array:
 *   const x = [1.23, 1.21, 1.1, 3.2, 5.31, 2.1, 6.31];
 * calling:
 *   getMostPreciseMax(x);
 * returns:
 *   {max: 6.31, atIndex: 1};
 */
export function getMostPreciseMax(list: number[]) {
  const maxPrecision = getMaxPrecision(list);
  const precisionBoundedList = getPrecisionBoundedList(list, maxPrecision);
  const result = getMax(precisionBoundedList);
  return result;
}
