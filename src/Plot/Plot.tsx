import React from 'react';
import { scaleLinear } from 'd3';
import { ArrowYDown } from './ArrowYDown';
import { ArrowYUp } from './ArrowYUp';
import { ArrowXRight } from './ArrowXRight';
import { ArrowXLeft } from './ArrowXLeft';
import { AreaPlot, FunctionPlot, ParametricFunctionPlot } from './FunctionPlot';
import {
  Board,
  AxisVertical,
  AxisHorizontal,
  svg,
  PlotProps,
  Translate,
  makeId,
  FunctionDatum,
  ParametricFunctionDatum,
} from '../utils';

export const Plot = ({
  data = [],
  className = 'Plot2',
  id = makeId(className),
  domain = [-10, 10],
  range = [-10, 10],
  ticks = 4,
  xTicks = ticks,
  yTicks = ticks,
  samples,
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PlotProps) => {
  let elements = [];
  let areas = [];
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );
  const xTickcount = xTicks * 10;
  const yTickCount = yTicks * 10;

  const xScale = scaleLinear().domain(domain).range([0, _svg_width]);
  const yScale = scaleLinear().domain(range).range([_svg_height, 0]);

  for (let i = 0; i < data.length; i++) {
    let datum = data[i];
    if ((datum as FunctionDatum).f) {
      let el = FunctionPlot(
        datum as FunctionDatum,
        xScale,
        yScale,
        samples,
        domain,
        range
      );
      elements.push(el);
    }
    if (datum.integrate) {
      let el = AreaPlot(
        datum as FunctionDatum,
        xScale,
        yScale,
        samples,
        domain,
        range
      );
      areas.push(el);
    }
    if (
      (datum as ParametricFunctionDatum).x &&
      (datum as ParametricFunctionDatum).y
    ) {
      let el = ParametricFunctionPlot(
        datum as ParametricFunctionDatum,
        xScale,
        yScale,
        samples,
        domain,
        range
      );
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
            <rect width={_svg_width} height={_svg_height} />
          </clipPath>
          <ArrowXLeft />
          <ArrowXRight />
          <ArrowYUp />
          <ArrowYDown />
        </defs>
        <g transform={Translate(0, yScale(0))}>
          <AxisHorizontal
            domain={domain}
            range={[0, _svg_width]}
            tickSep={xTickcount}
            dx={0}
            dy={20}
            markerStart={domain[0] && 'xArrowLeft'}
            markerEnd={domain[1] && 'xArrowRight'}
            fitContent={true}
            latex={false}
          />
        </g>
        <g transform={Translate(xScale(0), 0)}>
          <AxisVertical
            domain={range}
            range={[_svg_height, 0]}
            tickSep={yTickCount}
            dy={5}
            dx={-10}
            markerStart={range[1] && 'yArrowUp'}
            markerEnd={range[0] && 'yArrowDown'}
            latex={false}
          />
        </g>
        {elements.map((d, i) => (
          <g key={`li${id}_${i}`} clipPath={`url(#${id}_Plot_clipPath)`}>
            {d}
          </g>
        ))}
        {areas.map((d, i) => (
          <g key={`ar${id}_${i}`} clipPath={`url(#${id}_Plot_clipPath)`}>
            {d}
          </g>
        ))}
      </g>
    </Board>
  );
};
