import { RegisterObject } from './RegisterObject';
import { MemoryElement } from './MemoryElement';
import { Literal } from './Literal';

export type RegisterArray =
  | (RegisterObject | MemoryElement | Literal)[]
  | string;
