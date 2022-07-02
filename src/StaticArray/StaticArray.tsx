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
  Text,
  Marker,
  Line,
} from '../utils';

export function StaticArray({
  data = [1, 2, 3, 4],
  reverseIndex = false,
  startIndex = 0,
  className = 'hago_StaticArray',
  id = makeId(className),
  width = 300,
  height = 300,
  scale = 100,
  cwidth = scale,
  cheight = 0.5,
  marginTop = 50,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
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
              <Text
                val={d.val}
                pos={{
                  x: _sideLength / 2.8,
                  y: -_sideLength / 3,
                }}
                fitContent={true}
              />
            </g>
            <g className="hago_StaticArray_index_text">
              <Text
                val={
                  reverseIndex
                    ? _data.length - 1 - (i - startIndex)
                    : i + startIndex
                }
                pos={{
                  x: -_sideLength / 2.2,
                  y: _sideLength / 1.5,
                }}
                fontSize={0.6}
              />
            </g>

            {d.ant && (
              <g className="hago_StaticArray_annotation">
                <Text
                  val={d.ant || d.ant.val}
                  pos={{
                    x: -_sideLength / 1.5,
                    y: -_sideLength - marginTop / 6,
                  }}
                  fitContent={true}
                />
              </g>
            )}

            {d.ptr && (
              <g
                className="hago_StaticArray_pointer"
                transform={Translate(
                  -_sideLength / 1.65,
                  _sideLength + marginBottom + 2
                )}
              >
                <Text
                  val={d.ptr}
                  pos={{
                    x: -5,
                    y: -margins[2] / 3 - 1,
                  }}
                  fontSize={0.6}
                  fitContent={true}
                />
                <Line
                  start={{
                    x: 0,
                    y: -10,
                  }}
                  end={{
                    x: 0,
                    y: -margins[2] / 1.5,
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
