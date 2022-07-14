import { linkHorizontal, stratify, tree, cluster as D3Cluster } from 'd3';

import React from 'react';
import {
  BaseProps,
  Board,
  IsDefined,
  makeId,
  StructGuard,
  svg,
  Translate,
} from '../utils';

export type renderOptions = 'bf' | 'h';

export type AVLTreeNode = {
  c: string | number;
  p: string | number;
  h?: boolean;
  hbf?: number;
  id?: string;
  i?: number;
  className?: string;
};

function getHeightBalanceFactor(d: any): number {
  let lc_height: any;
  let rc_height: any;
  if (!d.isLeaf) {
    let lc = d.children[0];
    let rc = d.children[1];
    lc_height = IsDefined(lc) && !lc.h ? lc.height + 1 : 0;
    rc_height = IsDefined(rc) && !rc.h ? rc.height + 1 : 0;
  } else {
    lc_height = d.height + 1;
    rc_height = d.height + 1;
  }
  const balance_factor = lc_height - rc_height;
  return balance_factor;
}

const IsAVLTreeNode = StructGuard((d: any) => d as AVLTreeNode, ['c', 'p']);

export type AVLTreeNodeData =
  | AVLTreeNode[]
  | [string | number, string | number];

export interface AVLTreeProps extends BaseProps {
  data: AVLTreeNodeData;
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
  render?: renderOptions[];
}

export function BuildAVLTreeNodes(data: AVLTreeNodeData, uid: string) {
  let output = [];
  let branchNodes = {};
  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    if (IsAVLTreeNode(current)) {
      current = current as AVLTreeNode;

      let datum = {
        name: current.c,
        id: current.id ? current.id : current.c,
        parentId: current.p,
        h: current.h ? current.h : false,
        i: `${i}`,
        className: current.className || 'AVLTree_node',
      };

      let parent = `${datum.parentId}`;

      if (parent !== '') {
        branchNodes[parent] = branchNodes[parent] || 0;
        branchNodes[parent] += 1;
      }

      output.push(datum);
    }
  }

  let datum = {};
  let parents = Object.keys(branchNodes);
  for (let i = 0; i < parents.length; i++) {
    let parent = parents[i];

    if (branchNodes[parent] === 1) {
      datum = {
        name: uid,
        id: uid,
        parentId: `${parent}`,
        h: true,
        i: `${i}`,
        className: 'hidden_AVLTree_node',
      };
      output.push(datum);
    }
  }
  return output;
}

export function AVLTree({
  data = [],
  className = 'hago_AVLTree',
  id = makeId(className),
  r = 10,
  fontSize = 0.7,
  width = 500,
  height = width / 2,
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
  render = ['bf', 'h'],
}: AVLTreeProps) {
  margins = [margins[0], margins[1] + narrow, margins[2], margins[3] + narrow];
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );

  const _data = BuildAVLTreeNodes(data, id);

  const renderBalanceFactor = render.includes('bf');
  const renderHeight = render.includes('h');

  const _root = stratify()
    .id((d: any) => {
      return d.id;
    })
    .parentId((d: any) => {
      return d.parentId;
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
    d.h = d.data.h;
    d.className = d.data.className;
    d.isLeaf = d.children ? false : true;
    d.hbf = getHeightBalanceFactor(d);
    d.name = d.data.name;
  }

  for (let i = 0; i < _links.length; i++) {
    let d: any = _links[i];
    d.h = d.source.data.h || d.target.data.h;
  }

  const linkGen = linkHorizontal()
    .x((d: any) => (layout === 'horizontal' ? d.y : d.x))
    .y((d: any) => (layout === 'horizontal' ? d.x : d.y));

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
            !d.h && (
              <g key={`avL${id}_${i}`}>
                <path d={linkGen(d)} fill="none" stroke="black" />
              </g>
            )
          );
        })}
      </g>
      <g className="AVLTree_nodes">
        {_nodes.map((d: any, i: number) => {
          return (
            !d.h && (
              <g key={`avN${id}_${i}`} transform={nodeTranslate(d)}>
                {renderBalanceFactor && (
                  <text
                    textAnchor="middle"
                    fontSize={`${fontSize}rem`}
                    dx={0}
                    dy={-r - 2}
                  >{`${d.hbf}`}</text>
                )}
                {renderHeight && (
                  <text
                    textAnchor="middle"
                    fontSize={`${fontSize}rem`}
                    dx={0}
                    dy={r * 2}
                  >{`${d.height}`}</text>
                )}
                <circle r={r} stroke="black" fill="white" />
                <text
                  textAnchor="middle"
                  fontSize={`${fontSize}rem`}
                  dx={0}
                  dy={r / 2.5}
                >{`${d.name}`}</text>
              </g>
            )
          );
        })}
      </g>
    </Board>
  );
}
