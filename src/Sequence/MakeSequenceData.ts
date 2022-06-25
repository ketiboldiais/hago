import {
  SequenceData,
  Point,
  IsAFunctionElement,
  SequenceFunction,
  HagoError,
} from '../utils';
import { ReturnLarger, ReturnSmaller } from '../utils/HagoMath/Comparators';

/**
 * @return `data` - an object containing three parts:
 *   1. an array of Points (cartesian coordinates),
 *   2. `min_x`, the maximum x value (used as upperbound for xscale rendering)
 *   3. `max_x`, the minimum x value (used as lowerbound for yscale rendering)
 * Because the input is a `SequenceData` type, it can
 * take the form of either:
 *
 * Case 1. An array of 2-tuples, e.g.,
 *
 *   [ [0,1], [1,2], [2,3], ... ]
 *
 * Case 2. An array of sequence function elements, e.g.,
 *
 *  [
 *   {f: (n) => n**2, start: 0, end: 10},
 *   {f: (n) => n**3, start: 0, end: 10},
 *   {f: (n) => n**4, start: 0, end: 10},
 *   ...
 *  ]
 *
 * Case 2 is really a subset of Case 1, since the constructors
 * are both arrays.
 *
 * Case 3. Or just a single function, e.g.,
 *
 *   (n) => n**2 + 1
 *
 * Thus, `makeSequenceData` must handle each case.
 */

export function MakeSequenceData(
  input: SequenceData,
  start: number = 0,
  end: number = 10
) {
  let data: Point[] = [];
  let datum: Point;
  let yMin = 0;
  let yMax = 0;
  let xMin = start;
  let xMax = end;

  // Cases 1 and 2
  if (input.constructor === Array) {
    for (let i = 0; i < input.length; i++) {
      // Check if the constructor for the input element is an array
      // if it is, just create a new point object.
      if (
        input[i].constructor === Array &&
        (input[i] as number[]).length === 2
      ) {
        const x = input[i][0];
        const y = input[i][1];

        // update bounds
        yMin = ReturnSmaller(yMin, y);
        yMax = ReturnLarger(yMax, y);
        xMin = ReturnSmaller(xMin, x);
        xMax = ReturnLarger(xMax, x);

        datum = { x, y };
        data.push(datum);
      }

      // If it is not, check if it's a SequenceFunction
      else if (IsAFunctionElement(input[i])) {
        const _start = (input[i] as SequenceFunction).start
          ? (input[i] as SequenceFunction).start
          : start;
        const _end = (input[i] as SequenceFunction).end
          ? (input[i] as SequenceFunction).end
          : end;

        for (let i = _start; i < _end; i++) {
          const x = i;
          const y = (input[i] as SequenceFunction).f(i);

          // update bounds
          yMin = ReturnSmaller(yMin, y);
          yMax = ReturnLarger(yMax, y);
          xMin = ReturnSmaller(xMin, x);
          xMax = ReturnLarger(xMax, x);

          datum = { x, y };
          data.push(datum);
        }
      }

      // If it's not, then the array input is incorrect
      else {
        throw new HagoError('Invalid array argument.');
      }
    }
  }

  // Case 3 is
  else if (input.constructor === Function) {
    for (let i = start; i < end; i++) {
      const x = i;
      const y = (input as Function)(i);

      yMin = ReturnSmaller(yMin, y);
      yMax = ReturnLarger(yMax, y);
      xMin = ReturnSmaller(xMin, x);
      xMax = ReturnLarger(xMax, x);

      datum = { x, y };
      console.log(datum);
      data.push(datum);
    }
  } else {
    throw new HagoError('No valid arguments passed.');
  }

  return { data, xMin, xMax, yMin, yMax };
}
