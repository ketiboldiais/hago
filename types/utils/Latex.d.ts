/// <reference types="react" />
import 'katex/dist/katex.min.css';
interface LatexProps {
    text: string;
    offset?: {
        x: number;
        y: number;
    };
    width?: number;
    height?: number;
    fontsize?: number;
}
export declare const Latex: ({ text, width, offset, height, fontsize, }: LatexProps) => JSX.Element;
export {};
