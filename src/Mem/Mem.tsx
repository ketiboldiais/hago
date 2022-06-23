import { scaleLinear } from 'd3';
import React from 'react';
import { Board } from '../Board/Board';
import {
  BaseProps,
  IsDefined,
  isElement,
  IsLiteral,
  Literal,
  makeId,
  svg,
  ToHex,
  Text,
  Translate,
} from '../utils';
const y = 'hello world';
type MemoryElement = {
  val: Literal;
  a?: string;
  id?: string;
  className: string;
  display?: 'block' | 'none';
  s?: number;
};
type RegisterObject = {
  val: MemoryElement | string | number | boolean;
  a?: string | number;
  id?: string;
  s?: number;
  className?: string;
  display?: 'block' | 'none';
};

function IsRegisterObject(datum: any) {
  return IsDefined(
    (datum as RegisterObject).a && IsDefined((datum as RegisterObject).val)
  );
}

type RegisterArray = (RegisterObject | MemoryElement | Literal)[] | string;

function formatMemoryData(
  data: RegisterArray,
  startAddressAt: number = 1,
  addressLength: number = 4,
  dataSize: number = 1
) {
  let formattedData: RegisterArray = [];
  const vdots = /vdots[0-9]+/;
  let addr = startAddressAt;
  for (let i = 0; i < data.length; i++) {
    console.log(`addr:${addr} ... i:${i}`);
    if (typeof data[i] === 'string' && vdots.test(data[i] as string)) {
      console.log('hit');
      let n = parseInt(/[0-9]+/.exec(data[i] as string)[0]);
      let placeholder = { a: '⋮', val: '⋮', display: 'none' };
      addr = addr + n - 1;
      formattedData.push(placeholder as MemoryElement);
    } else if (IsRegisterObject(data[i])) {
      formattedData.push(data[i]);
      addr += (data[i] as RegisterObject).s;
    } else if (isElement(data[i])) {
      let dataElement = {
        a: ToHex(addr, addressLength),
        val: (data[i] as MemoryElement).val,
        id: (data[i] as MemoryElement).id ? (data[i] as MemoryElement).id : '',
        s: (data[i] as MemoryElement).s
          ? (data[i] as MemoryElement).s
          : dataSize,
        display: 'block',
      };
      formattedData.push(dataElement as MemoryElement);
      addr += dataElement.s;
    } else if (IsLiteral(data[i])) {
      let literalElement = {
        a: ToHex(addr, addressLength),
        val: data[i] as Literal,
        s: dataSize,
        display: 'block',
      };
      formattedData.push(literalElement as MemoryElement);
      addr += literalElement.s;
    }
  }
  console.log('end');
  return formattedData;
}

export interface MemProps extends BaseProps {
  data: RegisterArray;
  cellWidth?: number;
  cellHeight?: number;
  dataSize?: number;
  startAddressAt?: number;
  addressLength?: number;
}

export function Mem({
  data = y,
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
  const _data = formatMemoryData(data, startAddressAt, addressLength, dataSize);
  const _number_of_frames = formatMemoryData(data).length;
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
            className="memory_cell"
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
