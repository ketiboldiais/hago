import React from 'react';
import { line } from 'd3-shape';
import {
  MakeCoordinates,
  MakeParametricCoordinates,
  MakePathCoordinates,
} from './MakeCoordinates';
import { FunctionDatum, ParametricFunctionDatum } from '../utils';
import { area } from 'd3';

export const FunctionPlot = (
  datum: FunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) => {
  const data: any = MakeCoordinates(datum.f, samples, domain, range);
  const lineGenerator: any = line()
    .y((d: any) => yScale(d.y))
    .defined((d: any) => {
      return d.y !== null;
    })
    .x((d: any) => xScale(d.x))(data);
  return (
    <path
      d={lineGenerator}
      stroke={'red'}
      fill={'none'}
      shapeRendering="geometricPrecision"
    />
  );
};

export const ParametricFunctionPlot = (
  datum: ParametricFunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 2000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) => {
  const data: any = MakeParametricCoordinates(
    datum.x,
    datum.y,
    samples,
    domain,
    range
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
  datum: FunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
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

  const data: any = MakePathCoordinates(
    datum.f,
    integral,
    upperBound,
    lowerBound,
    samples,
    domain,
    range
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
    <path d={areaGenerator} fill="pink" opacity={0.4} stroke={'firebrick'} />
  );
};
