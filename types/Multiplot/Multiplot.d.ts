/// <reference types="react" />
declare type FunctionElement = {
    f: Function;
    scale?: number;
};
export interface MultiplotProps {
    data: FunctionElement[];
    id: string;
    width?: number;
    height?: number;
    scale?: number;
    cwidth?: number;
    cheight?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    margins?: [number, number, number, number];
    yaw?: number;
    pitch?: number;
    helpers?: boolean;
    xDomain?: [number, number];
    yDomain?: [number, number];
    zRange?: [number, number];
    renderXAxis?: boolean;
    renderYAxis?: boolean;
    renderZAxis?: boolean;
    xTickCount?: number;
    yTickCount?: number;
    zTickCount?: number;
}
export declare function Multiplot({ data, id, width, height, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, xDomain, yDomain, yaw, pitch, }: MultiplotProps): JSX.Element;
export {};
