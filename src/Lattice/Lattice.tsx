import { scaleLinear } from 'd3-scale';
import React from 'react';
import {
	BaseProps,
  Board,
  Text,
  makeId,
  svg,
	Latex} from '../utils';

type TUPLE = { xy: [number, number][], t?: string, class?: string, d?:boolean, fs?:number};
function isTuple(d: any) {
	return (d as TUPLE).xy !== undefined;
}

export interface LatticeProps extends BaseProps {
	data: [(number|TUPLE),(number|TUPLE)][],
	xMax: number,
	yMax: number,
	wh:[number,number],
	noedges:boolean,
	margin:number,
	idx:boolean|number,
	rix:boolean|number,
	cix:boolean|number,
}

export function Lattice({
	data = [],
	idx=false,
	rix = false || idx,
	cix = false || idx,
	className=`Hago_Lattice`,
	noedges=false,
	id = makeId(className),
	xMax=10,
	yMax=10,
	width=250,
	height=width/1.25,
	wh=[width,height],
	scale=100,
	cwidth=scale,
	cheight,
	margin=50,
	marginTop=0,
  marginRight=margin,
  marginBottom=margin,
  marginLeft=margin,
  margins=[marginTop, marginRight, marginBottom, marginLeft],
}:LatticeProps) {
	const _svg = svg(wh[0], wh[1], margins);
	const _xScale = scaleLinear().domain([0,xMax]).range([0,_svg.width]);
  const _yScale = scaleLinear().domain([0,yMax]).range([_svg.height,0]);
	let circles = [];
	const L = data.length;
	let count=0;
	for (let i = 0; i < xMax; i++) {
		for (let j = 0; j < yMax; j++) {
			let circobj = {r:3, fill:'none', stroke:'black', className:'lattice-point',cx:i,cy:j}
			if (count<data.length && isTuple(data[count])) {
				let d = data[count] as unknown as TUPLE;
				circobj.cx=d.xy[0];
				circobj.cy=d.xy[1];
				circobj.className=`${d.class}`;
				circobj.text=d.t;
				circobj.fontsize=d.fs?d.fs:1;
			}
			count++;
			circles.push(circobj)
		}
	}
	let lines = [];
	if (!noedges) {
		for (let i = 0; i < data.length-1; i++) {
			let x1:any, y1:any, x2:any, y2:any;
			if ((data[i] as unknown as TUPLE).d===false||(data[i+1] as unknown as TUPLE).d===false) {
				continue;
			}
			if (isTuple(data[i])) {
				x1 = (data[i] as unknown as TUPLE).xy[0];
				y1 = (data[i] as unknown as TUPLE).xy[1];
			} else {
				x1 = data[i][0];
				y1 = data[i][1];
			}
			if (isTuple(data[i+1])) {
				x2 = (data[i+1] as unknown as TUPLE).xy[0];
				y2 = (data[i+1] as unknown as TUPLE).xy[1];
			} else {
				x2 = data[i+1][0];
				y2 = data[i+1][1];
			}
			lines.push({ x1, y1, x2, y2, stroke: `black`, width: 1 });
		}
	}
	return (
		<Board className={className} width={width} height={height} cwidth={cwidth} cheight={cheight} margins={margins}>
			<g transform={`translate(${_xScale(xMax/4)})`}>
				{!noedges && renderEdges()}
				{(rix!==false) && renderColumnIndices()}
				{(cix!==false) && renderRowIndices()}
				<g className={`Hago_Lattice_Point_Labels`}>
				{circles.map((d,i) => {
					return d.text && (<g transform={`translate(${_xScale(d.cx)},${_yScale(d.cy)})`}><Latex text={d.text} fontsize={d.fontsize} offset={{ x: 4, y: -25 }} fitContent={true}/></g>)
				})}
				</g>
				<g className={`Hago_Lattice_Points`}>
					{circles.map((d,i) => {return (renderPoint(d, i))})}
				</g>
			</g>
		</Board>
	)

	function renderEdges() {
		return <g className={`Hago_Lattice_Path`}>
			{lines.map((d,i) => {
				return (<line x1={_xScale(d.x1)} y1={_yScale(d.y1)} x2={_xScale(d.x2)} y2={_yScale(d.y2)} stroke={d.stroke} strokeWidth={d.width} key={`latticeLine${id}${i}`} />);
			})}
		</g>;
	}

	function renderPoint(d: any, i: number): JSX.Element {
		return <circle r={d.r} fill={d.fill} stroke={d.stroke} cx={_xScale(d.cx)} cy={_yScale(d.cy)} key={`LatticeCircle${id}${i}`} className={`${d.className}`}>
		</circle>;
	}

	function renderRowIndices() {
		return <g className={'lattice-row-indices'}>
			{circles.filter((d, i) => i < xMax).map((d, i) => {
				return (<Text val={`${cix === -1 ? (xMax-1) - i : i}`} pos={{ x: _xScale(i), y: _yScale(0) + 25 }} latex={false} key={`latticerow${id}${i}`} />);
			})}
		</g>;
	}

	function renderColumnIndices() {
		return <g className={'lattice-col-indices'}>
			{circles.filter((d, i) => i < yMax).map((d, i) => {
				return (<Text val={`${rix === -1 ? (yMax-1) - i : i}`} pos={{ x: _xScale(0) - 25, y: _yScale(i) + 4 }} latex={false}  key={`latticecol${id}${i}`} />);
			})}
		</g>;
	}
}