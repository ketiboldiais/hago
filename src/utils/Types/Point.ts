import { IsDefined } from '../TypeChecks';

/**
 * @type { Point } an object {x: n, y: n}, where n is a number type value
 */
export type Point = { x: number; y: number; className?: string };

/**
 * Checks whether the argument `datum` is of type Point
 */
export function IsAPoint(datum: any): boolean {
  return IsDefined((datum as Point).x) && IsDefined((datum as Point).y);
}
