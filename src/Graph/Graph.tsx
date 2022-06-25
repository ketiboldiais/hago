import React from 'react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3';
import { AntObject } from '../../types/utils';
import { Board } from '../Board/Board';
import { BaseProps, svg, makeId, Text, Translate } from '../utils';

export type NodeObject = {
  id: string | number;
  className?: string;
  r?: number;
  ant?: AntObject;
};

// edge types
type EdgeObject = {
  source: string | number;
  target: string | number;
  name?: string;
  weight?: number;
  className?: string;
};
export function IsAnEdgeObject(datum: any): boolean {
  return (
    (datum as EdgeObject).source !== undefined &&
    (datum as EdgeObject).source !== undefined
  );
}

export type LinkObject = {
  link: [string | number, string | number];
  name?: string | number;
  className?: string;
};
export function IsALinkObject(datum: any): boolean {
  return (datum as LinkObject).link !== undefined;
}

export type Edge = (string | number)[] | LinkObject | EdgeObject;

// edge array type
export type EdgeArray = ((string | number)[] | LinkObject | EdgeObject)[];

export function makeEdges(data: EdgeArray): EdgeObject[] {
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
       *   name: Element | Literal;
       *   className: string;
       * };
       *
       */
      
      let links = (data[i] as LinkObject).link;
      edge = { source: links[i][0], target: links[i][1], ...links};
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

/**
 * `makeNodes` generates an array of nodes for
 * a `<Graph/>`.
 *
 * @param edges is always an array of EdgeObjects,
 * since the only argument passed is the result
 * of calling `makeEdges`.
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

function makeNodes(edges: EdgeObject[]) {
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

export interface GraphProps extends BaseProps {
  data: EdgeArray;
  id?: string;
  className?: string;
  radius?: number;
  link?: 'line' | 'path';
  straightEdge?: boolean;
  textOffsetX?: number;
  textOffsetY?: number;
  isDirected?: boolean;
  edgeLength?: number;
  fontSize?: number;
  repulsion?: number;
  blast?: number;
}
const nodeContainsLoop = (d) => {
  const x1 = d.source.x;
  const y1 = d.source.y;
  const x2 = d.target.x;
  const y2 = d.target.y;
  return x1 === x2 && y1 === y2;
};
const graphPathGenerator = (d: any) => {
  let x1 = d.source.x;
  let y1 = d.source.y;
  let x2 = d.target.x;
  let y2 = d.target.y;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dr = Math.sqrt(dx * dx + dy * dy);
  // Set the defaults for a normal edge
  let drx = dr;
  let dry = dr;
  let xRotation = 0; // units are in degrees
  let largeArc = 0; // edge arc value (1 or 0)
  let sweep = 1; // edge sweep value (1 or 0)

  // Self edge.
  if (nodeContainsLoop(d)) {
    // Angle for orienting the loop.
    xRotation = -45;
    // This value must stay as 1
    largeArc = 1;
    // Change sweep to change orientation of loop.
    // sweep = 0;
    // Making drx and dry different yields an ellipse
    // rather than a circle.
    drx = 10;
    dry = 10;

    // Nudging the arc slighly to prevent collapsing
    x2 = x2 + 1;
    y2 = y2 + 1;
  }

  return `M${x1},${y1}A${drx},${dry} ${xRotation},${largeArc},${sweep} ${x2},${y2}`;
};

export function Graph({
  data = [
    [1, 2],
    [2, 4],
    [5, 6],
    [7, 6],
  ],
  className = 'hago_graph',
  id = makeId(className),
  straightEdge = false,
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  radius = 5,
  fontSize = 0.8,
  textOffsetX = radius,
  textOffsetY = -radius,
  blast = 10,
  edgeLength = 50,
  repulsion = 0.01,
  marginTop = 50,
  marginBottom = 50,
  marginRight = 50,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: GraphProps) {
  const _svg = svg(width, height, margins);
  const _edges = makeEdges(data);
  const _nodes = makeNodes(_edges);
  const _networkCenter = forceCenter()
    .x(_svg.width / 2)
    .y(_svg.height / 2);
  const _manyBody = forceManyBody().strength(-150).distanceMax(100);
  const _forceX = forceX(_svg.width / 2).strength(repulsion);
  const _forceY = forceY(_svg.height / 2).strength(repulsion);
  const force = forceSimulation(_nodes)
    .force('charge', _manyBody)
    .force('link', forceLink(_edges).distance(edgeLength).iterations(1))
    .force('center', _networkCenter)
    .force('x', _forceX)
    .force('y', _forceY)
    .force('collision', forceCollide().radius(blast))
    .stop();
  force.tick(300);
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      {_edges.map((d: any, i: number) => {
        return (
          <g key={`node_${id}_${i}`} className={'hago_graph_edges'}>
            {straightEdge ? (
              <line
                x1={d.source.x}
                y1={d.source.y}
                x2={d.target.x}
                y2={d.target.y}
                stroke={'black'}
              />
            ) : (
              <path d={graphPathGenerator(d)} stroke={'black'} fill={'none'} />
            )}
          </g>
        );
      })}
      {_nodes.map((d: any, i: number) => {
        return (
          <g
            key={`node_${id}_${i}`}
            className={'hago_graph_nodes'}
            transform={Translate(d.x, d.y)}
          >
            <circle stroke={'black'} r={radius} fill={'white'} />
            <Text
              val={d.id}
              pos={{ x: textOffsetX, y: textOffsetY }}
              fontSize={fontSize}
            />
          </g>
        );
      })}
    </Board>
  );
}
