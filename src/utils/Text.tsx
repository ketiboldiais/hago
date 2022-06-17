import React from 'react';
import { Coordinate } from './BaseProps';

import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

type TextFormat = 'latex' | 'plain';

type Anchor = 'start' | 'middle' | 'end';

type TextAlignment = 'right' | 'center' | 'left' | 'justify';

interface TextProps {
  val: number | string | boolean;
  fontSize?: number;
  type?: TextFormat;
  color?: string;
  pos?: Coordinate;
  dx?: number;
  dy?: number;
  anchor?: Anchor;
  width?: number;
  height?: number;
  align?: TextAlignment;
}

export function Text({
  val,
  type = 'plain',
  fontSize = 0.8,
  color = 'black',
  pos = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  anchor = 'middle',
  width = 50,
  height = 50,
}: TextProps) {
  if (type === 'plain') {
    return (
      <text
        textAnchor={anchor}
        x={pos.x}
        y={pos.y}
        dx={`${dx}rem`}
        dy={`${dy}rem`}
        fontSize={`${fontSize}rem`}
        fill={color}
      >
        {val}
      </text>
    );
  } else {
    return (
      <g transform={`translate(${pos.x}, ${pos.y})`}>
        <foreignObject width={width} height={height}>
          <div
            style={{
              fontSize: `${fontSize}rem`,
              textAlign: 'center',
            }}
          >
            <TeX math={`${val}`} />
          </div>
        </foreignObject>
      </g>
    );
  }
}
