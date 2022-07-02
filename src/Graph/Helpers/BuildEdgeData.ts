import {
  EdgeArray,
  EdgeObject,
  LinkObject,
  IsALinkObject,
  IsAnEdgeObject,
} from '../../utils';

export function BuildEdgeData(data: EdgeArray): EdgeObject[] {
  /*
   *  type Edge = [GraphNode, GraphNode] | LinkObject | EdgeObject;
   *  so, must check each of these types as we loop
   *  the output should be an array of edge objects:
   *
   *    { source: GraphNode; target: GraphNode, ...props };
   *
   */

  let edges = [];
  let edge: EdgeObject;
  for (let i = 0; i < data.length; i++) {
    if (IsALinkObject(data[i])) {
      /* handle edge object
       *
       * link object has the format:
       *
       * type LinkObject = {
       *   link: [GraphNode, GraphNode];
       *   name: Datum | Literal;
       *   className: string;
       * };
       *
       */

      let links = (data[i] as LinkObject).link;
      edge = { source: links[i][0], target: links[i][1], ...links };
      edges.push(edge);
    } else if (IsAnEdgeObject(data[0])) {
      /* handle edge object
       *
       * An EdgeObject has the format:
       *
       *   type EdgeObject = {
       *     source: string | number;
       *     target: string | number;
       *     name?: string;
       *     weight?: number;
       *     className?: string;
       *   };
       *
       */

      edges.push(edge);
    } else {
      // handle  graphnode[]
      const datum: (string | number)[] = data[i] as unknown as (
        | string
        | number
      )[];
      const nodeCount = datum.length ? datum.length : 0;
      if (nodeCount > 0) {
        for (let k = 0; k < nodeCount; k++) {
          const current = datum[k];
          const next = datum[(k + 1) % nodeCount];
          const edge = { source: current, target: next };
          edges.push(edge);
        }
      } else {
        continue;
      }
    }
  }

  return edges;
}
