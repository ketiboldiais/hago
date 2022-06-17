import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

interface LatexProps {
  text: string;
  offset?: { x: number; y: number };
  width?: number;
  height?: number;
  fontsize?: number;
}

export const Latex = ({
  text,
  width = 50,
  offset = { x: 0, y: 0 },
  height = 50,
  fontsize = 0.7,
}: LatexProps) => {
  return (
    <g transform={`translate(${offset.x}, ${offset.y})`}>
      <foreignObject width={width} height={height}>
        <div
          style={{
            fontSize: `${fontsize}rem`,
            textAlign: 'center',
            width: 'fit-content',
          }}
        >
          <TeX math={text} />
        </div>
      </foreignObject>
    </g>
  );
};
