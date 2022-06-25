import React from 'react';
import { Text } from '@utils/index';

export function RenderHeightMarks(
  markHeight: boolean,
  _nodes: d3.HierarchyNode<unknown>[],
  heightStartsAt: number,
  nodeRadius: number,
  nodeFontSize: number
): React.ReactNode {
  if (markHeight) {
    return (
      <g className="hago_tree_height_marks">
        {_nodes
          .filter((d: any) => !d.data.hide)
          .map((d: any) => {
            return (
              <Text
                val={d.height + heightStartsAt}
                pos={{ x: d.x, y: d.y }}
                dx={nodeRadius + nodeRadius / 2}
                dy={nodeRadius / 2}
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
