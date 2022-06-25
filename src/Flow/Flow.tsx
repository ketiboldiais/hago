import dagre from 'dagre';
import { Board } from '../Board/Board';
import { BaseProps, IsDefined } from '../utils';
import React from 'react';

// by default, give the graph an object to serve as a label
// dagreGraph.setGraph({});

// by default, give each node a new object to serve as a label
// dagreGraph.setDefaultEdgeLabel(() => { return {} });

export type VertexObject = {
  val: string | number;
  // the width of the vertex;
  width?: number;
  // the height of the vertex;
  height?: number;
};

function IsVertexObject(datum: any) {
  return IsDefined((datum as VertexObject).val);
}

export type Vertex = VertexObject | string | number;

export type Link = [Vertex, Vertex];

export type LinkArray = Link[];

// dagreGraph.setNode("a", { label: "a", width: 150, height: 100 });
// dagreGraph.setNode("b", { label: "b", width: 150, height: 100 });
// dagreGraph.setNode("c", { label: "c", width: 150, height: 100 });
// dagreGraph.setNode("d", { label: "d", width: 150, height: 100 });
// dagreGraph.setNode("e", { label: "e", width: 150, height: 100 });

// dagreGraph.setEdge("a", "b");
// dagreGraph.setEdge("a", "c");
// dagreGraph.setEdge("b", "d");
// dagreGraph.setEdge("b", "e");

// dagre.layout(dagreGraph);

// console.log(dagreGraph);

function MakeDagreData(array_of_links: LinkArray) {
	for (let i = 0; i < array_of_links.length; i++) {
		let source = array_of_links[0];
		let target = array_of_links[1];
		
	}
}

const dagreGraph = new dagre.graphlib.Graph();

export interface FlowProps extends BaseProps {
  data: LinkArray;
}

export function Flow({}: FlowProps) {
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
