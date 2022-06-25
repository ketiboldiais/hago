import React from 'react';
import { Board } from '../Board/Board';
import * as d3 from 'd3';
import {
  svg,
  generateTreeData,
  calculateTreeSize,
  BaseProps,
  Literal,
  TreeNode,
  generateBinaryTreeData,
} from '../utils';
import {
  RenderTreeNodes,
  RenderTreeEdges,
  RenderLevelMarks,
  RenderDepthMarks,
  RenderHeightMarks,
  RenderHeightBalanceFactors,
} from './builders';

type BinaryTreeNode = [
  TreeNode | Literal,
  [TreeNode | Literal, TreeNode | Literal]
];

function isBinaryTreeNode(datum: any): boolean {
  return Array.isArray(datum) && Array.isArray(datum[0][1]);
}

function formatTreeData(data: any) {
  let formattedData: any;
  if (isBinaryTreeNode(data)) {
    formattedData = generateBinaryTreeData(data);
  } else {
    formattedData = generateTreeData(data);
  }
  return formattedData;
}

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

export function Tree({
  data = [
    [1, 2],
    [2, 3],
    [2, 4],
  ],
  nodes,
  id,
  nodeFontSize = 0.6,
  nodeRadius = 7,
  width = 250,
  height = 250,
  scale = 100,
  slim = 0,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginBottom = 20,
  marginRight = 20,
  marginLeft = 20,
  margins = [marginTop, marginRight + slim, marginBottom, marginLeft + slim],
  edgeLength,
  markLevels = false,
  markDepth = false,
  markHeight = false,
  markHeightBF = false,
  heightStartsAt = 0,
}: TreeProps) {
  const _svg = svg(width, height, margins);
  const _data = nodes ? nodes : formatTreeData(data);
  const _root = d3
    .stratify()
    .id((d: any) => d.child)
    .parentId((d: any) => d.parent)(_data);
  const _edgeLength = edgeLength ? edgeLength : calculateTreeSize(_root);
  const _treeStructure = d3
    .tree()
    .size([_svg.width, _edgeLength])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.1));
  _treeStructure(_root);
  const _links = _root.links();
  const _nodes = _root.descendants();

  return (
    <Board
      className={'tree'}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="hago_tree">
        {RenderLevelMarks(markLevels, _nodes, _svg, nodeFontSize)}
        {RenderDepthMarks(markDepth, _nodes, id, nodeRadius, nodeFontSize)}
        {RenderTreeEdges(_links, id)}
        {RenderTreeNodes(_nodes, nodeFontSize, nodeRadius)}
        {RenderHeightMarks(
          markHeight,
          _nodes,
          heightStartsAt,
          nodeRadius,
          nodeFontSize
        )}
        {RenderHeightBalanceFactors(
          markHeightBF,
          _nodes,
          nodeFontSize,
          nodeRadius
        )}
      </g>
    </Board>
  );
}
