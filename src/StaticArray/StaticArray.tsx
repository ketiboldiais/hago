import { scaleBand } from 'd3-scale';
import React from 'react';
import {
  StaticArrayProps,
  Board,
  svg,
  generateElements,
  makeId,
  SetClassName,
  Translate,
  Marker,
  Line,
} from '../utils';

export function StaticArray({
  data = [1, 2, 3, 4],
  reverseIndex = false,
  startIndex = 0,
  className = 'hago_StaticArray',
  id = makeId(className),
  width = 0.574045 * data.length ** 2 + 22.878 * data.length + 45.8824,
  height = width,
  scale = 100,
  cwidth = scale,
  cheight = 0.5,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: StaticArrayProps) {
  const _svg = svg(width, height, margins);
  const _data = generateElements(data);
  const _scale = scaleBand()
    .domain(_data)
    .range([0, _svg.width])
    .paddingInner(0.1);
  const _sideLength = _scale.bandwidth();

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <defs>
        <Marker
          id={`Hago_StaticArray_Pointer`}
          refX={0}
          refY={0}
          width={5}
          height={5}
          orient={'auto'}
        />
      </defs>
      {_data.map((d, i) => {
        return (
          <g
            className={SetClassName(d.class, 'hago_StaticArray_element')}
            key={`${id}_${i}`}
            transform={Translate(_scale(d), 0)}
          >
            <rect
              fill={'white'}
              stroke={'black'}
              width={_sideLength}
              height={_sideLength}
            />
            <g className="hago_StaticArray_element_text">
              <text
                textAnchor="middle"
                fontSize={'0.7rem'}
                dx={_sideLength / 2}
                dy={_sideLength / 1.5}
              >
                {d.val}
              </text>
            </g>
            <g className="hago_StaticArray_index_text">
              <text
                textAnchor="middle"
                fontSize={'0.6rem'}
                dx={_sideLength / 2}
                dy={_sideLength * 1.5}
              >
                {reverseIndex
                  ? _data.length - 1 - (i - startIndex)
                  : i + startIndex}
              </text>
            </g>

            {d.ant && (
              <g className="hago_StaticArray_annotation">
                <text
                  textAnchor="middle"
                  fontSize={'0.6rem'}
                  dx={_sideLength / 2}
                  dy={-_sideLength / 2}
                >
                  {d.ant || d.ant.val}
                </text>
              </g>
            )}

            {d.ptr && (
              <g
                className="hago_StaticArray_pointer"
                transform={Translate(-_sideLength / 1.65, _sideLength * 2.3)}
              >
                <text dx={5} dy={-3} textAnchor="middle" fontSize={`0.6rem`}>
                  {d.ptr}
                </text>

                <Line
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 0,
                    y: -margins[2] / 2.5,
                  }}
                  color={'black'}
                  markerEnd={`Hago_StaticArray_Pointer`}
                />
              </g>
            )}
          </g>
        );
      })}
    </Board>
  );
}
