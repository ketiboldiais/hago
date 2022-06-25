import { scaleLinear } from 'd3';
import React from 'react';
import { Board } from '../Board/Board';
import {
  AxisHorizontal,
  AxisVertical,
  BaseProps,
  Line,
  makeId,
  SequenceData,
  svg,
  Translate,
} from '../utils';
import { MakeSequenceData } from './MakeSequenceData';

export interface SequenceProps extends BaseProps {
  data: SequenceData;
  /**
   * Sets the radius for the circles representing the
   * plot points.
   */
  r?: number;
  /**
   * Sets the start index for the sequence.
   * I.e., the sequence's lower bound for n.
   * By default, 5.
   */
  start?: number;
  /**
   * Sets the terminating index for the sequence.
   * I.e., the sequence's upper bound for n.
   * By default, 0.
   */
  end?: number;
  /**
   * If true, removes the end ticks on both the
   * x-axis and y-axis.
   * Otherwise, the end ticks are left on both axes.
   * The default value is false.
   * By default, 20.
   */
  removeEndTicks?: boolean;
  /**
   * If true, removes the end ticks on the x-axis.
   * Otherwise, the end ticks are left on the x-axis.
   * The default value is `removeEndTicks`.
   */
  removeEndTickX?: boolean;
  /**
   * If true, removes the end ticks on the y-axis,
   * Otherwise the end ticks are left on the y-axis.
   * The default value is `removeEndTicks`.
   */
  removeEndTickY?: boolean;
  /**
   * If true, renders a line connecting
   * a circle plot point to its corresponding
   * index (this can help the plot's readability).
   * Otherwise, no such line is rendered.
   * The default value is `true`.
   */
  renderLolly?: boolean;
}

export function Sequence({
  data = (n: number) => n ** 2 + 1,
  r = 5,
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
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  start = 0,
  end = 20,
  removeEndTicks = false,
  removeEndTickX = removeEndTicks,
  removeEndTickY = removeEndTicks,
  renderLolly = true,
}: SequenceProps) {
  const _svg = svg(width, height, margins);
  const _data = MakeSequenceData(data, start, end);
  const _dataPoints = _data.data;
  const _xMin = _data.xMin;
  const _xMax = _data.xMax;
  const _yMin = _data.yMin;
  const _yMax = _data.yMax;

  const _xScale = scaleLinear().domain([_xMin, _xMax]).range([0, _svg.width]);
  const _yScale = scaleLinear().domain([_yMin, _yMax]).range([_svg.height, 0]);

  console.log(_data);

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
          tickSep={50}
          removeEndTicks={removeEndTickX}
        />
      </g>
      <AxisVertical
        domain={[_yMin, _yMax]}
        range={[_svg.height, 0]}
        tickSep={50}
        removeEndTicks={removeEndTickY}
      />
      <g className="hago_sequence_plot_points">
        {_dataPoints.map((d, i) => {
          return (
            <>
              {renderLolly ? (
                <Line
                  start={{
                    x: _xScale(d.x),
                    y: _svg.height,
                  }}
                  end={{
                    x: _xScale(d.x),
                    y: _yScale(d.y),
                  }}
                  color={'lightgrey'}
                />
              ) : (
                <></>
              )}
              <circle
                stroke={'black'}
                r={r}
                fill={'white'}
                key={`${id}_${i}`}
                cx={_xScale(d.x)}
                cy={_yScale(d.y)}
              />
            </>
          );
        })}
      </g>
    </Board>
  );
}
