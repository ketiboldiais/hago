import React from 'react';
import { makeId } from '../utils';

interface CartProdProps {
	x: (string | number)[];
	y: (string | number)[];
	className: string;
	id: string;
}

export function CartProd({
	x = [1, 2, 3, 4],
	y = [1, 2, 3, 4],
	className = `CartProd`,
	id = makeId(className)
}: CartProdProps) {
	const cartesianProduct = [];

	for (let i = 0; i < x.length; i++) {
		let row = [];
		for (let j = 0; j < y.length; j++) {
			row.push([x[i],y[j]]);
		}
		cartesianProduct.push(row);
	}

	return (
		<table className={`hago_CartProd`}>
			<tbody>
				<tr>
					<td style={{ visibility: `hidden` }}></td>
					{y.map((d, i) => { return (<td key={`${id}y${i}`} className={`y_variable`}>{d}</td>) })}
				</tr>
				{
					cartesianProduct.map((e:any,j:number)=> {return (
						<tr key={`${id}c${j}`}>
							<td className={`x_variable`}>{e[0][0]}</td>
							{e.map((cell: any) => { return <td key={`${id}d${j}`}>{`(${cell[0]}, ${cell[1]})`}</td>})}
						</tr>
					)})
				}
			</tbody>
		</table>
	)
};