import { IsDefined } from '../TypeChecks';

export type FunctionElement = {
  f: Function;
  scale?: number;
  color?: string;
};
export function IsAFunctionElement(datum: any): boolean {
  return IsDefined((datum as FunctionElement).f);
}
