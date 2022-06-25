/// <reference types="react" />
declare type FunctionElement = {
    f: Function;
    scale?: number;
    color?: string;
};
export interface PolarProps {
    data: FunctionElement[];
    radius?: number;
    domain?: number[];
    range?: number[];
    className: string;
    width?: number;
    height?: number;
    cwidth?: number;
    cheight?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    margins?: number[];
}
export declare const Polar: ({ data, domain, className, width, height, radius, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, }: {
    data?: {
        f: (t: any) => number;
    }[];
    domain?: number[];
    className?: string;
    width?: number;
    height?: number;
    radius?: number;
    scale?: number;
    cwidth?: any;
    cheight: any;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    margins?: any[];
}) => JSX.Element;
export {};
