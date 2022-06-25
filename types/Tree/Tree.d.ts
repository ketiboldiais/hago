/// <reference types="react" />
import { BaseProps, Literal, TreeNode } from '../utils';
declare type BinaryTreeNode = [TreeNode | Literal, [TreeNode | Literal, TreeNode | Literal]];
export interface TreeProps extends BaseProps {
    data: TreeNode[] | [Literal, Literal][] | BinaryTreeNode;
    nodes?: TreeNode[];
    nodeFontSize?: number;
    nodeRadius?: number;
    slim?: number;
    edgeLength?: number;
    markHeight?: boolean;
    markDepth?: boolean;
    markLevels?: boolean;
    markHeightBF?: boolean;
    heightStartsAt?: number;
}
export declare function Tree({ data, nodes, id, nodeFontSize, nodeRadius, width, height, scale, slim, cwidth, cheight, marginTop, marginBottom, marginRight, marginLeft, margins, edgeLength, markLevels, markDepth, markHeight, markHeightBF, heightStartsAt, }: TreeProps): JSX.Element;
export {};
