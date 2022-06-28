import React from 'react';
import { Translate, Line, Text } from '../../utils';

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
      <Text
        val={d.ptr}
        fontSize={0.7}
        anchor={'end'}
        pos={{ x: -fwidth / 2.5, y: fheight / 8 }}
      />
    </g>
  );
}
