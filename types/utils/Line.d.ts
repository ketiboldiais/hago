/// <reference types="react" />
import { Point } from './Types';
export interface LineProps {
    start: Point;
    end: Point;
    color?: string;
    strokeWidth?: number;
    dash?: number;
    markerEnd?: string;
    markerStart?: string;
}
export declare function Line({ start, end, color, strokeWidth, dash, markerEnd, markerStart, }: LineProps): JSX.Element;
