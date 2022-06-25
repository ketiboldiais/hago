/// <reference types="react" />
import { Coordinate } from './BaseProps';
declare type Anchor = 'start' | 'middle' | 'end';
declare type TextAlignment = 'right' | 'center' | 'left' | 'justify';
interface TextProps {
    val: number | string | boolean;
    fontSize?: number;
    color?: string;
    pos?: Coordinate;
    dx?: number;
    dy?: number;
    anchor?: Anchor;
    align?: TextAlignment;
}
export declare function Text({ val, fontSize, color, pos, dx, dy, anchor, }: TextProps): JSX.Element;
export {};
