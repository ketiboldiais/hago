import React from 'react';
import { Point } from './Types/TypeDefinitions';

export interface LineProps {
  start: Point;
  end: Point;
  color?: string;
  strokeWidth?: number;
  dash?: number;
  markerEnd?: string;
  markerStart?: string;
}

export function Line({
  start,
  end,
  color = 'black',
  strokeWidth = 1,
  dash = 0,
  markerEnd = '',
  markerStart = '',
}: LineProps) {
  return (
    <line
      x1={start.x}
      x2={end.x}
      y1={start.y}
      y2={end.y}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dash}
      markerEnd={`url(#${markerEnd})`}
      markerStart={`url(#${markerStart})`}
    />
  );
}
