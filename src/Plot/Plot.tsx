import React from 'react';
import { difference, scaleLinear } from 'd3';
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
  PlotProps,
  Translate,
} from '../utils';

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
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PlotProps) => {
  let elements = [];
  let _svg = svg(width, height, margins);
  const xTickcount = xTicks * 10;
  const yTickCount = yTicks * 10;
  const xScale = scaleLinear().domain(domain).range([0, _svg.width]);
  const yScale = scaleLinear().domain(range).range([_svg.height, 0]);

  const length_range = Math.abs(range[0] - range[1]);
  const length_domain = Math.abs(domain[0] - domain[1]);
  const length_diff = Math.abs(length_range - length_domain);
  const diff_rx0_dx0 = Math.abs(range[0] - domain[0]);
  const diff_rx1_dx1 = Math.abs(range[1] - domain[1]);

  const difference_Range0_Range1 = range[0] - range[1];
  const difference_Domain0_Domain1 = domain[0] - domain[1];
  

  const vals = {
    difference_Domain0_Domain1,
    difference_Range0_Range1,
    halfHeight: _svg.height / 2,
    halfWidth: _svg.width / 2,
    xScaleRange0: xScale(range[0]),
    yScaleRange0: yScale(range[0]),
    xScaleRange1: xScale(range[1]),
    yScaleRange1: yScale(range[1]),
    xScaleDom0: xScale(domain[0]),
    yScaleDom0: yScale(domain[0]),
    xScaleDom1: xScale(domain[1]),
    yScaleDom1: yScale(domain[1]),
    length_range,
    length_domain,
    length_diff,
    scale_x_length_diff: xScale(length_diff),
    scale_y_length_diff: yScale(length_diff),
    scale_x_diff_rx0_dx0: xScale(diff_rx0_dx0),
    scale_y_diff_rx0_dx0: Math.ceil(yScale(diff_rx0_dx0)),
    scale_x_diff_rx1_dx1: xScale(diff_rx1_dx1),
    scale_y_diff_rx1_dx1: yScale(diff_rx1_dx1),
    diff_rx0_dx0,
    diff_rx1_dx1,
  };
  // const offset_x_axis_y = yScale(diff_rx0_dx0);
  let offset_x_axis_y = vals.scale_y_diff_rx1_dx1;

  // const offset_y_axis_x = xScale(diff_rx0_dx0);
  let offset_y_axis_x = vals.scale_x_diff_rx1_dx1;
  console.log(vals);

  const d0 = domain[0];
  const r0 = range[0];

  const d1 = domain[1];
  const r1 = range[1];

  if (d0 === r0 && d1 === r1) {
    offset_x_axis_y = _svg.height / 2;
    offset_y_axis_x = _svg.width / 2;
  } else if (d0 < r0 && d1 < r1) {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1 + vals.scale_y_length_diff;
    offset_y_axis_x =
      _svg.width / 2 + (vals.scale_x_length_diff - vals.scale_x_diff_rx1_dx1);
  } else if (d0 > r0 && d1 > r1) {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1 - vals.scale_y_diff_rx0_dx0;
    offset_y_axis_x = vals.scale_x_diff_rx1_dx1;
  } else if (d0 < r0 && d1 > r1) {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1 - vals.yScaleDom1;
    offset_y_axis_x = vals.scale_x_diff_rx1_dx1 - vals.xScaleRange0;
  } else if (d0 > r0 && d1 < r1) {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1 - vals.scale_y_diff_rx0_dx0;
    offset_y_axis_x = vals.scale_x_diff_rx1_dx1;
  } else if (d0 < r0 && d1 === r1) {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1;
    offset_y_axis_x = vals.scale_x_diff_rx1_dx1;
  } else {
    offset_x_axis_y = vals.scale_y_diff_rx1_dx1;
    offset_y_axis_x = vals.scale_x_diff_rx1_dx1;
  }

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
        <g transform={Translate(0, offset_x_axis_y)}>
          <AxisHorizontal
            domain={domain}
            range={[0, _svg.width]}
            tickSep={xTickcount}
            dx={0}
            dy={20}
            markerStart={domain[0] && 'xArrowLeft'}
            markerEnd={domain[1] && 'xArrowRight'}
            fitContent={true}
            latex={false}
          />
        </g>
        <g transform={Translate(offset_y_axis_x, 0)}>
          <AxisVertical
            domain={range}
            range={[_svg.height, 0]}
            tickSep={yTickCount}
            dy={5}
            dx={-10}
            markerStart={range[1] && 'yArrowUp'}
            markerEnd={range[0] && 'yArrowDown'}
            latex={false}
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
