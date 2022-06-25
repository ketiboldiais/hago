/// <reference types="react" />
import { BaseProps, Literal } from '../utils';
declare type MemoryElement = {
    val: Literal;
    a?: string;
    id?: string;
    className: string;
    display?: 'block' | 'none';
    s?: number;
};
declare type RegisterObject = {
    val: MemoryElement | string | number | boolean;
    a?: string | number;
    id?: string;
    s?: number;
    className?: string;
    display?: 'block' | 'none';
};
declare type RegisterArray = (RegisterObject | MemoryElement | Literal)[] | string;
export interface MemProps extends BaseProps {
    data: RegisterArray;
    cellWidth?: number;
    cellHeight?: number;
    dataSize?: number;
    startAddressAt?: number;
    addressLength?: number;
}
export declare function Mem({ data, className, id, addressLength, cellWidth, cellHeight, dataSize, startAddressAt, width, height, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, }: MemProps): JSX.Element;
export {};
