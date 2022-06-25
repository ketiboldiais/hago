import React from 'react';
import { Text } from '@utils/index';

export function DataField(
  _nodeWidth: number,
  _nodeHeight: number,
  d: any,
  isIndexed: boolean,
  i: number
) {
  return (
    <g className="hago_LinkedList_datafield">
      <rect
        width={_nodeWidth}
        height={_nodeHeight}
        stroke="black"
        fill="white"
      />
      {DataFieldText(d, _nodeWidth, _nodeHeight)}
      {isIndexed ? indexText(i, _nodeWidth, _nodeHeight) : <></>}
    </g>
  );
}

function DataFieldText(d: any, _nodeWidth: number, _nodeHeight: number) {
  return (
    <g className="hago_LinkedList_text_data">
      <Text
        val={d.val}
        pos={{ x: _nodeWidth / 2, y: _nodeHeight / 1.2 }}
        fontSize={0.55}
      />
    </g>
  );
}

function indexText(
  i: number,
  _nodeWidth: number,
  _nodeHeight: number
): React.ReactNode {
  return (
    <g className={'hago_LinkedList_text_index'}>
      <Text
        val={i}
        fontSize={0.45}
        pos={{ x: _nodeWidth / 1.5, y: _nodeHeight + 10 }}
      />
    </g>
  );
}
