import { BaseProps } from '../BaseProps';
import { ElementPointerArray } from './ElementPointerArray';
import { ArrayData } from './ArrayData';

export interface QueueProps extends BaseProps {
  data: ArrayData;
  pointers: ElementPointerArray;
  reverseIndex?: boolean;
  fontSize?: number;
  startIndex?: number;
}
