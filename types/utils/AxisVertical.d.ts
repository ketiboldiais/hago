import { ReactElement } from 'react';
interface Props {
    domain: number[];
    range: number[];
    tickSep: number;
    markerStart?: string;
    markerEnd?: string;
}
export declare const AxisVertical: ({ domain, range, tickSep, markerStart, markerEnd, }: Props) => ReactElement;
export {};
