import { IsInteger } from './IsInteger';

export function IsOdd(val: number) {
  if (IsInteger(val)) {
    let result = Math.abs(val) & 1;
    return result ? true : false;
  } else {
    throw new Error('Value passed is not an integer.');
  }
}
