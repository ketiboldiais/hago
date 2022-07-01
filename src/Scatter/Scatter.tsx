import { scaleLinear } from 'd3-scale';
import React from 'react';
import { FunctionPlot } from '../Plot/FunctionPlot';
import {
  Board,
  AxisHorizontal,
  AxisVertical,
  makeId,
  svg,
  Translate,
  BaseProps,
  IsAnArray,
  IsaNumber,
  IsDefined,
  ReturnSmaller,
  ReturnLarger,
  Text,
} from '../utils';

export type ScatterDatumObject = {
  x: number;
  y: number;
  g: string | number;
  className?: string;
};

export function IsaScatterDatumObject(datum: any) {
  return (
    IsDefined((datum as ScatterDatumObject).x) &&
    IsDefined((datum as ScatterDatumObject).y) &&
    IsDefined((datum as ScatterDatumObject).g)
  );
}

export type TupleXY = [number, number];
export function IsATupleXY(datum: any) {
  return (
    IsAnArray(datum) &&
    datum.length === 2 &&
    IsaNumber(datum[0]) &&
    IsaNumber(datum[1])
  );
}

export type ScatterData = ScatterDatumObject[] | TupleXY[] | TupleXY[][];

export interface ScatterProps extends BaseProps {
  data: ScatterData;
  regression?: Regression;
  r?: number;
  start?: number;
  end?: number;
  tickSep?: number;
  removeEndTicks?: boolean;
  removeEndTickX?: boolean;
  removeEndTickY?: boolean;
}

export function MakeScatterData(data: ScatterData, start: number, end: number) {
  let xMin = start;
  let xMax = start;
  let yMin = start;
  let yMax = end;
  let dataPoints: ScatterDatumObject[] = [];
  if (IsAnArray(data)) {
    // ok, can proceed
    for (let i = 0; i < data.length; i++) {
      /**
       * Handle ScatterDatumObject first since it's easiest
       */

      if (IsaScatterDatumObject(data[i])) {
        dataPoints.push(data[i] as ScatterDatumObject);
      } else if (IsATupleXY(data[i])) {
        let x = (data[i] as TupleXY)[0];
        let y = (data[i] as TupleXY)[1];
        let g = i;
        let datum = { x, y, g };
        xMin = ReturnSmaller(x, xMin);
        yMin = ReturnSmaller(y, yMin);
        xMax = ReturnLarger(x, xMax);
        yMax = ReturnLarger(y, yMax);
        dataPoints.push(datum);
      } else if (IsAnArray(data[i])) {
        for (let j = 0; j < (data[i] as TupleXY[]).length; i++) {
          let x = (data[i] as TupleXY[])[i][j];
          let y = (data[i] as TupleXY[])[i][j];
          let g = i;
          let datum = { x, y, g };
          xMin = ReturnSmaller(x, xMin);
          yMin = ReturnSmaller(y, yMin);
          xMax = ReturnLarger(x, xMax);
          yMax = ReturnLarger(y, yMax);
          dataPoints.push(datum);
        }
      } else {
        throw new Error('Improper array data format.');
      }
    }
  } else {
    throw new Error('Improper data format.');
  }

  return { xMin, xMax, yMin, yMax, dataPoints };
}

export type Regression = 'basicLinear';

export function LinearRegression(dataset: ScatterData) {
  const count = dataset.length;
  let sumX = 0;
  let sumY = 0;
  let sumX2 = 0;
  let sumXY = 0;
  let sum_of_residuals_squared = 0;
  let total_sum_of_squares = 0;
  for (let i = 0; i < count; i++) {
    let x = (dataset[i] as ScatterDatumObject).x;
    let y = (dataset[i] as ScatterDatumObject).y;
    sumX += x;
    sumY += y;
    sumX2 += Math.pow(x, 2);
    sumXY += x * y;
    console.log({ sumX, sumY, sumX2, sumXY });
  }
  let xMean = sumX / count;
  let yMean = sumY / count;
  let slope = (sumXY - sumX * yMean) / (sumX2 - sumX * xMean);
  let yIntercept = yMean - slope * xMean;
  let sign = yIntercept < 0 ? '-' : '+';
  let lineFunction = (x: number) => slope * x + yIntercept;
  for (let i = 0; i < count; i++) {
    let true_y = (dataset[i] as ScatterDatumObject).y;
    let predicted_y = lineFunction(true_y);
    sum_of_residuals_squared += Math.pow(true_y - predicted_y, 2);
    total_sum_of_squares += Math.pow(sum_of_residuals_squared - yMean, 2);
  }
  let rsquared = 1 - sum_of_residuals_squared / total_sum_of_squares;
  let rsquaredLabel = `𝑅² = ${rsquared}`;

  return {
    f: lineFunction,
    label: `𝑦 = ${slope}𝑥 ${sign} ${Math.abs(yIntercept)}`,
    rsquared,
    rsquaredLabel,
  };
}

export function Scatter({
  data = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 8],
  ],
  regression,
  r = 3,
  className = 'hago_sequence',
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
  start = 0,
  end = 20,
  tickSep = 50,
  removeEndTicks = false,
  removeEndTickX = removeEndTicks,
  removeEndTickY = removeEndTicks,
}: ScatterProps) {
  const _svg = svg(width, height, margins);
  const _data = MakeScatterData(data, start, end);
  const _dataPoints = _data.dataPoints;
  console.log(_dataPoints);
  const _xMin = _data.xMin;
  const _xMax = _data.xMax;
  const _yMin = _data.yMin;
  const _yMax = _data.yMax;

  const _xScale = scaleLinear().domain([_xMin, _xMax]).range([0, _svg.width]);
  const _yScale = scaleLinear().domain([_yMin, _yMax]).range([_svg.height, 0]);
  // const _regressionData =  LinearRegression(_dataPoints, _xScale, _yScale);
  let _regressionData;
  switch (regression) {
    case 'basicLinear':
      _regressionData = LinearRegression(_dataPoints);
      break;
    default:
      _regressionData = false;
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
      <g className="hago_sequence_plot_points">
        {_dataPoints.map((d, i) => {
          return (
            <g
              className={d.className ? d.className : 'hago_plot_point'}
              key={`${id}_${i}`}
            >
              <circle
                r={r}
                key={`${id}_${i}`}
                cx={_xScale(d.x)}
                cy={_yScale(d.y)}
                fill={'white'}
                stroke={'black'}
              />
            </g>
          );
        })}
        {_regressionData ? (
          <>
            {FunctionPlot(
              { f: _regressionData.f },
              _xScale,
              _yScale,
              1000,
              [_xMin, _xMax],
              [_yMin, _yMax]
            )}
            <g transform={Translate(_svg.width / 2, 0)}>
              <Text val={_regressionData.label} anchor={'middle'} />
              <Text
                val={_regressionData.rsquaredLabel}
                anchor={'middle'}
                dy={_svg.height / 15}
              />
            </g>
          </>
        ) : (
          <></>
        )}
      </g>
    </Board>
  );
}
