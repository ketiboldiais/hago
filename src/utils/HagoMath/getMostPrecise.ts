import { getMaxPrecision } from './getMaxPrecision';
import { getPrecision } from './getPrecision';

/**
 * @public
 * Returns the element in the list
 * with the most decimal places.
 * If there is more than one such element,
 * the last element checked is returned.
 *
 * Example:
 * Given the array:
 *   const x = [3.12, 3.19, 3.2, 4.25, 5.1, 8.9, 9.002, 1.221];
 * Calling:
 *   getMostPrecise(x);
 * Returns:
 *   1.221;
 */
export function getMostPrecise(list: number[]) {
  const arrLength = list.length;
  const precisionBound = getMaxPrecision(list);
  let result;
  for (let i = 0; i < arrLength; i++) {
    const current = list[i];
    const currentPrecision = getPrecision(list[i]);
    if (currentPrecision >= precisionBound) {
      result = current;
    }
  }
  return result;
}
