// interface VectorFunctionDatum {
//   i: Function;
//   j: Function;
// }

// const test: VectorFunctionDatum = {
//   i: ({ x }) => x / 2,
//   j: ({ y }) => y / 2,
// };

// function getParamNames(func: Function) {
//   var funStr = func.toString();
//   return funStr
//     .slice(funStr.indexOf('(') + 2, funStr.indexOf('}'))
//     .match(/([^\s,]+)/g);
// }

// const BuildVectorFunction = (d: VectorFunctionDatum) => {
//   const iParams = getParamNames(d.i);
//   const jParams = getParamNames(d.j);

//   const i_uses_x = iParams.includes('x');
//   const i_uses_y = iParams.includes('y');
//   const i_uses_xy = i_uses_x && i_uses_y;
//   const j_uses_x = jParams.includes('x');
//   const j_uses_y = jParams.includes('y');
//   const j_uses_xy = j_uses_x && j_uses_y;

//   let i: Function;
//   let j: Function;

//   if (i_uses_xy) {
//     i = (x: any, y: any) => d.i({ x, y });
//   } else if (i_uses_x) {
//     i = (x: any) => d.i({ x });
//   } else if (i_uses_y) {
//     i = (y: any) => d.i({ y });
//   } else {
//     return;
//   }

//   if (j_uses_xy) {
//     j = (x: any, y: any) => d.j({ x, y });
//   } else if (j_uses_x) {
//     j = (x: any) => d.j({ x });
//   } else if (j_uses_y) {
//     j = (y: any) => d.j({ y });
//   } else {
//     return;
//   }
//   return {
//     i_uses_x,
//     i_uses_y,
//     i_uses_xy,
//     j_uses_x,
//     j_uses_y,
//     j_uses_xy,
// 		i,
// 		j
//   };
// };

// const BuildVectorCoordinates = (d: VectorFunctionDatum) => {
// 	const f = BuildVectorFunction(d);
// 	let x: number;
// 	let y: number;
// 	let xs = [];
// 	let ys = [];
// 	for (let i = -5; i <= 10; i++) {
// 		for (let j = -5; j <= 10; j++) {
// 			xs.push(i);
// 			ys.push(j);
// 		}
// 	}
// 	if (f.i_uses_x) {
// 	}
// 	else if (f.i_uses_y) {}
// 	else {}

// 	if (f.j_uses_x) {}
// 	else if (f.j_uses_y) {}
// 	else {}

// 	return f;
// }

// const r = BuildVectorCoordinates(test);
// r
