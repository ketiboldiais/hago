import { scaleBand } from 'd3';
import React from 'react';
import { Board } from '../Board/Board';
import {
  svg,
  BaseProps,
  makeId,
  Translate,
  SetClassName,
  Text,
  StackData,
  formatStackData,
} from '../utils';

export interface StackProps extends BaseProps {
  data: StackData;
  scale?: number;
  fwidth?: number;
  fheight?: number;
}

export const Stack = ({
  data = ['f()', 'g()', 'h()'],
  className = 'hago_stack',
  id = makeId(className),
  width = 350,
  height = data.length * 10 + 70,
  fwidth = 70,
  fheight = 20,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 10,
  marginRight = 10,
  marginBottom = 10,
  marginLeft = 10,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: StackProps) => {
  const _svg = svg(width, height, margins);
  const _data = formatStackData(data);
  const _number_of_frames = _data.length;
  const _scale = scaleBand()
    .domain(_data)
    .range([0, _number_of_frames * 25]);
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
            key={`${id}_${i}`}
            transform={Translate(_svg.width / 2, _scale(d))}
            className={SetClassName(d.class, `hago_stack_frame`)}
          >
            <rect
              x={d.popped ? fwidth / 2 : -fwidth / 2}
              y={0}
              dy={5}
              fill="white"
              stroke="black"
              opacity={d.popped ? 0.7 : 1}
              height={fheight}
              width={fwidth}
            />
            <Text
              val={d.val}
              pos={{ x: d.popped ? fwidth : 0, y: fheight / 2 }}
              dy={5}
            />
            {d.ant ? (
              <g className={'hago_stack_annotation'}>
                <Text
                  val={d.ant || d.ant.val}
                  pos={{
                    x: d.ant.pos === 'left' ? 0 : fwidth + 3,
                    y: fheight / 2,
                  }}
                  dy={5}
                />
              </g>
            ) : (
              <></>
            )}
          </g>
        );
      })}
    </Board>
  );
};
