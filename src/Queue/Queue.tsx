import { scaleBand } from 'd3';
import React from 'react';
import { Board } from '../Board/Board';
import {
  BaseProps,
  ArrayData,
  ElementPointerArray,
  generateElements,
  makeId,
  svg,
  Text,
  Translate,
  Line,
  Marker,
} from '../utils';

export interface QueueProps extends BaseProps {
  data: ArrayData;
  pointers: ElementPointerArray;
  reverseIndex?: boolean;
  fontSize?: number;
  startIndex?: number;
}

export function Queue({
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  className = 'hago_queue',
  id = makeId(className),
  fontSize = 0.6,
  width = 300,
  height = width,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: QueueProps) {
  const _data = generateElements(data);
  const _queuerCount = _data.length;
  const _svg = svg(width, height, margins);
  const _xScale = scaleBand()
    .domain(_data)
    .range([0, _svg.width])
    .paddingInner(0.1);
  const _yScale = scaleBand()
    .domain(_data)
    .range([_svg.height / 2, 0]);
  const _queuerWidth = _xScale.bandwidth();
  const _queuerHeight = _yScale.bandwidth();
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="hago_queue_elements">
        <defs>
          <Marker
            id={`${id}_Queue_Enter_Arrowhead`}
            className={'hago_queue_arrow'}
            refX={9}
            refY={0}
            width={5}
            height={5}
            orient={'auto'}
            arrowColor={'lightgrey'}
          />
          <Marker
            id={`${id}_Queue_Exit_Arrowhead`}
            className={'hago_queue_arrow'}
            refX={9}
            refY={0}
            width={5}
            height={5}
            orient={'auto'}
            arrowColor={'lightgrey'}
          />
        </defs>
        <g className="hago_queue_front_label">
          <Text
            val={'out'}
            fontSize={fontSize - 0.15}
            pos={{ x: -_queuerWidth - _queuerWidth / 4, y: 0 }}
          />
          <Line
            start={{ x: _svg.width, y: 0 }}
            end={{ x: 0, y: 0 }}
            markerEnd={`${id}_Queue_Enter_Arrowhead`}
            color={'lightgrey'}
          />
        </g>
        {_data.map((d, i) => {
          return (
            <g
              key={`${id}_${i}`}
              transform={Translate(_xScale(d), _queuerHeight)}
            >
              <Text
                val={i}
                fontSize={fontSize - 0.2}
                dx={_queuerWidth / 2}
                dy={-3}
              />
              <rect
                width={_queuerWidth}
                height={_queuerHeight}
                fill="white"
                stroke="black"
              />
              <Text
                val={d.val}
                pos={{ x: _queuerWidth / 2, y: _queuerHeight / 1.5 }}
                fontSize={fontSize}
              />
              <Text
                val={_queuerCount - 1 - i}
                fontSize={fontSize - 0.2}
                dx={_queuerWidth / 2}
                dy={_queuerHeight * 1.5}
              />
            </g>
          );
        })}
        <g
          className="hago_queue_rear_labl"
          transform={Translate(_svg.width, 0)}
        >
          <Text
            val={'in'}
            fontSize={fontSize - 0.15}
            pos={{
              x: -_queuerWidth + _queuerHeight / 2,
              y: _queuerHeight * 2.2,
            }}
          />
        </g>
        <Line
          start={{ x: 0, y: _queuerHeight * 3 }}
          end={{ x: _svg.width, y: _queuerHeight * 3 }}
          markerEnd={`${id}_Queue_Exit_Arrowhead`}
          color={'lightgrey'}
        />
      </g>
    </Board>
  );
}
