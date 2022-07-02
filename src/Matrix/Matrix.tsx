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
  Text,
  MatrixData,
  MatrixProps,
} from '../utils';
import { range } from 'd3';

export function Matrix({
  data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  className = 'hago_jagged_array',
  id = makeId(className),
  width = 200,
  height = width - 35,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: MatrixProps) {
  const _svg = svg(width, height, margins);
  const _columnIndices = range(data[0].length);
  const _data = MakeMatrixData(data);
  console.log(_data);
  const _scaleX = scaleBand()
    .range([0, _svg.width])
    .domain(_data.jaggedElementsArray.map((d) => `${d.group}`));
  const _scaleY = scaleBand()
    .range([0, _svg.height])
    .domain(_data.jaggedElementsArray.map((d) => `${d.id}`));
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
            <>
              <g
                className={'hago_matrix_row_index'}
                key={`jaggedIndex_${id}_${i}`}
                transform={Translate(-10, _scaleY(`${d.val}`))}
              >
                <Text
                  val={d.val}
                  fontSize={0.6}
                  fitContent={true}
                  pos={{ x: -_rectWidth / 3, y: 0 }}
                />
              </g>
            </>
          );
        })}
        {_columnIndices.map((d, i) => {
          return (
            <g
              className={'hago_matrix_column_index'}
              key={`jaggedIndex_${id}_${i}`}
              transform={Translate(_scaleX(`${i}`), 0)}
            >
              <Text
                val={d}
                fontSize={0.6}
                pos={{ x: _rectWidth / 2.5, y: -_rectHeight }}
                fitContent={true}
              />
            </g>
          );
        })}
        {_data.jaggedElementsArray.map((d, i) => {
          return (
            <g
              key={`hago_matrix_element_${id}_${i}`}
              className={`hago_matrix_data ${d.class}`}
              transform={Translate(_scaleX(`${d.group}`), _scaleY(`${d.id}`))}
            >
              <rect
                stroke={'black'}
                fill={'none'}
                width={_rectWidth}
                height={_rectHeight}
              />
              <Text
                val={d.val}
                pos={{ x: _rectWidth / 2.5, y: -_rectHeight / 6 }}
                fitContent={true}
              />
            </g>
          );
        })}
      </>
    </Board>
  );
}

export function MakeMatrixData(data: MatrixData) {
  let jaggedIndicesArray: Datum[] = [];
  let jaggedElementsArray: Datum[] = [];
  let jaggedIndex: Datum;
  let jaggedElement: Datum;
  for (let i = 0; i < data.length; i++) {
    jaggedIndex = { val: i, class: `jagged_array_index` };
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
          class: `jagged_array_element`,
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
