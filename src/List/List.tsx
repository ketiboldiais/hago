import React from "react";
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

export interface ListProps {
	data:(number|string)[],
	pointers?: {[k:number]:string},
	double?:boolean
}

type nodeObj = {
	d: (number|string),
	p?: (number|string),
}

function buildNode(d: any,double:boolean) {
	let val=d;
	if ((d as nodeObj).d) {
		val = (d as nodeObj).d;
	}
	if (double) {
		return `{\\boxed{~${val}~}}{\\mathclap{~}{\\rightleftarrows}}`;
	} else {
		if ((d as nodeObj).d) {
			let ptr=`\\longrightarrow`;
			if ((d as nodeObj).p) {
				ptr = `\\nearrow`;
			}
			return `{\\boxed{~${val}~}}{\\mathclap{~}{${ptr}}}`;
		} else {
			return `{\\boxed{~${val}~}}{\\mathclap{~}{\\longrightarrow}}`;
		}
	}
}

function buildPointer(d:any) {
	return `\\overset{\\normalsize{${d}}}`;
}

function appendNull() {
	return `\\varnothing`;
}

function buildList(d: any, p: any, double:boolean) {
	const L = d.length;
	let str = [];
	for (let i = 0; i < L; i++) {
		if (p[i]) {
			str.push(buildPointer(p[i]));
		}
		str.push(buildNode(d[i],double));
	}
	str.push(appendNull());
	return str.join('');
}

export function List({
	data=[2,3,4,5],
	pointers={},
	double=false,
}:ListProps) {
	const str = buildList(data, pointers, double);
	return (
		<div className={`hago_Array`}>
			{/* <p>`${str}`</p> */}
			<TeX math={str}/>
		</div>
	)
}