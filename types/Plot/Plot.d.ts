/// <reference types="react" />
declare type FunctionElement = {
    f: Function;
    scale?: number;
    color: string;
};
export interface PlotProps {
    data?: FunctionElement[];
    domain?: [number, number];
    range?: [number, number];
    ticks?: number;
    xTicks?: number;
    yTicks?: number;
    samples?: number;
    className?: string;
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    margins?: number[];
    scale?: number;
    cwidth?: number;
    cheight?: number;
    id?: string;
}
export declare const Plot: ({ data, id, domain, range, ticks, xTicks, yTicks, samples, className, width, height, scale, cwidth, cheight, margins, }: PlotProps) => JSX.Element;
export {};
