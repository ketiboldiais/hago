import { Annotation } from './Annotation';

export type Element = {
  val: string | number;
  id?: string | number;
  group?: string | number;
  ant?: Annotation;
  class?: string;
};
export function isElement(datum: any) {
  return (datum as Element).val !== undefined;
}
