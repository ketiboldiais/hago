import { ReactElement, ReactNode } from 'react';
export interface BoardProps {
    className: string;
    width: number;
    height: number;
    cwidth: number;
    cheight: number;
    margins: number[];
    children?: ReactNode;
}
export declare const Board: ({ className, width, height, cwidth, cheight, margins, children, }: BoardProps) => ReactElement;
