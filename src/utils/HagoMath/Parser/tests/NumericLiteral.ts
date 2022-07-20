import { Parser } from '../Parser.js';

const parser = new Parser();

const prog = `
	
	let n = array(1,2,3,4,5);
	
`;

const ast = parser.Start(prog);
const t = JSON.stringify(ast, null, 2);
console.log(t);

