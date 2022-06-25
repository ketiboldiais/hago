import React from 'react';
import { Text } from '@utils/index';

function generateLevels(nodeList) {
  const arr = [];
  let depth = nodeList[0].depth;
  arr.push(nodeList[0]);
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].depth > depth) {
      arr.push(nodeList[i]);
      depth = nodeList[i].depth;
    }
  }
  return arr;
}

export function RenderLevelMarks(
  _markLevels: boolean,
  _nodes: d3.HierarchyNode<unknown>[],
  _svg: { width: number; height: number },
  _fontSize: number
): React.ReactNode {
  if (_markLevels) {
    return (
      <g className="hago_tree_levels">
        {generateLevels(_nodes).map((d) => {
          return (
            <g>
              <Text
                val={d.depth + 1}
                pos={{ x: 0, y: d.y + 3 }}
                color={'lightgrey'}
                fontSize={_fontSize - 0.2}
              />
              <line
                x1={-_svg.width + _svg.width + 10}
                y1={d.y}
                x2={_svg.width}
                y2={d.y}
                stroke={'lightgrey'}
              />
            </g>
          );
        })}
      </g>
    );
  } else {
    return <></>;
  }
}
