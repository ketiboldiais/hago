import {IsInteger,getLowestFraction} from '../utils';
import {getSlope} from "./getSlope";

export function makeLinearFunction(
  point1: [number,number],
  point2: [number,number]) {
  const m = getSlope(point1,point2);
  const x = point1[0];
  const y = point1[1];
  const b = y - m * x;
  const f = (n: number) => m * n + b;
  let sign = b < 0 ? '-' : '+';
  let slope: string;
  let constant: string;
  if(IsInteger(m)) {
    slope = `${m}`;
  } else {
    const fracSlope = getLowestFraction(m);
    const denom = fracSlope.denominator;
    const numer = fracSlope.numerator;
    slope = `\\dfrac{${Math.abs(denom)}}{${Math.abs(numer)}}`;
  }
  if(IsInteger(b)) {
    constant = `${Math.abs(b)}`;
  } else {
    const fracSlope = getLowestFraction(b);
    const denom = fracSlope.denominator;
    const numer = fracSlope.numerator;
    constant = `\\dfrac{${Math.abs(denom)}}{${Math.abs(numer)}}`;
  }
  const formula = `y = ${slope}x ${sign} ${constant}`;
  return {f,formula};
}
