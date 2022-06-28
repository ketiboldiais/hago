import { Literal } from './Literal';
import { TreeNode } from './TreeNode';

export type BinaryTreeNode = [
  TreeNode | Literal,
  [TreeNode | Literal, TreeNode | Literal]
];

export function IsBinaryTreeNode(datum: any): boolean {
  return Array.isArray(datum) && Array.isArray(datum[0][1]);
}
