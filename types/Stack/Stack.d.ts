/// <reference types="react" />
import { BaseProps, StackData } from '../utils';
export interface StackProps extends BaseProps {
    data: StackData;
    scale?: number;
    fwidth?: number;
    fheight?: number;
}
export declare const Stack: ({ data, className, id, width, height, fwidth, fheight, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, }: StackProps) => JSX.Element;
