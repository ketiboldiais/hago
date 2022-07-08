import React from 'react';
import { Point } from './Types';

export interface CellProps {
  w: number;
  h: number;
  pos?: Point;
  fill?: string;
  stroke?: string;
}

export function Cell({
  w,
  h,
  pos = { x: 0, y: 0 },
  fill = 'none',
  stroke = 'black',
}: CellProps) {
  return (
    <rect
      width={w}
      height={h}
      x={pos.x}
      y={pos.y}
      fill={fill}
      stroke={stroke}
    />
  );
}
