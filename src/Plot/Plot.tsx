import React from 'react';
import { scaleLinear } from 'd3';
import { ArrowYDown } from './ArrowYDown';
import { ArrowYUp } from './ArrowYUp';
import { ArrowXRight } from './ArrowXRight';
import { ArrowXLeft } from './ArrowXLeft';
import { FunctionPlot } from './FunctionPlot';
import {
  Board,
  AxisVertical,
  AxisHorizontal,
  svg,
  FunctionElement,
} from '../utils';

export interface PlotProps {
  data?: FunctionElement[];
  domain?: [number, number];
  range?: [number, number];
  ticks?: number;
  xTicks?: number;
  yTicks?: number;
  samples?: number;
  className?: string;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: number[];
  scale?: number;
  cwidth?: number;
  cheight?: number;
  id?: string;
}

export const Plot = ({
  data = [],
  id,
  domain = [-10, 10],
  range = [-10, 10],
  ticks = 4,
  xTicks = ticks,
  yTicks = ticks,
  samples = 1000,
  className = 'Plot2',
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  margins = [20, 20, 20, 20],
}: PlotProps) => {
  let elements = [];
  let _svg = svg(width, height, margins);
  const xTickcount = xTicks * 10;
  const yTickCount = yTicks * 10;
  const xScale = scaleLinear().domain(domain).range([0, _svg.width]);
  const yScale = scaleLinear().domain(range).range([_svg.height, 0]);
  for (let i = 0; i < data.length; i++) {
    let datum = data[i];
    if (datum.f) {
      let el = FunctionPlot(datum, xScale, yScale, samples, domain, range);
      elements.push(el);
    }
  }
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="Plot">
        <defs>
          <clipPath id={`${id}_Plot_clipPath`}>
            <rect width={_svg.width} height={_svg.height} />
          </clipPath>
          <ArrowXLeft />
          <ArrowXRight />
          <ArrowYUp />
          <ArrowYDown />
        </defs>
        <g
          transform={`translate(0, ${_svg.height / 2})`}
          className={'plotAxes'}
        >
          <AxisHorizontal
            domain={domain}
            range={[0, _svg.width]}
            tickSep={xTickcount}
            markerStart={'xArrowLeft'}
            markerEnd={'xArrowRight'}
          />
        </g>
        <g transform={`translate(${_svg.width / 2}, 0)`} className={'plotAxes'}>
          <AxisVertical
            domain={range}
            range={[_svg.height, 0]}
            tickSep={yTickCount}
            markerStart={'yArrowUp'}
            markerEnd={'yArrowDown'}
          />
        </g>
        {elements.map((d, i) => (
          <g key={`${i}_plot_clip_path`} clipPath={`url(#${id}_Plot_clipPath)`}>
            {d}
          </g>
        ))}
      </g>
    </Board>
  );
};
