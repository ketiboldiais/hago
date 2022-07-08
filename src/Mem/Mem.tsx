import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
  Board,
  makeId,
  svg,
  Translate,
  RegisterObject,
  MemProps,
} from '../utils';
import { BuildMemoryData } from './Helpers';

export function Mem({
  data = [1, 2, 3, 4, 5],
  className = 'hago_mem',
  id = makeId(className),
  endian = 'little',
  addressLength = 2,
  cellWidth = addressLength * 20,
  cellHeight = addressLength * 20,
  dataSize = 1,
  startAddressAt = 0,
  width = data.length * 40,
  height = data.length * cellHeight,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = cellHeight,
  marginRight = cellHeight,
  marginBottom = cellHeight,
  marginLeft = cellHeight,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: MemProps) {
  const _svg = svg(width, height, margins);
  const _data = BuildMemoryData(data, startAddressAt, addressLength, dataSize);
  const _number_of_frames = BuildMemoryData(data).length;
  const _rangeBounds =
    endian === 'little' ? [_svg.height, 0] : [0, _svg.height];
  const _scale = scaleLinear()
    .domain([0, _number_of_frames])
    .range(_rangeBounds);
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g transform={Translate(_svg.width / 2, 0)}>
        {_data.map((d: RegisterObject, i: number) => {
          return (
            <g
              className={d.className}
              key={`${id}_cell_${i}`}
              transform={Translate(0, _scale(i))}
            >
              <g className="memory_cell_address">
                <rect
                  width={cellWidth}
                  height={cellHeight / 2}
                  stroke={'black'}
                  fill="none"
                  display={d.display}
                />
                <text
                  dx={cellWidth >> 1}
                  dy={cellHeight / 3}
                  fontSize={`0.7rem`}
                  textAnchor="middle"
                >{`${d.a}`}</text>
              </g>
              <g
                className="memory_cell_value"
                transform={Translate(cellWidth, 0)}
              >
                <rect
                  width={cellWidth}
                  height={cellHeight / 2}
                  stroke={'black'}
                  fill="none"
                  display={d.display}
                />
                <text
                  fontSize={'0.7rem'}
                  textAnchor="middle"
                  dx={cellWidth >> 1}
                  dy={cellHeight / 3}
                >{`${d.val}`}</text>
              </g>
              <g
                className="memory_cell_value"
                transform={Translate(cellWidth * 2, 0)}
              >
                {d.id && (
                  <text
                    dx={5}
                    dy={cellHeight / 3}
                    fontSize="0.7rem"
                    textAnchor="start"
                  >
                    {d.id}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </g>
    </Board>
  );
}
