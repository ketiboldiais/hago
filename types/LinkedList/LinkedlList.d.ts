/// <reference types="react" />
import { BaseProps, ElementArray } from '../utils';
export interface LinkedListProps extends BaseProps {
    data: ElementArray;
    isIndexed?: boolean;
}
export declare function LinkedList({ data, className, id, width, height, scale, cwidth, cheight, marginTop, marginRight, marginBottom, marginLeft, margins, isIndexed, }: LinkedListProps): JSX.Element;
