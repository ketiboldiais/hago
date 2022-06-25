import { scaleBand } from 'd3';
import React from 'react';
import {
  Board,
  BaseProps,
  svg,
  ArrayData,
  generateElements,
  makeId,
  SetClassName,
  Translate,
  Text,
  ElementPointerArray,
} from '@utils/index';

export interface StaticArrayProps extends BaseProps {
  data: ArrayData;
  pointers: ElementPointerArray;
  reverseIndex?: boolean;
  startIndex?: number;
}

export function StaticArray({
  data = [1, 2, 3, 4],
  pointers = [],
  reverseIndex = false,
  startIndex = 0,
  className = 'hago_StaticArray',
  id = makeId(className),
  width = 0.574045 * data.length ** 2 + 22.878 * data.length + 45.8824,
  height = 80,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: StaticArrayProps) {
  if (pointers) {
    height = 100;
    margins = [marginTop, marginLeft, marginBottom * 2.5, marginLeft];
  }
  const _svg = svg(width, height, margins);
  const _data = generateElements(data);
  const _scale = scaleBand()
    .domain(_data)
    .range([0, _svg.width])
    .paddingInner(0.1);

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
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
              width={_scale.bandwidth()}
              height={_scale.bandwidth()}
            />
            <g className="hago_StaticArray_element_text">
              <Text
                val={d.val}
                pos={{ x: _scale.bandwidth() / 2, y: _scale.bandwidth() / 1.5 }}
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
                  x: _scale.bandwidth() / 2,
                  y: _scale.bandwidth() + _scale.bandwidth() / 2,
                }}
              />
            </g>

            {d.ant ? (
              <g className="hago_StaticArray_annotation">
                <Text
                  val={d.ant || d.ant.val}
                  pos={{ x: _scale.bandwidth() / 2, y: -4 }}
                />
              </g>
            ) : (
              <></>
            )}
          </g>
        );
      })}
      {pointers.map((d) => {
        return (
          <g
            className="hago_StaticArray_pointer"
            transform={Translate(
              (_scale.bandwidth() / 8) * d.i,
              _svg.height * 2.6
            )}
          >
            <Text
              val={d.val}
              pos={{
                x: _scale.bandwidth() * d.i + _scale.bandwidth() / 2,
                y: 0,
              }}
            />
            <line
              x1={d.i * _scale.bandwidth() + _scale.bandwidth() / 2}
              y1={-margins[2] / 4}
              x2={d.i * _scale.bandwidth() + _scale.bandwidth() / 2}
              y2={-margins[2] / 1.5}
              stroke={'black'}
            />
          </g>
        );
      })}
    </Board>
  );
}
