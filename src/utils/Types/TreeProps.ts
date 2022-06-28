import { BaseProps } from '../BaseProps';
import { TreeNode } from './TreeNode';
import { Literal } from './Literal';
import { BinaryTreeNode } from './BinaryTreeNode';

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
