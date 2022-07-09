import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
  StackProps,
  Board,
  svg,
  makeId,
  Translate,
  SetClassName,
  formatStackData,
} from '../utils';
import {
  RenderFramePointer,
  StackFrame,
  DefinePointerArrowHead,
} from './helpers';

export const Stack = ({
  data = ['f()', 'g()', 'h()'],
  className = 'hago_stack',
  id = makeId(className),
  fheight = 30,
  fwidth = 70,
  width = 350,
  height = data.length * fheight,
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
  const _scale = scaleLinear()
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
      <g>
        {DefinePointerArrowHead()}
        {_data.map((d, i) => {
          return (
            <g
              key={`stack_frame_${id}_${i}`}
              transform={Translate(_svg.width / 2, _scale(i))}
              className={SetClassName(d.className, 'stack_frame')}
            >
              <StackFrame
                width={fwidth}
                height={fheight - 10}
                stroke={'black'}
                fill={'none'}
              />
              <text
                dx={fwidth / 2}
                textAnchor="middle"
                dy={fheight / 2}
                fontSize={`0.8rem`}
              >
                {d.val}
              </text>

              {d.ant && (
                <text
                  dx={fwidth + 5}
                  textAnchor="start"
                  dy={fheight / 2}
                  fontSize={`0.8rem`}
                >
                  {d.val}
                </text>
              )}
              {d.ptr && RenderFramePointer(fheight, fwidth, d)}
            </g>
          );
        })}
      </g>
    </Board>
  );
};
