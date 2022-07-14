import React from 'react';
import { stratify, tree, cluster as D3Cluster } from 'd3';
import { BaseProps, Board, makeId, svg, Translate } from '../utils';
import { BuildASTNodes } from './BuildASTNodes';

export type AST = {
  t?: string;
  v: string | number;
	id?: string;
	pid?: string;
  l?: AST;
  r?: AST;
};

export interface ParseTreeProps extends BaseProps {
  data: AST;
  edgeLength?: number;
  r?: number;
  kw?: number;
  layout?: 'horizontal' | 'vertical';
  cluster?: boolean;
  tw?: number;
  th?: number;
  sibsep?: number;
  nsibsep?: number;
  narrow?: number;
}

export function ParseTree({
  data,
  className = 'hago_ParseTree',
  id = makeId(className),
  r = 10,
  fontSize = 0.7,
  width = 500,
  height = width,
  tw,
  th,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 50,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  narrow = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  layout = 'vertical',
  cluster = true,
  sibsep = 1,
  nsibsep = 1.1,
}: ParseTreeProps) {
  margins = [margins[0], margins[1] + narrow, margins[2], margins[3] + narrow];
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );

  const _data = BuildASTNodes(data);

  const _root = stratify()
    .id((d: any) => {
			return d.id;
    })
    .parentId((d: any) => {
      return d.pid;
    })(_data);

  th = th ? th : _svg_height;
  tw = tw ? tw : _svg_width;

  const _treeLayout = cluster ? D3Cluster : tree;

  const _treeStructure = _treeLayout()
    .size([tw, th])
    .separation((a, b) => (a.parent === b.parent ? sibsep : nsibsep));
  _treeStructure(_root);

  let _links = _root.links();

  let _nodes = _root.descendants();

  for (let i = 0; i < _nodes.length; i++) {
    let d: any = _nodes[i];
    d.hide = d.data.hide;
    d.className = d.data.className;
    d.isLeaf = d.children ? false : true;
    d.id = d.data.child;
    d.type = d.data.type;
  }

  for (let i = 0; i < _links.length; i++) {
    let d: any = _links[i];
    d.hide = d.source.data.hide || d.target.data.hide;
  }

  const getD = (d: any) => {
    let m1;
    let m2;
    let v1;
    let h;
    let v2;
    if (layout === 'horizontal') {
      m1 = d.source.y;
      m2 = d.source.x;
      v1 = d.target.x;
      h = d.target.y;
      v2 = d.target.x;
    } else {
      m1 = d.source.x;
      m2 = d.source.y;
      v1 = d.target.y / 1.25;
      h = d.target.x;
      v2 = d.target.y;
    }

    return `M${m1},${m2}V${v1}H${h}V${v2}`;
  };

  const nodeTranslate = (d: any) =>
    layout === 'horizontal' ? Translate(d.y, d.x) : Translate(d.x, d.y);

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="AVLTree_links">
        {_links.map((d: any, i: number) => {
          return (
            !d.hide && (
              <g key={`avL${id}_${i}`}>
                <path d={getD(d)} fill="none" stroke="black" />
              </g>
            )
          );
        })}
      </g>
      <g className="AVLTree_nodes">
        {_nodes.map((d: any, i: number) => {
          return (
            !d.hide && (
              <g key={`avN${id}_${i}`} transform={nodeTranslate(d)}>
                <circle r={r} stroke="none" fill="white" />
                <text
                  textAnchor="middle"
                  fontSize={`${fontSize}rem`}
                  dx={0}
                  dy={r / 2.5}
                >{`${d.id}`}</text>
              </g>
            )
          );
        })}
      </g>
    </Board>
  );
}
