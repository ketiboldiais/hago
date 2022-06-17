import React from 'react';
import { line } from 'd3';
import { makeCoordinates } from './makeCoordinates';

interface FunctionDatum {
  f: Function;
  class?: string;
}

export const FunctionPlot = (
  datum: FunctionDatum,
  xScale: any,
  yScale: any,
  samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) => {
  const data: any = makeCoordinates(datum.f, samples, domain, range);
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
