import React from 'react';
import { scaleBand } from 'd3-scale';
import {
  Board,
  svg,
  makeId,
  Datum,
  IsaDatum,
  IsLiteral,
  Translate,
  JaggedArrayData,
  JaggedArrayProps,
} from '../utils';

export function JaggedArray({
  data = [
    [1, 2, 3, 4],
    [1, 2, 3],
    [4, 5, 6],
    [8, 9],
    [7, 3, 2, 5, 8],
  ],
  className = 'hago_jagged_array',
  id = makeId(className),
  width = 300,
  height = width+100,
  fontSize = 0.8,
  scale = 50,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  padding = 0.3,
}: JaggedArrayProps) {
  const _svg = svg(width, height, margins);
  const _data = MakeJaggedArrayData(data);
  const _scaleX = scaleBand()
    .range([0, _svg.width])
    .domain(_data.jaggedElementsArray.map((d) => `${d.group}`));
  const _scaleY = scaleBand()
    .range([0, _svg.height])
    .domain(_data.jaggedElementsArray.map((d) => `${d.id}`))
    .padding(padding);
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
      <>
        {_data.jaggedIndicesArray.map((d, i) => {
          return (
            <g
              className={d.class}
              key={`jaggedIndex_${id}_${i}`}
              transform={Translate(-_rectWidth / 1.5, _scaleY(`${d.val}`))}
            >
              <text
                dy={_rectHeight / (0.9 + fontSize)}
                dx={_rectWidth / 2}
                textAnchor="middle"
                fontSize={`${fontSize-0.1}rem`}
              >
                {d.val}
              </text>
              {/* <Text
                val={d.val}
                fontSize={0.6}
                // dy={_rectHeight / 2 + 3}
                height={_rectHeight}
                width={_rectWidth}
              /> */}
            </g>
          );
        })}
        {_data.jaggedElementsArray.map((d, i) => {
          return (
            <g
              key={`jaggedElement_${id}_${i}`}
              className={d.class}
              transform={Translate(_scaleX(`${d.group}`), _scaleY(`${d.id}`))}
            >
              <g className={'hago_JaggedArray_row_index'}>
                <text
                  dy={_rectHeight * (1 + padding)}
                  dx={_rectWidth / 2}
                  fontSize={`${fontSize - 0.1}rem`}
                  textAnchor="middle"
                >
                  {d.group}
                </text>
              </g>
              <rect
                stroke={'black'}
                fill={'none'}
                width={_rectWidth}
                height={_rectHeight}
              />
              <text
                dx={_rectWidth / 2}
                dy={_rectHeight / (0.9 + fontSize)}
                textAnchor="middle"
                fontSize={`${fontSize}rem`}
              >
                {d.val}
              </text>
              {/* <Text
                val={d.val}
                pos={{ x: 0, y: -_rectHeight / 7 }}
                width={_rectWidth}
                height={_rectHeight}
              /> */}
            </g>
          );
        })}
      </>
    </Board>
  );
}

export function MakeJaggedArrayData(data: JaggedArrayData) {
  let jaggedIndicesArray: Datum[] = [];
  let jaggedElementsArray: Datum[] = [];
  let jaggedIndex: Datum;
  let jaggedElement: Datum;
  for (let i = 0; i < data.length; i++) {
    jaggedIndex = { val: i, class: `hago_jagged_array_index` };
    jaggedIndicesArray.push(jaggedIndex);
    for (let j = 0; j < data[i].length; j++) {
      if (IsaDatum(data[i][j])) {
        // handle element object
        jaggedElementsArray.push(data[i][j] as Datum);
      } else if (IsLiteral(data[i][j])) {
        // handle literal
        jaggedElement = {
          val: data[i][j] as string,
          id: i,
          group: j,
          class: `hago_jagged_array_element`,
        };
        jaggedElementsArray.push(jaggedElement);
      } else {
        throw new Error('Improper data format');
      }
    }
  }
  return {
    jaggedIndicesArray,
    jaggedElementsArray,
  };
}
