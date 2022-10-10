import React from "react";
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

export interface ArrProps {
	data?: (number|string)[]
	pointers?: {[k:number]:string}
}

function buildDataString(arr:(number|string)[],ptrs:{[k:number]:string}) {
	const L = arr.length;
	let str = [`\\begin{array}{:`];
	for (let i = 0; i < L; i++) {
		if (i === L - 1) {
			str.push('c:');
		} else { str.push('c:'); }
	}
	str.push(`}`)
	for (let i = 0; i < L-1; i++) {
		if (ptrs[i]) {
			str.push(`${ptrs[i]} &`)
		} else {
			str.push(`~ &`)
		}
	}
	str.push(`~\\\\ \\hdashline `);
	for (let i = 0; i < L; i++) {
		if (i === L - 1) {
			str.push(`${arr[i]} \\\\ \\hdashline`)
		} else { str.push(`${arr[i]} & `) }
	}
	for (let i = 0; i < L; i++) {
		if (i === L - 1) {
			str.push(`{\\scriptsize ${i}} \\\\`);
		} else { str.push(` {\\scriptsize ${i}} & `); }
	}
	str.push(`\\end{array}`);
	return str.join('');
}

export function Arr({
	data = [2, 'a', 3, 'b', 1, 1, 'a'],
	pointers={}
}: ArrProps) {
	const str = buildDataString(data,pointers);
	return(
		<div className={`hago_Array`}>
			{/* <p>`${str}`</p> */}
			<TeX math={`${str}`} />
		</div>
	)
}