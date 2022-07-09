import { scaleBand } from 'd3-scale';
import React from 'react';
import {
  Board,
  svg,
  makeId,
  Translate,
  AxisHorizontal,
  AxisVertical,
  StackPlotProps,
} from '../utils';
import { MakeStackPlotData } from './helpers';

export function StackPlot({
  data = [
    ['f'],
    ['f', 'g'],
    ['f', 'g', 'h'],
    ['f', 'g', 'h', 'h'],
    ['f', 'g', 'h', 'h', 'h'],
    ['f', 'g', 'h', 'h'],
    ['f', 'g', 'h'],
    ['f', 'g'],
    ['f'],
  ],
  axisGroups = [],
  className = 'hago_stack',
  id = makeId(className),
  width = 500,
  height = 150,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: StackPlotProps) {
  const _svg = svg(width, height, margins);
  const _data = MakeStackPlotData(data, axisGroups);
  const _xMax = _data.xMax;
  const _xMin = _data.xMin;
  const _yMax = _data.yMax;
  const _yMin = _data.yMin;
  const _scaleX = scaleBand()
    .range([0, _svg.width])
    .domain(_data.points.map((d) => `${d.x}`))
    .padding(0.06);
  const _scaleY = scaleBand()
    .range([_svg.height, 0])
    .domain(_data.points.map((d) => `${d.y}`));
  const _rectWidth = _scaleX.bandwidth();
  const _rectHeight = _scaleY.bandwidth();
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="stack_plot">
        <g className="stack_plot_y_xis">
          <AxisVertical
            domain={[_yMin, _yMax + 1]}
            range={[_svg.height, 0]}
            tickSep={_rectHeight}
            dx={-marginLeft / 4}
            dy={_rectHeight / 8}
            textAnchor={'end'}
            removeEndTicks={false}
            latex={false}
          />
        </g>
        <g className="stack_plot_x_axis" transform={Translate(0, _svg.height)}>
          <AxisHorizontal
            domain={[_xMin, _xMax]}
            range={[0, _svg.width - _rectWidth / 1.8]}
            tickSep={_rectWidth}
            dx={0}
            dy={marginBottom / 2}
            fitContent={false}
            removeEndTicks={false}
            axisLabelArray={axisGroups}
            latex={false}
          />
        </g>
        {_data.points.map((d, i) => {
          return (
            <g
              key={`${id}_stack_plot_${i}`}
              transform={Translate(_scaleX(`${d.x}`), _scaleY(`${d.y}`))}
            >
              <rect
                width={_rectWidth}
                height={_rectHeight}
                stroke={'black'}
                fill={'none'}
              />
              {d.id && (
                <text
                  textAnchor="middle"
                  dy={_rectHeight / 1.5}
                  dx={_rectWidth / 2}
                >
                  {d.id}
                </text>
              )}
              {/* {d.id && <Text val={d.id} pos={{ x: -2, y: -_rectHeight / 2 }} />} */}
            </g>
          );
        })}
      </g>
    </Board>
  );
}
