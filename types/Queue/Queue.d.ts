/// <reference types="react" />
import { BaseProps, ArrayData, ElementPointerArray } from '../utils';
export interface QueueProps extends BaseProps {
    data: ArrayData;
    pointers: ElementPointerArray;
    reverseIndex?: boolean;
    fontSize?: number;
    startIndex?: number;
}
export declare function Queue({ data, className, id, fontSize, width, height, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, }: QueueProps): JSX.Element;
