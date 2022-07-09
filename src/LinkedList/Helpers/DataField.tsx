import React from 'react';

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
      <text fontSize={`0.55rem`} dx={_nodeWidth / 2.5} dy={_nodeHeight / 1.25}>
        {d.val}
      </text>
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
      <text fontSize={`0.55rem`} dx={_nodeWidth / 2.5} dy={_nodeHeight * 2}>
        {i}
      </text>
    </g>
  );
}
