import { IsInteger } from './IsInteger';

export function IsEven(val: number) {
  if (IsInteger(val)) {
    let result = Math.abs(val) & 1;
    return result ? false : true;
  } else {
    throw new Error('Value passed is not an integer.');
  }
}
