import { MemoryElement } from './MemoryElement';
import { IsDefined } from '../TypeChecks';

export type RegisterObject = {
  val: MemoryElement | string | number | boolean;
  a?: string | number;
  id?: string;
  s?: number;
  className?: string;
  display?: 'block' | 'none';
};

export function IsRegisterObject(datum: any) {
  return IsDefined(
    (datum as RegisterObject).a && IsDefined((datum as RegisterObject).val)
  );
}
