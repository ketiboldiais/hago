import React from 'react';
import { Coordinate } from './BaseProps';

type Anchor = 'start' | 'middle' | 'end';

type TextAlignment = 'right' | 'center' | 'left' | 'justify';

interface TextProps {
  val: number | string | boolean;
  fontSize?: number;
  color?: string;
  pos?: Coordinate;
  dx?: number;
  dy?: number;
  anchor?: Anchor;
  align?: TextAlignment;
}

export function Text({
  val,
  fontSize = 0.8,
  color = 'black',
  pos = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  anchor = 'middle',
}: TextProps) {
  return (
    <text
      textAnchor={anchor}
      x={pos.x}
      y={pos.y}
      dx={dx}
      dy={dy}
      fontSize={`${fontSize}rem`}
      fill={color}
    >
      {val}
    </text>
  );
}
