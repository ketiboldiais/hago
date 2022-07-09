const and = (arg: [boolean, boolean]) => {
  return arg[0] && arg[1];
};
const nand = (arg: [boolean, boolean]) => !(arg[0] && arg[1]);

const or = (arg: [boolean, boolean]) => arg[0] || arg[1];

const nor = (arg: [boolean, boolean]) => !(arg[0] || arg[1]);

const xor = (arg: [boolean, boolean]) =>
  (arg[0] || arg[1]) && !(arg[0] && arg[1]);

const xnor = (arg: [boolean, boolean]) =>
  (arg[0] && arg[1]) || (!arg[0] && !arg[1]);

const equiv = (arg: [boolean, boolean]) =>
  (arg[0] && arg[1]) || (!arg[0] && !arg[1]);

const not = (arg: boolean) => !arg;

const cxy = (arg: [boolean, boolean]) => !arg[0] || arg[1];

const iff = (arg: [boolean, boolean]) =>
  (arg[0] && arg[1]) || (!arg[0] && !arg[1]);

const opq = () => false;

const vpq = () => true;

const data = [];

export function permuteTF(vars: string[]) {
  const AMOUNT_OF_VARIABLES = vars.length;
  let output: boolean[][] = [];
  for (let i = 0; i < 1 << AMOUNT_OF_VARIABLES; i++) {
    let boolArr = [];
    for (let j = AMOUNT_OF_VARIABLES - 1; j >= 0; j--) {
      let k = vars[j];
      let res = {};
      res[k] = Boolean(i & (1 << j));
      boolArr.push(res);
    }

    output.push(boolArr);
  }
  return output;
}

// let tt = [];

// function evaluator(f: Function, arg, fname: string) {
//   const argCount = arg.length;
//   let res = {};
//   let arr = [];
//   for (let i = 0; i < argCount; i++) {
//     let argset = arg[i];
//     let arg1, arg2;
//     for (let j = 0; j < argset.length; j++) {
//       arg1 = Object.values(argset[0])[0];
//       arg2 = Object.values(argset[1])[0];
//     }
//     res = f([arg1, arg2]);
//     let r = {};
//     r[`${fname}_${i}`] = res;
//     arr.push([r]);
//   }
//   tt.push(arr);
// }

// export function EvalTruth(data: Proposition) {
//   tt;
//   if (typeof data === 'string') {
//     const res = permuteTF([data]);
//     tt.push(res);
//     return { vals: res, data};
//   } else if (
//     Array.isArray(data) &&
//     typeof data[0] === 'string' &&
//     typeof data[1] === 'string'
//   ) {
//     const res = permuteTF(data as string[]);
//     tt.push(res);
//     return { vals: res, data};
//   } else if (typeof data === 'object') {
//     if ((data as AND).and) {
//       let arg = EvalTruth((data as AND).and).vals;
//       evaluator(and, arg, 'and');
// 			return and;
//     } else if ((data as OR).or) {
//       let arg = EvalTruth((data as OR).or).vals;
//       evaluator(or, arg, 'or');
//     } else if ((data as NAND).nand) {
//       let arg = EvalTruth((data as NAND).nand).vals;
//       evaluator(nand, arg, 'nand');
//     } else if ((data as NOR).nor) {
//       let arg = EvalTruth((data as NOR).nor).vals;
//       evaluator(nor, arg, 'nor');
//     } else if ((data as XOR).xor) {
//       let arg = EvalTruth((data as XOR).xor).vals;
//       evaluator(xor, arg, 'xor');
//     } else if ((data as XNOR).xnor) {
//       let arg = EvalTruth((data as XNOR).xnor).vals;
//       evaluator(xnor, arg, 'xnor');
//     } else if ((data as EQUIV).equiv) {
//       let arg = EvalTruth((data as EQUIV).equiv).vals;
//       evaluator(equiv, arg, 'equiv');
//     } else if ((data as CXY).cxy) {
// 			let arg = EvalTruth((data as CXY).cxy).vals;
//       evaluator(cxy, arg, 'ifthen');

//     }
// 	} else {
// 		return EvalTruth([data[0], data[1]]);
// 	}
// }

// const test: Proposition = { cxy: ['a', {and: ['b', 'c']}] };

// const res = EvalTruth(test);
// function flattenObject(ob) {
//   var toReturn = {};

//   for (var i in ob) {
//     if (!ob.hasOwnProperty(i)) continue;

//     if (typeof ob[i] == 'object' && ob[i] !== null) {
//       var flatObject = flattenObject(ob[i]);
//       for (var x in flatObject) {
//         if (!flatObject.hasOwnProperty(x)) continue;

//         toReturn[i + '.' + x] = flatObject[x];
//       }
//     } else {
//       toReturn[i] = ob[i];
//     }
//   }
//   return toReturn;
// }
