import React from 'react';
import { Board } from '../Board/Board';
import { BaseProps, EdgeArray, IsALinkObject, IsAnEdgeObject } from '../utils';

export interface GraphProps extends BaseProps {
  data: EdgeArray;
  id?: string;
  className?: string;
  radius?: number;
  link?: 'line' | 'path';
  isDirected?: boolean;
  edgeLength?: number;
  fontSize?: number;
  repulsion?: number;
  blast?: number;
}

export function generateGraphData(data: EdgeArray) {
  // type Edge = [GraphNode, GraphNode] | LinkObject | EdgeObject;
  // so, must check each of these types
  if (IsALinkObject(data[0])) {
    // handler
  } else if (IsAnEdgeObject(data[0])) {
    // handler
  } else {
    // handle
  }
}

export function Graph({
  data = [
    [1, 2],
    [2, 4],
    [5, 6],
  ],
}: GraphProps) {
  const _data = generateGraphData(data);
  return (
    <Board
      className={''}
      width={0}
      height={0}
      cwidth={0}
      cheight={0}
      margins={[]}
    ></Board>
  );
}
