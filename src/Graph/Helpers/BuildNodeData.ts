import { EdgeObject, NodeObject } from '../../utils';

/**
 * `BuildNodeData` generates an array of nodes for
 * a `<Graph/>`.
 *
 * @param edges is always an array of EdgeObjects,
 * since the only argument passed is the result
 * of calling `BuildEdgeData`.
 *
 * EdgeObjects always have the form:
 * @type EdgeObject = {
 *   source: GraphNode;
 *   target: GraphNode;
 *   name?: string;
 *   weight?: number;
 *   className?: string;
 * };
 *
 * @return is always an array of UNIQUE node objects.
 * NodeObjects have the form:
 *
 * @type NodeObject = {
 * 	id: Literal;
 * 	className?: string;
 * 	r?: number;
 * 	ant?: AntObject;
 * };
 *
 ***/

export function BuildNodeData(edges: EdgeObject[]) {
  let nodes = {};
  let _source: NodeObject;
  let _target: NodeObject;
  let currentEdge: EdgeObject;
  for (let i = 0; i < edges.length; i++) {
    currentEdge = edges[i];
    if (currentEdge.source) {
      let _currentSource = currentEdge.source;
      _source = { id: _currentSource, ...currentEdge };
      currentEdge.source =
        nodes[_currentSource] || (nodes[_currentSource] = _source);
    }
    if (currentEdge.target) {
      let _currentTarget = currentEdge.target;
      _target = { id: _currentTarget, ...currentEdge };
      currentEdge.target =
        nodes[_currentTarget] || (nodes[_currentTarget] = _target);
    }
  }
  return Object.values(nodes);
}
