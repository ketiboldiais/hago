import React from 'react';
import { FrameProps } from '../../utils';

export function StackFrame({
  width,
  height,
  stroke,
  fill,
  className,
}: FrameProps) {
  return (
    <rect
      width={width}
      height={height}
      stroke={stroke}
      fill={fill}
      className={className}
    />
  );
}
