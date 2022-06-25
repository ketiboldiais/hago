import React from 'react';
import { Text } from '@utils/index';

function calculateBalanceFactor(d: any): number {
  let left_child_height: any;
  let right_child_height: any;
  if (undefined != d.children) {
    let left_child = d.children[0];
    let right_child = d.children[1];
    left_child_height =
      undefined != left_child.data.hide && left_child.data.hide
        ? 0
        : left_child.height + 1;
    right_child_height =
      undefined != right_child.data.hide && right_child.data.hide
        ? 0
        : right_child.height + 1;
  } else {
    left_child_height = d.height + 1;
    right_child_height = d.height + 1;
  }
  const balance_factor = left_child_height - right_child_height;
  return balance_factor;
}

export function RenderHeightBalanceFactors(
  markHeighBF: boolean,
  _nodes: d3.HierarchyNode<unknown>[],
  nodeFontSize: number,
  nodeRadius: number
): React.ReactNode {
  if (markHeighBF) {
    return (
      <g className="hago_tree_height_balance_factor_marks">
        {_nodes
          .filter((d: any) => !d.data.hide)
          .map((d: any) => {
            return (
              <g
                className={
                  Math.abs(calculateBalanceFactor(d)) > 1
                    ? 'imbalanced'
                    : 'balanced'
                }
              >
                <Text
                  val={calculateBalanceFactor(d)}
                  fontSize={nodeFontSize - 0.2}
                  pos={{ x: d.x, y: d.y }}
                  dy={-nodeRadius - nodeRadius / 2}
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
