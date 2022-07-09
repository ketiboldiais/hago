import React from 'react';
import { Translate, Line } from '../../utils';

export function RenderFramePointer(
  fheight: number,
  fwidth: number,
  d: any
): React.ReactNode {
  return (
    <g
      className="stack_frame_pointer"
      transform={Translate(0, fheight / 2 - 5)}
    >
      <Line
        start={{
          x: -fwidth / 3,
          y: 0,
        }}
        end={{
          x: 0,
          y: 0,
        }}
        color={'black'}
        markerEnd={'stackFramePointerArrow'}
      />
      <text fontSize={`0.6rem`} dx={-fwidth / 2.8} dy={2.5} textAnchor="end">
        {d.ptr}
      </text>
    </g>
  );
}
