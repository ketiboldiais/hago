import React from 'react';
import { shouldHide } from '@utils/index';

export function RenderTreeNodes(
  _nodes: d3.HierarchyNode<unknown>[],
  nodeFontSize: number,
  nodeRadius: number = 5
) {
  return (
    <g className="hago_tree_nodes">
      {_nodes.map((d: any) => {
        return (
          <g transform={`translate(${d.x}, ${d.y})`} display={shouldHide(d)}>
            <circle stroke={'currentColor'} r={nodeRadius} fill={'white'} />
            <text
              textAnchor="middle"
              fontSize={`${nodeFontSize}rem`}
              dy="0.3em"
            >
              {d.id}
            </text>
          </g>
        );
      })}
    </g>
  );
}
