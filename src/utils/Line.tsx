import React from 'react';
import { LineProps } from './Types';

export function Line({
  start,
  end,
  color = 'black',
  strokeWidth = 1,
  dash = 0,
  markerEnd,
  markerStart,
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
      markerEnd={markerEnd ? `url(#${markerEnd})` : ''}
      markerStart={markerStart ? `url(#${markerStart})` : ''}
    />
  );
}
