import { scaleBand, stratify, tree } from 'd3';
import React from 'react';
import {
  BaseProps,
  Board,
  calculateTreeSize,
  Cell,
  makeId,
  svg,
  Translate,
} from '../utils';

export type MTreeNode = {
  c: string | number;
  p: string | number;
  v: string[] | number[];
  h?: boolean;
  id?: string;
  i?: number;
  className?: string;
};

export type MTreeNodeData = MTreeNode[];

export interface MTreeProps extends BaseProps {
  data: MTreeNodeData;
  edgeLength?: number;
  kw?: number;
}

export function BuildMTreeNodes(data: MTreeNodeData) {
  let output = [];
  for (let i = 0; i < data.length; i++) {
    let current = data[i] as MTreeNode;
    let datum = {
      name: current.c,
      id: current.id ? current.id : current.c,
      parentId: current.p,
      val: current.v,
      h: current.h ? current.h : false,
      i: `${i}`,
      className: current.className || 'MTree_node',
    };
    output.push(datum);
  }
  return output;
}

export function MTree({
  data = [],
  className = 'hago_queue',
  id = makeId(className),
  fontSize = 0.7,
  kw = 0.8,
  edgeLength = 100,
  width = 500,
  height = width,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 50,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: MTreeProps) {
  
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );

  const _data = BuildMTreeNodes(data);

  const _root = stratify()
    .id((d: any) => {
      return d.id;
    })
    .parentId((d: any) => {
      return d.parentId;
    })(_data);

  const _edgeLength = edgeLength ? edgeLength : calculateTreeSize(_root);

  const _treeHeight = _root.height;

  cheight = cheight ? cheight : Math.min(0.1 * (_treeHeight+2), 1);

  const _treeStructure = tree()
    .size([_svg_width, _edgeLength])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.1));
  _treeStructure(_root);

  let _links = _root.links();

  let _nodes = _root.descendants();

  for (let i = 0; i < _nodes.length; i++) {
    let d: any = _nodes[i];
    d.val = d.data.val;
    d.h = d.data.h;
    d.className = d.data.className;
  }

  const _scale = scaleBand()
    .domain(_data.map((d) => d.i))
    .range([0, _svg_width / (_treeHeight / kw)]);

  const _sideLength = _scale.bandwidth();

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="MTree_links">
        {_links.map((d: any, i: number) => {
          return (
            <g key={`mtl${id}_${i}`}>
              <line
                x1={d.source.x}
                y1={d.source.y}
                x2={d.target.x}
                y2={d.target.y}
                display={d.h && 'none'}
                stroke={'currentColor'}
              />
            </g>
          );
        })}
      </g>
      <g className="MTree_nodes">
        {_nodes.map((d: any, i: number) => {
          return (
            <g key={`mtn${id}_${i}`} transform={Translate(d.x, d.y)}>
              {d.val.map((k: string, j: number) => {
                return (
                  <g
                    key={`mtnk${id}${i}${j}`}
                    transform={Translate((-_sideLength * d.val.length) / 2, 0)}
                  >
                    <g transform={Translate(_scale(`${j}`), 0)}>
                      <Cell w={_sideLength} h={_sideLength} fill="white" />
                      <text
                        textAnchor="middle"
                        fontSize={`${fontSize}rem`}
                        dx={_sideLength / 2}
                        dy={_sideLength / 1.5}
                      >{`${k}`}</text>
                    </g>
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    </Board>
  );
}
