import { EdgeArray } from './EdgeArray';
import { BaseProps } from '../BaseProps';

/**
 * @public GraphProps
 * The props used in the `Graph` component.
 * `GraphProps` inherits all the properties
 * in `BaseProps`.
 */
export interface GraphProps extends BaseProps {
  /**
   * @public data
   * Takes an array of edges. Either an array of strings
   * or numbers:
   *
   * ["a", "b", "c"]
   *
   * or an array of edge objects:
   *
   * [
   *   {source: "a", target: "b"},
   *   {source: "b", target: "c"},
   * ]
   */
  data: EdgeArray;
  /**
   * @public id
   * A unique id for the diagram. For faster rendering,
   * supply an id. Otherwise, hago will generate a unique id
   * using date.now().
   */
  id?: string;
  /**
   * @public className
   * Supply a class name for the entire diagram.
   * The default name is `hago_graph`.
   */
  className?: string;
  /**
   * @public radius
   * Sets the radius for each node in the graph.
   */
  radius?: number;
  /**
   * @public link
   * Takes either `'line'` or `'path'`. Sets
   * whether the edges between the nodes are rendered
   * as SVG line elements or SVG path elements.
   */
  link?: 'line' | 'path';
  /**
   * @public straightEdge
   * Determines whether the edges should be rendered
   * as straight lines.
   */
  straightEdge?: boolean;
  /**
   * @public textOffsetX
   * Sets how much the node text should be offset along
   * the x-axis.
   */
  textOffsetX?: number;
  /**
   * @public textOffsetY
   * Sets how much the node text should be offset along
   * the y-axis.
   */
  textOffsetY?: number;
  /**
   * @public isDirected
   * Sets whether to render arrow heads on the edges.
   * If true, arrow heads are rendered, otherwise, no arrow heads
   * are rendered. This translates to whether the graph is
   * directed or undirected.
   */
  isDirected?: boolean;
  /**
   * @public edgeLength
   * Sets the length of the edges.
   */
  edgeLength?: number;
  /**
   * @public fontSize
   * Sets the font size for the node text.
   */
  fontSize?: number;
  /**
   * @public repulsion
   * Sets how much the graph's nodes "push"
   * each other away.
   */
  repulsion?: number;
  /**
   * @public blast
   * Sets the radial boundaries for each of the graph nodes.
   */
  blast?: number;
}
