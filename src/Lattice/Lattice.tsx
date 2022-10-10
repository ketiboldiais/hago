import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';
import {
	BaseProps,
  Board,
  makeId,
  svg,
  Translate,
} from '../utils';

export interface LatticeProps extends BaseProps {
	data: [number,number][]
	xMax: number,
	yMax: number,
}

export function Lattice({
	data = [
		[0,0],[1,0],[1,1],[1,2],
		[1,3],[1,4],[2,4],[2,5],
		[3,5],[3,6],[4,6],[4,7],
		[5,7],[6,7],[7,7],[7,8],
		[8,8],[8,9],[9,9]
	],
	width=300,
	height=300,
	xMax=10,
	yMax=10,
	scale=100,
	className=`Hago_Lattice`,
	cwidth=scale,
	cheight=scale,
	marginTop=10,
  marginRight=10,
  marginBottom=10,
  marginLeft=10,
  margins=[marginTop, marginRight, marginBottom, marginLeft],
}:LatticeProps) {
	const _svg = svg(width, height, margins);
	const _xScale = scaleLinear().domain([0,xMax]).range([0,_svg.width]);
  const _yScale = scaleLinear().domain([0,yMax]).range([_svg.height,0]);
	let circles = [];
	let maxDim = xMax > yMax ? xMax : yMax;
	for (let i = 0; i < maxDim; i++) {
		for (let j = 0; j < maxDim; j++) {
			circles.push({ r:3, fill: `white`, stroke: `black`, cx:i, cy:j});
		}
	}
	let lines = [];
	for (let i = 0; i < data.length-1; i++) {
		let x1 = data[i][0]
		let y1 = data[i][1]
		let x2 = data[i+1][0]
		let y2 = data[i+1][1]
		lines.push({ x1, y1, x2, y2, stroke: `black`, width: 1 });
	}
	return (
		<Board className={className} width={width} height={height} cwidth={cwidth} cheight={cheight} margins={margins}>
			<g className={`Hago_Lattice_Path`}>
			{lines.map((d) => {
				return (<line x1={_xScale(d.x1)} y1={_yScale(d.y1)} x2={_xScale(d.x2)} y2={_yScale(d.y2)} stroke={d.stroke} strokeWidth={d.width} />)
			})}
			</g>
			<g className={`Hago_Lattice_Point`}>
			{circles.map((d) => {
				return (<circle r={d.r} fill={d.fill} stroke={d.stroke} cx={_xScale(d.cx)} cy={_yScale(d.cy)} />)
			})}
			</g>
		</Board>
	)
}