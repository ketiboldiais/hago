import React from 'react';
import { Marker } from '@utils/index';

export function LinkMarkers(id: string) {
  return (
    <defs>
      <Marker
        id={`${id}_LinkedList_Arrowhead`}
        refX={9}
        refY={0}
        width={5}
        height={5}
        orient={'auto'}
      />
      <Marker
        id={`${id}_LinkedList_LinkOrigin`}
        type="circle"
        circleFillColor="black"
        radius={2}
        refX={3}
        refY={3}
        width={4}
        height={4}
        cx={3}
        cy={3}
        viewbox={`0 0 6 6`}
      />
    </defs>
  );
}
