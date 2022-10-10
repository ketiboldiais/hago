import { Parser } from '../Parser.js';

const parser = new Parser();

const prog = `

	def f(x) = x + 2;
	
`;

const ast = parser.Start(prog);
const t = JSON.stringify(ast, null, 2);
console.log(t);

