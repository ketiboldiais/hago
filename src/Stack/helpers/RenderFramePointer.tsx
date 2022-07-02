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
        val={`\\texttt{${d.ptr}}`}
        fontSize={0.6}
        pos={{ x: -fwidth / 1.4, y: -fheight / 1.8 }}
        fitContent={true}
        textAlign="right"
      />
    </g>
  );
}
