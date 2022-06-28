import { IsBinaryTreeNode } from '../../utils';
import { generateBinaryTreeData } from '../../utils';
import { generateTreeData } from '../../utils';

export function BuildTreeData(data: any) {
  let formattedData: any;
  if (IsBinaryTreeNode(data)) {
    formattedData = generateBinaryTreeData(data);
  } else {
    formattedData = generateTreeData(data);
  }
  return formattedData;
}
