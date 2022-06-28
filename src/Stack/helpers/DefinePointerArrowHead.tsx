import React from 'react';
import { ArrowHead } from '../../utils';

export function DefinePointerArrowHead() {
  return (
    <defs>
      <ArrowHead
        id={'stackFramePointerArrow'}
        arrowColor={'black'}
        refX={10}
        refY={0}
        width={6}
        height={6}
      />
    </defs>
  );
}
