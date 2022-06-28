import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
  Board,
  makeId,
  svg,
  Text,
  Translate,
  RegisterObject,
  MemProps,
} from '../utils';
import { BuildMemoryData } from './Helpers';

export function Mem({
  data = [1, 2, 3, 4, 5],
  className = 'hago_mem',
  id = makeId(className),
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
  console.log(_data);
  const _number_of_frames = BuildMemoryData(data).length;
  const _yScale = scaleLinear()
    .domain([0, _number_of_frames])
    .range([0, _svg.height]);
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      {_data.map((d: RegisterObject, i: number) => {
        return (
          <g
            className={d.className}
            key={`${id}_cell_${i}`}
            transform={Translate(0, _yScale(i))}
          >
            <g className="memory_cell_address">
              <rect
                width={cellWidth}
                height={cellHeight / 2}
                stroke={'black'}
                fill="none"
                display={d.display}
              />
              <Text
                val={`${d.a}`}
                pos={{ x: cellWidth >> 1, y: cellHeight / 3 }}
              />
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
              <Text
                val={`${d.val}`}
                pos={{ x: cellWidth >> 1, y: cellHeight / 3 }}
              />
            </g>
            <g
              className="memory_cell_value"
              transform={Translate(cellWidth * 2, 0)}
            >
              {d.id ? (
                <Text
                  val={`${d.id}`}
                  pos={{ x: 5, y: cellHeight / 3 }}
                  anchor="start"
                />
              ) : (
                <></>
              )}
            </g>
          </g>
        );
      })}
    </Board>
  );
}
