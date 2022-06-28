import { AntObject } from './AntObject';

export type NodeObject = {
  id: string | number;
  className?: string;
  r?: number;
  ant?: AntObject;
};
