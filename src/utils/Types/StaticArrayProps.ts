import { BaseProps } from '../BaseProps';
import { ArrayData } from './ArrayData';
import { ElementPointerArray } from './ElementPointerArray';

export interface StaticArrayProps extends BaseProps {
  data: ArrayData;
  pointers: ElementPointerArray;
  reverseIndex?: boolean;
  startIndex?: number;
}
