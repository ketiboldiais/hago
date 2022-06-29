import { IsDefined } from '../TypeChecks';

export type NamedPoint = {
  x?: number;
  y: number;
  id?: string;
  group?: string | number;
};

export function IsANamedPoint(datum: any) {
  return IsDefined((datum as NamedPoint).y);
}
