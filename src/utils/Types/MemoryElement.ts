import { Literal } from './Literal';

export type MemoryElement = {
  val: Literal;
  a?: string;
  id?: string;
  className: string;
  display?: 'block' | 'none';
  s?: number;
};
