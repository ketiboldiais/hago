import React from 'react';
import { Board, svg, MultiplotProps } from '../utils';
import { BuildColor, BuildPlotPoints, BuildSurface } from './Helpers';

export function Multiplot({
  data = [{ f: (x: number, y: number) => x ** 2 - y ** 2 }],
  id,
  width = 600,
  height = 600,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 60,
  marginRight = 60,
  marginBottom = 60,
  marginLeft = 60,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  xDomain = [-20, 20],
  yDomain = [-20, 20],
  yaw = 0.5,
  pitch = 0.5,
}: MultiplotProps) {
  const _svg = svg(width, height, margins);
  let _data: any[];
  let _surface: any[];
  let plotData = [];
  for (let i = 0; i < data.length; i++) {
    _data = BuildPlotPoints(data[i], xDomain, yDomain);
    _surface = BuildSurface(_data, _svg.width, _svg.height, yaw, pitch);
    plotData.push(_surface);
  }
  return (
    <Board
      className={'hago_multiplot'}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="multiplot_canvas">
        {plotData.map((d, i) => {
          return (
            <g key={`${id}_multiplot_${i}`}>
              {d.map((el: { path: string; data: any }, i: any) => {
                return (
                  <path
                    d={el.path}
                    fill={BuildColor(el.data)}
                    key={`${id}_${i}`}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </Board>
  );
}
