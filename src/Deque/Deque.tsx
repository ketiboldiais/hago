import { scaleBand } from 'd3';
import React from 'react';
import {
  ArrayData,
  BaseProps,
  Board,
  DatumArray,
  generateElements,
  Line,
  makeId,
  svg,
  Translate,
} from '../utils';

export interface DequeProps extends BaseProps {
  data: DatumArray | ArrayData;
}

export function Deque({
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  className = 'hago_queue',
  id = makeId(className),
  fontSize = 0.6,
  width = 300,
  height = width,
  scale = 100,
  cwidth = scale,
  cheight = 0.5,
  marginTop = 20,
  marginRight = 50,
  marginBottom = 20,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: DequeProps) {
  const _data = generateElements(data);
  const _queuerCount = _data.length;
  const _svg = svg(width, height, margins);
  const _xScale = scaleBand().domain(_data).range([0, _svg.width]);
  const _yScale = scaleBand()
    .domain(_data)
    .range([_svg.height / 2, 0]);
  const _width = _xScale.bandwidth();
  const _height = _yScale.bandwidth();
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <Line
        start={{ x: -margins[3] / 4, y: _height }}
        end={{ x: _svg.width + margins[1] / 4, y: _height }}
      />
      {_data.map((d, i) => {
        return (
          <g key={`${id}_${i}`} transform={Translate(_xScale(d), _height)}>
            <rect width={_width} height={_height} fill="white" stroke="black" />
            <text
              textAnchor="middle"
              dx={_width / 2}
              dy={_height / 1.5}
              fontSize={`${fontSize}rem`}
            >
              {_queuerCount - 1 - i}
            </text>

            <g className="hago_Deque_indices">
              <g className="hago_Dequeue_front_index">
                <text
                  textAnchor="middle"
                  dx={_width / 2}
                  dy={-_height / 2}
                  fontSize={`${fontSize - 0.1}rem`}
                >
                  {_queuerCount - 1 - i}
                </text>
              </g>
              <g className="hago_Dequeue_rear_index">
                <text
                  textAnchor="middle"
                  dx={_width / 2}
                  dy={_height * 2}
                  fontSize={`${fontSize - 0.1}rem`}
                >
                  {_queuerCount - 1 - i}
                </text>
              </g>
            </g>
          </g>
        );
      })}
      <Line
        start={{ x: -margins[3] / 4, y: _height * 2 }}
        end={{ x: _svg.width + margins[1] / 4, y: _height * 2 }}
        shapeRendering={'geometricPrecision'}
      />
    </Board>
  );
}
