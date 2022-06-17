import React from 'react';
import { Board } from '../Board/Board';
import * as d3 from 'd3';
import { isObjectLiteral, svg } from '../utils';

function calculateTreeSize(_root) {
  const levelWidth = [1];
  const childCount = function(level, n) {
    if (n.children && n.children.length > 0) {
      if (levelWidth.length <= level + 1) {
        levelWidth.push(0);
      }
      levelWidth[level + 1] += n.children.length;
      n.children.forEach(function(d) {
        childCount(level + 1, d);
      });
    }
  };
  childCount(0, _root);
  const newHeight = d3.max(levelWidth) * 15;
  return newHeight;
}

function generateTreeData(rawData: any[]) {
  let data = [];
  for (let i = 0; i < rawData.length; i++) {
    if (isObjectLiteral(rawData[i])) {
      data.push(rawData[i]);
    } else {
      let node = {
        child: rawData[i][0],
        parent: rawData[i][1],
      };
      data.push(node);
    }
  }
  return data;
}

interface TreeNode {
  child: string | number | boolean;
  parent: string | number | boolean;
}

type Literal = string | number | boolean;

export interface TreeProps {
  data: TreeNode[] | [Literal, Literal][];
  id: string;
  label?: string;
  nodeFontSize?: number;
  width?: number;
  height?: number;
  scale?: number;
  slim?: number;
  cwidth?: number;
  cheight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: [number, number, number, number];
  edgeLength?: number;
  markHeight?: boolean;
  markDepth?: boolean;
  markLevels?: boolean;
}
export const Tree = ({
  data = [
    [1, 2],
    [2, 3],
    [2, 4],
  ],
  id,
  nodeFontSize = 0.65,
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
}: TreeProps) => {
  const _svg = svg(width, height, margins);
  const _data = generateTreeData(data);
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
        <g className="hago_tree_edges">
          {_links.map((d: any, i) => {
            return (
              <g className="hago_tree_edge" key={`${id}_tree_edge_${i}`}>
                <line
                  x1={d.source.x}
                  y1={d.source.y}
                  x2={d.target.x}
                  y2={d.target.y}
                  display={shouldHide(d)}
                  stroke={'currentColor'}
                />
              </g>
            );
          })}
        </g>
        <g className="hago_tree_nodes">
          {_nodes.map((d: any) => {
            return (
              <g transform={`translate(${d.x}, ${d.y})`}>
                <circle stroke={'currentColor'} r={7} fill={'white'} />
                <text
                  textAnchor="middle"
                  fontSize={`${nodeFontSize}rem`}
                  dy="0.3em"
                >
                  {d.id}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </Board>
  );
};

function shouldHide(d: any) {
  if (d.source.data.hide || d.target.data.hide) {
    return 'none';
  } else return 'block';
}
