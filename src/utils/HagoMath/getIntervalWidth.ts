/**
 * Computes the ideal interval width
 * for a given data set.
 * @param number_of_data_values
 *  - The length number of data points (for arrays,
 *    the array length)
 * Example:
 * Given 150 data points, the ideal interval is:
 *   getIntervalWidth(150) => 12
 */

export function getIntervalWidth(number_of_data_values: number) {
  const x = Math.sqrt(number_of_data_values);
  const result = Math.round(x);
  return result;
}
