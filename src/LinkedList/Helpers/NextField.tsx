import React from 'react';
import { Translate } from '../../utils';

export function NextField(_scale, _nodeWidth: number, _nodeHeight: number) {
  return (
    <g
      className="hago_LinkedList_nextfield"
      transform={Translate(_scale.bandwidth(), 0)}
    >
      <rect
        stroke="black"
        fill="white"
        width={_nodeWidth / 2}
        height={_nodeHeight}
      />
    </g>
  );
}
