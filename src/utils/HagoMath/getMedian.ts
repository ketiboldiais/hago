import { IsEven } from './IsEven';
import { Quicksort } from './Quicksort';

/**
 * @public
 * Gets the median within an array of numbers.
 */

export function getMedian(list: number[]) {
  const orderedList = Quicksort(list);
  const listLength = list.length;
  let median: number;
  if (IsEven(listLength)) {
    const half = listLength / 2;
    const lower = list[half];
    const upper = list[half + 1];
    const sumLowerUpper = lower + upper;
    median = sumLowerUpper >> 1;
  } else {
    const middle = (listLength + 1) / 2;
    median = list[middle];
  }
  return { median, orderedList };
}

// const n = getMedian([1, 11.5, 6, 7.2, 4, 8, 9, 10, 6.8, 8.3, 2, 2, 10,2,1]);
// n;
