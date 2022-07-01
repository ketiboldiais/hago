import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';
import {
  Board,
  AxisHorizontal,
  AxisVertical,
  Line,
  makeId,
  svg,
  Translate,
  BaseProps,
  FunctionElement,
  NamedPoint,
  IsAnArray,
  IsAFunction,
  IsAFunctionElement,
  IsANamedPoint,
  ReturnSmaller,
  ReturnLarger,
} from '../utils';

export interface SumProps extends BaseProps {
  data: Function | FunctionElement[] | NamedPoint[];
  start?: number;
  end?: number;
  tickSep?: number;
  removeEndTicks?: boolean;
  removeEndTickX?: boolean;
  removeEndTickY?: boolean;
}

function BuildSumData(
  data: Function | FunctionElement[] | NamedPoint[],
  start: number,
  end: number
) {
  let sum = 0;
  let dataPoints = [];
  let xMax = start;
  let xMin = start;
  let yMax = start;
  let yMin = start;
  if (IsAnArray(data)) {
    // handle array data
    for (let i = 0; i < data.length; i++) {
      if (IsAFunctionElement(data[i])) {
        let f = (data[i] as FunctionElement).f;
        for (let j = start; j < end; j++) {
          let sequencePoint = f(j);
          sum += sequencePoint;
          yMin = ReturnSmaller(yMin, sum);
          yMax = ReturnLarger(yMax, sum);
          xMin = ReturnSmaller(xMin, j);
          xMax = ReturnLarger(xMax, j);
          let datum = { x: j, y: sum, t: sequencePoint };
          dataPoints.push(datum);
        }
      } else if (IsANamedPoint(data[i])) {
        let datum = {
          x: (data[i] as NamedPoint).x,
          y: (data[i] as NamedPoint).y,
        };
        yMin = ReturnSmaller(yMin, sum);
        yMax = ReturnLarger(yMax, sum);
        xMin = ReturnSmaller(xMin, (data[i] as NamedPoint).x);
        xMax = ReturnLarger(xMax, (data[i] as NamedPoint).x);
        dataPoints.push(datum);
      } else {
        throw new Error('Improperly formatted array data');
      }
    }
  } else if (IsAFunction(data)) {
    // handle function
    for (let j = start; j < end; j++) {
      let sequencePoint = (data as Function)(j);
      sum += sequencePoint;
      yMin = ReturnSmaller(yMin, sum);
      yMax = ReturnLarger(yMax, sum);
      xMin = ReturnSmaller(xMin, j);
      xMax = ReturnLarger(xMax, j);
      let datum = { x: j, y: sum, t: sequencePoint };
      dataPoints.push(datum);
    }
  } else {
    throw new Error('Improperly formatted data.');
  }
  return { dataPoints, xMin, xMax, yMin, yMax };
}

export function Sum({
  data = (n: number) => n ** 2 + 1,
  className = 'hago_sequence',
  id = makeId(className),
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 60,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  start = 0,
  end = 20,
  tickSep = 50,
  removeEndTicks = false,
  removeEndTickX = removeEndTicks,
  removeEndTickY = removeEndTicks,
}: SumProps) {
  const _svg = svg(width, height, margins);
  const _data = BuildSumData(data, start, end);
  const _dataPoints = _data.dataPoints;
  const _xMin = _data.xMin;
  const _xMax = _data.xMax;
  const _yMin = _data.yMin;
  const _yMax = _data.yMax;
  const _xScale = scaleLinear().domain([_xMin, _xMax]).range([0, _svg.width]);
  const _scaleX = scaleBand()
    .range([0, _svg.width])
    .domain(_dataPoints.map((d) => `${d.x}`))
    .padding(0.06);
  const _rectWidth = _scaleX.bandwidth();
  const _yScale = scaleLinear().domain([_yMin, _yMax]).range([_svg.height, 0]);

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g transform={Translate(_xScale(_xMin), _yScale(_xMin))}>
        <AxisHorizontal
          domain={[_xMin, _xMax]}
          range={[0, _svg.width]}
          tickSep={tickSep}
          removeEndTicks={removeEndTickX}
        />
      </g>
      <AxisVertical
        domain={[_yMin, _yMax]}
        range={[_svg.height, 0]}
        tickSep={tickSep}
        removeEndTicks={removeEndTickY}
        textAnchor={'end'}
        textOffsetX={-marginLeft / 4}
      />
      <g className="hago_sum_plot_points">
        {_dataPoints.map((d, i) => {
          return (
            <g key={`hago_sum_${id}_${i}`}>
              <Line
                start={{
                  x: _xScale(d.x),
                  y: _yScale(start),
                }}
                end={{
                  x: _xScale(d.x),
                  y: _yScale(d.y),
                }}
                strokeWidth={_rectWidth}
                color={'tomato'}
              />
            </g>
          );
        })}
      </g>
    </Board>
  );
}

{
  /* <g
              className={d.className ? d.className : 'hago_plot_point'}
              key={`${id}_${i}`}
            >
              <g transform={Translate(0, _yScale(0))}>
                <rect
                  stroke={'black'}
                  fill={'tomato'}
                  x={_xScale(d.x)}
                  y={d.y < 0 ? 0 : -_yRectScale(d.y)}
                  width={_rectWidth}
                  height={_svg.height - _yScale(d.y)}
                />
              </g>
            </g> */
}
