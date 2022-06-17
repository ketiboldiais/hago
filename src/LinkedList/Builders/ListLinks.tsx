import React from 'react';

export function Links(
  _nodeWidth: number,
  _nodeHeight: number,
  _scale,
  id: string
) {
  return (
    <g className="hago_LinkedList_links">
      <line
        stroke="black"
        x1={_nodeWidth + _nodeWidth / 4}
        y1={_nodeHeight / 2}
        x2={_nodeWidth + _scale.bandwidth()}
        y2={_nodeHeight / 2}
        markerEnd={`url(#${id}_LinkedList_Arrowhead)`}
        markerStart={`url(#${id}_LinkedList_LinkOrigin)`}
      />
    </g>
  );
}
