import React from 'react';
import { Maths } from './Maths';

interface LatexProps {
  text: string;
  offset: { x: number; y: number };
  dx: number;
  dy: number;
  width: number;
  height: number;
  fontsize: number;
  color: string;
}

export const Latex = ({
  text,
  width = 50,
  offset = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  height = 50,
  fontsize = 0.7,
  color = 'black',
}: LatexProps) => {
  return (
    <g transform={`translate(${offset.x}, ${offset.y})`} dx={dx} dy={dy}>
      <foreignObject width={width} height={height}>
        <div
          style={{
            fontSize: `${fontsize}rem`,
            textAlign: 'center',
            // width: 'fit-content',
            color: color,
          }}
        >
          <Maths val={text} />
        </div>
      </foreignObject>
    </g>
  );
};
