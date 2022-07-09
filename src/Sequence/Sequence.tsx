import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
  Board,
  AxisHorizontal,
  AxisVertical,
  Line,
  makeId,
  SequenceProps,
  svg,
  Translate,
} from '../utils';
import { MakeSequenceData } from './Helpers';

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
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  start = 0,
  end = 20,
  tickSep = 50,
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

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g transform={Translate(0, _yScale(0))}>
        <AxisHorizontal
          domain={[_xMin, _xMax]}
          range={[0, _svg.width]}
          tickSep={tickSep}
          removeEndTicks={removeEndTickX}
          dy={marginBottom / 2}
          fitContent={true}
          latex={false}
        />
      </g>
      <g transform={Translate(_xScale(0), 0)}>
        <AxisVertical
          domain={[_yMin, _yMax]}
          range={[_svg.height, 0]}
          tickSep={tickSep}
          fitContent={true}
          dx={-marginLeft / 4}
          dy={tickSep / 10 / 2}
          removeEndTicks={removeEndTickY}
          textAnchor="end"
          latex={false}
        />
      </g>
      <g className="hago_sequence_plot_points">
        {_dataPoints.map((d, i) => {
          return (
            <g
              className={d.className ? d.className : 'hago_plot_point'}
              key={`${id}_${i}`}
            >
              {renderLolly ? (
                <Line
                  start={{
                    x: _xScale(d.x),
                    y: _yScale(0),
                  }}
                  end={{
                    x: _xScale(d.x),
                    y: _yScale(d.y),
                  }}
                />
              ) : (
                <></>
              )}
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
      </g>
    </Board>
  );
}
