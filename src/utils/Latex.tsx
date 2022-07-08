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
  textAlign = 'center',
  block = true,
}: LatexProps) => {
  return (
    <g transform={`translate(${offset.x}, ${offset.y})`} dx={dx} dy={dy}>
      <foreignObject width={width} height={height}>
        <div
          style={{
            fontSize: `${fontsize}rem`,
            textAlign: `${textAlign}`,
            height: fitContent ? 'fit-content' : '',
            width: fitContent ? 'fit-content' : '',
            padding: 0,
            margin: 0,
            color: color,
          }}
        >
          <Maths val={`\\text{${text}}`} block={block} />
        </div>
      </foreignObject>
    </g>
  );
};
