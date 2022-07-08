import { scaleLinear, scaleBand } from 'd3';
import React from 'react';
import {
  AxisHorizontal,
  AxisVertical,
  BaseProps,
  Board,
  getConvenientEndPoint,
  getConvenientStartingPoint,
  getIntervalWidth,
  getMax,
  getMin,
  IsAPoint,
  makeId,
  Point,
  svg,
  Text,
  Translate,
} from '../utils';

export interface HistogramProps extends BaseProps {
  data: [number, number][] | Point[];
  start: number;
  end: number;
  tickSep: number;
  removeEndTicks: boolean;
  removeEndTickX: boolean;
  removeEndTickY: boolean;
}

function BuildHistogramData(data: [number, number][] | Point[]) {
  let dataset: Point[] = [];
  const datumCount = data.length;
  for (let i = 0; i < datumCount; i++) {
    if (IsAPoint(data[i])) {
      dataset.push(data[i] as Point);
    } else {
      let x = data[i][0];
      let y = data[i][1];
      let datum = { x, y };
      dataset.push(datum);
    }
  }
  const xVals = dataset.map((d) => d.x);
  const yVals = dataset.map((d) => d.y);
  const minX = getConvenientStartingPoint(xVals);
  const maxX = getConvenientEndPoint(xVals);
  const minY = getMin(yVals).min;
  const maxY = getMax(yVals).max;
  const intervalWidth = getIntervalWidth(datumCount);
  const axisLabels = [];
  let start = minX;
  axisLabels.push(start);
  for (let i = 1; i < dataset.length; i++) {
    start += intervalWidth;
    axisLabels.push(start);
  }
  return { dataset, minX, minY, maxX, maxY, intervalWidth, axisLabels };
}

export function Histogram({
  data = [
    [2, 0.15],
    [3, 0.25],
    [4, 0.15],
    [5, 0.3],
    [6, 0.1],
    [7, 0.05],
  ],
  className = 'hago_histogram',
  id = makeId(className),
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  tickSep = 50,
  removeEndTicks = false,
  removeEndTickX = removeEndTicks,
  removeEndTickY = removeEndTicks,
}: HistogramProps) {
  const _data = BuildHistogramData(data);
  const _svg = svg(width, height, margins);
  const _xMin = _data.minX;
  const _xMax = _data.maxX;
  const _yMin = _data.minY;
  const _yMax = _data.maxY;
  const _dataPoints = _data.dataset;
  const _axisLabels = _data.axisLabels;
  const _intervalWidth = _data.intervalWidth;
  const _scaleX = scaleBand()
    .range([0, _svg.width])
    .domain(_dataPoints.map((d) => `${d.x}`));
  const _rectWidth = _scaleX.bandwidth();
  const _yScale = scaleLinear().domain([_yMin, _yMax]).range([2, _svg.height]);
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g transform={Translate(0, _svg.height)}>
        <AxisHorizontal
          domain={[_xMin, _xMax]}
          range={[0, _svg.width]}
          tickSep={_intervalWidth * 30}
          tx={-_rectWidth / 2}
          axisLabelArray={_axisLabels}
          removeEndTicks={removeEndTickX}
        />
      </g>
      <g>
        <AxisVertical
          domain={[_yMin, _yMax]}
          range={[_svg.height, 0]}
          tickSep={tickSep}
          removeEndTicks={removeEndTickY}
          dy={-15}
          dx={-marginLeft / 1.5}
        />
      </g>
      {_dataPoints.map((d, i) => {
        return (
          <g
            key={`hh${id}_${i}`}
            transform={Translate(_scaleX(`${d.x}`), _svg.height - _yScale(d.y))}
          >
            <rect
              width={_rectWidth}
              height={_yScale(d.y)}
              stroke="black"
              fill="none"
            />
            <Text
              val={d.y}
              fitContent={true}
              pos={{ x: _rectWidth / 3, y: -30 }}
              textAlign="center"
            />
          </g>
        );
      })}
    </Board>
  );
}
