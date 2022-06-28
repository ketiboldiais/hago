import React from 'react';
import { tree, stratify } from 'd3-hierarchy';
import { svg, calculateTreeSize, TreeProps, Board } from '../utils';
import {
  RenderTreeNodes,
  RenderTreeEdges,
  RenderLevelMarks,
  RenderDepthMarks,
  RenderHeightMarks,
  RenderHeightBalanceFactors,
  BuildTreeData,
} from './helpers';

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
  const _data = nodes ? nodes : BuildTreeData(data);
  const _root = stratify()
    .id((d: any) => d.child)
    .parentId((d: any) => d.parent)(_data);
  const _edgeLength = edgeLength ? edgeLength : calculateTreeSize(_root);
  const _treeStructure = tree()
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
