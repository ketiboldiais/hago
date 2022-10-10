import React from 'react';
import { line } from 'd3-shape';
import { MakeCoordinates, MakeParametricCoordinates } from './MakeCoordinates';
import { MakePathCoordinates } from './MakePathCoordinates';
import { FunctionDatum, ParametricFunctionDatum } from '../utils';
import { area } from 'd3';

export const FunctionPlot = (
  datum: FunctionDatum,
  xScale: any,
  yScale: any,
  samples: number,
  domain: [number, number],
  range: [number, number]
) => {
  const dom = datum.domain ? datum.domain : domain;
  const ran = datum.image ? datum.image : range;
  const data: any = MakeCoordinates(datum.f, samples, dom, ran);
  const lineGenerator: any = line()
    .y((d: any) => yScale(d.y))
    .defined((d: any) => {
      return d.y !== null;
    })
    .x((d: any) => xScale(d.x))(data);
  return (
    <path
      d={lineGenerator}
      stroke={datum.color || 'red'}
      strokeWidth={datum.w || 1}
      fill={'none'}
      strokeDasharray={datum.dash}
      shapeRendering="geometricPrecision"
    />
  );
};

export const ParametricFunctionPlot = (
  datum: ParametricFunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 2000,
  domain: [number, number] = [-10, 10]
) => {
  const data: any = MakeParametricCoordinates(
    datum.x,
    datum.y,
    samples,
    domain
  );
  const lineGenerator: any = line()
    .y((d: any) => yScale(d.y))
    .defined((d: any) => {
      return d.y !== null;
    })
    .x((d: any) => xScale(d.x))
    .defined((d: any) => {
      return d.x !== null;
    })(data);
  return (
    <path
      d={lineGenerator}
      stroke={'red'}
      fill={'none'}
      shapeRendering="geometricPrecision"
    />
  );
};

export const AreaPlot = (
  datum: FunctionDatum | ParametricFunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 1000,
  domain: [number, number] = [-10, 10]
) => {
  let lowerBound =
    datum.integrate[0] === -Infinity ? domain[0] : datum.integrate[0];
  let upperBound =
    datum.integrate[1] === Infinity ? domain[1] : datum.integrate[1];
  let integralFunc = datum.integrate[2];
  let integral: Function | number;

  if (integralFunc === 'y') {
    integral = 0;
  } else if (integralFunc === 'x') {
    integral = () => 0;
  } else {
    integral = integralFunc;
  }

  let PrimaryCurveX: Function;
  let PrimaryCurveY: number | Function;

  if (
    (datum as ParametricFunctionDatum).x &&
    (datum as ParametricFunctionDatum).y
  ) {
    PrimaryCurveX = (datum as ParametricFunctionDatum).x;
    PrimaryCurveY = (datum as ParametricFunctionDatum).y;
  } else {
    PrimaryCurveX = (x: number) => x;
    PrimaryCurveY = (datum as FunctionDatum).f;
  }

  const data: any = MakePathCoordinates(
    PrimaryCurveX,
    PrimaryCurveY,
    integral,
    upperBound,
    lowerBound,
    samples,
    domain
  );

  const areaGenerator = area()
    .defined((d: any) => {
      return d.y0 !== null && d.y1 !== null;
    })
    .x0((d: any) => xScale(d.x0))
    .y0((d: any) => yScale(d.y0))
    .x1((d: any) => xScale(d.x1))
    .y1((d: any) => yScale(d.y1))(data);

  return (
    <path
      d={areaGenerator}
      fill={datum.integrationColor || 'gold'}
      opacity={0.4}
      stroke={'orange'}
      strokeWidth={1}
    />
  );
};
