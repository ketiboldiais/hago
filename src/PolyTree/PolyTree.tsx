import React from 'react';
import { svg, Board, BaseProps, makeId, Translate, Text } from '../utils';
import { BuildPolyTreeData } from './BuildPolyTreeData';

export type PolyNode =
  | {
      val: string | number;
      par?: (string | number)[];
      id?: string;
      className?: string;
      level?: number;
    }[][]
  | any;

export interface PolyTreeProps extends BaseProps {
  data: PolyNode;
  treeWidth?: number;
  treeHeight?: number;
  groupWidth?: number;
  yAxisPadding?: number;
  offsetX?: number;
  offsetY?: number;
}

export function PolyTree({
  data = [
    [{ val: 'a' }],
    [
      { val: 'y', par: ['a'] },
      { val: 'z', par: ['a'] },
      { val: 'o', par: ['a'] },
    ],
    [
      { val: 'n', par: ['z'] },
      { val: 'g', par: ['y'] },
    ],
  ],
  className = 'Hago_PolyTree',
  id = makeId(className),
  width = 300,
  height = 300,
  scale = 100,
  cwidth = scale,
  treeWidth = 50,
  treeHeight = 40,
  groupWidth = 16,
  yAxisPadding = 16,
  offsetX = 0,
  offsetY = 0,
  cheight,
  marginTop = 20,
  marginBottom = 20,
  marginRight = 20,
  marginLeft = 20,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PolyTreeProps) {
  const _svg = svg(width, height, margins);
  const _data = BuildPolyTreeData(
    data,
    treeWidth,
    treeHeight,
    groupWidth,
    yAxisPadding,
    offsetX,
    offsetY
  );
  const c = 20;
  return (
    <Board
      className={'tree'}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="hago_poly_tree_nodes">
        {_data.links.map((d, i) => {
          return (
            <path
              key={`pyt${id}_${i}`}
              d={`M${d.xt} ${d.yt}
							L${d.xb - c} ${d.yt}
							A${c} ${c} 90 0 1 ${d.xb} ${d.yt + c}
							L${d.xb} ${d.ys - c}
							A${c} ${c} 90 0 0 ${d.xb + c} ${d.ys}
							L${d.xs} ${d.ys}`}
              fill={'none'}
              stroke={'black'}
              strokeWidth={2}
            />
          );
        })}
        {_data.nodes.map((d) => {
          return (
            <Text
              val={d.val}
              pos={{ x: d.x + 2, y: d.y - 25 }}
              fitContent={true}
            />
          );
        })}
      </g>
    </Board>
  );
}
