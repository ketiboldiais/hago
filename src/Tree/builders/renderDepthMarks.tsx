import React from 'react';
import { Text } from '../../utils';

export function RenderDepthMarks(
  markDepth: boolean,
  _nodes: d3.HierarchyNode<unknown>[],
  id: string,
  nodeRadius: number,
  nodeFontSize: number
): React.ReactNode {
  if (markDepth) {
    return (
      <g className="hago_tree_depth_marks">
        {_nodes.map((d: any, i: number) => {
          return (
            <Text
              val={d.depth}
              pos={{ x: d.x, y: d.y }}
              key={`${id}_${i}`}
              dy={-nodeRadius - nodeRadius / 2}
              fontSize={nodeFontSize - 0.2}
            />
          );
        })}
      </g>
    );
  } else {
    return <></>;
  }
}
