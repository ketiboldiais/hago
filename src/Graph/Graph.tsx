import React from 'react';
import {
  forceCenter,
  forceCollide,
  forceManyBody,
  forceX,
  forceY,
  forceLink,
  forceSimulation,
} from 'd3-force';
import { svg, makeId, Translate, Board, GraphProps } from '../utils';
import { BuildEdgeData, BuildNodeData, BuildPath } from './Helpers';

/**
 * @public Graph
 * Creates a new graph diagram.
 */
export function Graph({
  data = [
    [1, 2],
    [2, 4],
    [5, 6],
    [7, 6],
    [6, 8],
    [8, 9],
    [11, 2],
    [0, 9],
    [12, 2],
  ],
  className = 'hago_graph',
  id = makeId(className),
  straightEdge = true,
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  radius = 10,
  fontSize = 0.8,
  textOffsetX = 0,
  textOffsetY = radius / 2,
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
  const _edges = BuildEdgeData(data);
  const _nodes = BuildNodeData(_edges);
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
              <path d={BuildPath(d)} stroke={'black'} fill={'none'} />
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
            <text
              fontSize={`${fontSize}rem`}
              dx={textOffsetX}
              dy={textOffsetY}
              textAnchor="middle"
            >
              {d.id}
            </text>
          </g>
        );
      })}
    </Board>
  );
}
