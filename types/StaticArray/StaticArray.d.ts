/// <reference types="react" />
import { BaseProps, ArrayData, ElementPointerArray } from '../utils';
export interface StaticArrayProps extends BaseProps {
    data: ArrayData;
    pointers: ElementPointerArray;
    reverseIndex?: boolean;
    startIndex?: number;
}
export declare function StaticArray({ data, pointers, reverseIndex, startIndex, className, id, width, height, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, }: StaticArrayProps): JSX.Element;
