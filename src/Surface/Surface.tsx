import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
  AxisHorizontal,
  AxisVertical,
  BaseProps,
  Board,
  svg,
  Translate,
} from '../utils';

interface SurfaceProps extends BaseProps {
  domain: [number, number];
  range: [number, number];
  xTicks: number;
  yTicks: number;
  pitch: number;
  yaw: number;
  roll: number;
}

function Rotate(d: number, c: { x: number; y: number }) {
  return `translate(${c.x} ${c.y}) rotate(${d} ${c.y} ${c.x})`;
}

export function Surface({
  className = 'Hago_Surface',
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  domain = [-10, 10],
  range = [-10, 10],
  xTicks = 10,
  yTicks = 10,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: SurfaceProps) {
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );
  const xTickcount = xTicks * 10;
  const yTickCount = yTicks * 10;

  const xScale = scaleLinear().domain(domain).range([0, _svg_width]);
  const yScale = scaleLinear().domain(range).range([_svg_height, 0]);
  const h_origin = { x: 0, y: yScale(0) };
  const v_origin = { x: xScale(0), y: 0 };

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g transform={Translate(h_origin.x, h_origin.y)}>
        <AxisHorizontal
          domain={domain}
          range={[0, _svg_width]}
          tickSep={xTickcount}
          dx={0}
          dy={20}
          latex={false}
        />
      </g>
      <g transform={Translate(v_origin.x, v_origin.y)}>
        <AxisVertical
          domain={domain}
          range={[_svg_height, 0]}
          dy={5}
          dx={-10}
          tickSep={yTickCount}
          latex={false}
        />
      </g>
      <g transform={Rotate(-45, { x: h_origin.x, y: h_origin.y })}>
        <AxisHorizontal
          domain={domain}
          range={[0, _svg_width]}
          tickSep={xTickcount}
          dx={0}
          dy={20}
          latex={false}
        />
      </g>
    </Board>
  );
}
