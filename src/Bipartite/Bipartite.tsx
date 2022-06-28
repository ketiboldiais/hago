import React from 'react';
import { BuildEdgeData, BuildNodeData } from '../Graph/Helpers';
import { Board, BaseProps, EdgeArray, makeId, svg } from '../utils';

export interface BipartiteProps extends BaseProps {
  /**
   * An array of Edges
   */
  data: EdgeArray;
  /**
   * The font size for the nodes, measured in `rem`.
   */
  fontSize?: number;
  /**
   * The spacing between the two sets comprising the
   * the bipartite graph.
   */
  gap?: number;
  /**
   * The amount of padding between each node.
   */
  nodePadding?: number;
  /**
   * Whether the edges are directed (arrowheads
   * at the end of each edge)
   */
  isDirected?: boolean;
	/**
	 * The number of loops performed to generate the 
	 * the path.
	 */
	iterations?: number;
}

export function justify(node, n) {
	return node.sourceLinks.length ? node.depth : n - 1;
}

export function Bipartite({
  data = [
    ['a', 'x'],
    ['b', 'x'],
    ['c', 'z'],
  ],
  className = 'hago_bipartite',
  id = makeId(className),
  gap = 20,
  nodePadding = 10,
  width = 300,
  height = 300,
  scale = 100,
  cwidth = scale,
  cheight,
	
  marginTop = 50,
  marginRight = 50,
  marginLeft = 50,
  marginBottom = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: BipartiteProps) {
  const _svg = svg(width, height, margins);
  const _edges = BuildEdgeData(data);
  const _nodes = BuildNodeData(_edges);
  const _nodeCount = _nodes.length;
  const x0 = gap;
  const y0 = gap;
  const x1 = _svg.width - x0;
  const y1 = _svg.height - y0;
  const dx = 0;
  const py = nodePadding;
  const dy = py ? py : _nodeCount;
	const align = justify;
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    ></Board>
  );
}
