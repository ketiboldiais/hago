/// <reference types="react" />
interface FunctionDatum {
    f: Function;
    class?: string;
}
export declare const FunctionPlot: (datum: FunctionDatum, xScale: any, yScale: any, samples?: number, domain?: [number, number], range?: [number, number]) => JSX.Element;
export {};
