import React from 'react';
import { scaleLinear } from 'd3';
import { ArrowYDown } from './ArrowYDown';
import { ArrowYUp } from './ArrowYUp';
import { ArrowXRight } from './ArrowXRight';
import { ArrowXLeft } from './ArrowXLeft';
import { AreaPlot, FunctionPlot, ParametricFunctionPlot } from './FunctionPlot';
import { RiemannPlot } from './RiemannPlot';
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
  TextDatum,
  IsUndefined,
} from '../utils';
import { Latex } from '../utils/Latex';

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
  let vectorData = [];
  let annotations = [];
  let riemanns: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    r: number;
    tx: number;
    color: string;
  }[];
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
    if ((datum as TextDatum).t) {
      datum = datum as TextDatum;
      datum.w = datum.w ? datum.w : 100;
      datum.h = datum.h ? datum.h : 100;
      datum.x = datum.x ? datum.x : 0;
      datum.y = datum.y ? datum.y : 0;
      annotations.push(datum);
    }
    if ((datum as FunctionDatum).f) {
      let el = FunctionPlot(
        datum as FunctionDatum,
        xScale,
        yScale,
        samples,
        domain,
        range,
      );
      elements.push(el);
    }
    if ((datum as FunctionDatum).riemann) {
      let el = RiemannPlot(datum as FunctionDatum, xScale, yScale);
      riemanns = el;
    }
    if ((datum as FunctionDatum | ParametricFunctionDatum).integrate) {
      let el = AreaPlot(
        datum as FunctionDatum,
        xScale,
        yScale,
        samples,
        domain
      );
      areas.push(el);
    }
    if (
      (datum as ParametricFunctionDatum).x &&
      (datum as ParametricFunctionDatum).y &&
      IsUndefined((datum as any).t)
    ) {
      let el = ParametricFunctionPlot(
        datum as ParametricFunctionDatum,
        xScale,
        yScale,
        samples,
        domain
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
        {elements &&
          elements.map((d, i) => (
            <g key={`li${id}_${i}`} clipPath={`url(#${id}_Plot_clipPath)`}>
              {d}
            </g>
          ))}
        {areas &&
          areas.map((d, i) => (
            <g
              key={`ar${id}_${i}`}
              clipPath={`url(#${id}_Plot_clipPath)`}
              className="integration_area"
            >
              {d}
            </g>
          ))}
        {vectorData &&
          vectorData.map((d, i) => (
            <g key={`ve${id}_${i}`} clipPath={`url(#${id}_Plot_clipPath)`}>
              {d}
            </g>
          ))}
        {annotations &&
          annotations.map((d, i) => (
            <g key={`ap${id}_${i}`}>
              <Latex
                text={d.t}
                offset={{
                  x: xScale(d.x),
                  y: yScale(d.y),
                }}
                fontsize={d.fontsize || 0.8}
                dx={0}
                dy={0}
                width={d.w}
                height={d.h}
                color={d.color || 'black'}
                fitContent={true}
                textAlign={'center'}
                block={false}
              />
            </g>
          ))}
        {riemanns &&
          riemanns.map((d, i) => (
            <g
              key={`rm${id}${i}`}
              className="riemann_sums"
              transform={Translate(d.tx, 0)}
              clipPath={`url(#${id}_Plot_clipPath)`}
            >
              <line
                x1={d.x0}
                y1={d.y0}
                x2={d.x1}
                y2={d.y1}
                stroke={d.color}
                strokeOpacity={0.1}
                strokeWidth={d.r}
              />
              <line
                x1={d.x0}
                y1={d.y0}
                x2={d.x1}
                y2={d.y1}
                stroke={d.color}
                strokeOpacity={0.6}
                strokeWidth={d.r - 1}
              />
            </g>
          ))}
      </g>
    </Board>
  );
};
