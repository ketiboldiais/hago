import React from 'react';
import {
  BaseProps,
  Board,
  makeId,
  svg,
} from '../utils';

export interface BarChartProps extends BaseProps {
  data: any;
}

export function BuildBarChartData(data: any) {}

export function BarChart({
  data = [
    [
      [1, 'c1'],
      [4, 'i[0]'],
      [4, 'i[1]'],
      [8, 'v4'],
    ],
  ],
  className = 'hago_bar_chart',
  id = makeId(className),
  width = 500,
  height = 400,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 20,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: BarChartProps) {
  const _svg = svg(width, height, margins);
  const _data = BuildBarChartData(data);
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    ></Board>
  );
}
