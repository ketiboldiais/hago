import React from 'react';
import { shouldHide } from '@utils/index';

export function RenderTreeEdges(
  _links: d3.HierarchyLink<unknown>[],
  id: string
) {
  return (
    <g className="hago_tree_edges">
      {_links.map((d: any, i) => {
        return (
          <g className="hago_tree_edge" key={`${id}_tree_edge_${i}`}>
            <line
              x1={d.source.x}
              y1={d.source.y}
              x2={d.target.x}
              y2={d.target.y}
              display={shouldHide(d)}
              stroke={'currentColor'}
            />
          </g>
        );
      })}
    </g>
  );
}
