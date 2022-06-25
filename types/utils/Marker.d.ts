import { ReactElement } from 'react';
interface MarkerProps {
    id: string;
    type?: 'circle' | 'arrow' | 'square';
    className?: string;
    arrowColor?: string;
    refX?: number;
    refY?: number;
    width?: number;
    height?: number;
    radius?: number;
    viewbox?: string;
    cx?: number;
    cy?: number;
    circleFillColor?: string;
    circleStrokeColor?: string;
    orient?: string | number;
}
export declare const Marker: ({ id, type, className, arrowColor, radius, refX, refY, width, height, cx, cy, circleFillColor, circleStrokeColor, orient, viewbox, }: MarkerProps) => ReactElement;
export {};
