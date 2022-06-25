import { ReactElement } from 'react';
interface Props {
    id: string;
    className?: string;
    arrowColor?: string;
    refX?: number;
    refY?: number;
    width?: number;
    height?: number;
    orient?: string | number;
}
export declare const ArrowHead: ({ id, className, arrowColor, refX, refY, width, height, orient, }: Props) => ReactElement;
export {};
