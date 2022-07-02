import React from 'react';
import { Maths } from './Maths';
import { LatexProps } from './Types';

export const Latex = ({
  text,
  width = 50,
  offset = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  height = 50,
  fontsize = 0.7,
  color = 'black',
  fitContent = false,
}: LatexProps) => {
  return (
    <g transform={`translate(${offset.x}, ${offset.y})`} dx={dx} dy={dy}>
      <foreignObject width={width} height={height}>
        <div
          style={{
            fontSize: `${fontsize}rem`,
            textAlign: 'center',
            height: fitContent ? 'fit-content' : '',
            width: fitContent ? 'fit-content' : '',
            color: color,
          }}
        >
          <Maths val={text} />
        </div>
      </foreignObject>
    </g>
  );
};
