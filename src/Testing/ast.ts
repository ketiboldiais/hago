interface TreeNode {
  child: string | number | boolean;
  parent: string | number | boolean;
  hide?: boolean;
  className?: string;
	type?: string;
}

type AST = {
  t?: string;
  v: string | number;
  l?: AST;
  r?: AST;
};


const testTree: AST = {
  t: 'BinaryExpression',
  v: '+',
  l: {
    t: 'NumericLiteral',
    v: 7,
  },
  r: {
    t: 'NumericLiteral',
    v: 3,
  },
};

const BuildASTNodes = (tree: AST) => {
  let result: TreeNode[] = [
    { child: 'root', parent: '', hide: true, className: 'AST_node' },
  ];
	let i = 1;

  const traverse = (tree: AST) => {
    if (tree.v) {
			i++;
			let type = tree.t ? tree.t : "token";
			let p = i & 1 ? (i - 1) >> 1 : (i >> 1) - 1;
      let node = {
        child: tree.v,
        parent: result[p].child,
        hide: false,
				type,
        className: 'AST_node',
      };
      result.push(node);
    }
		tree.l && traverse(tree.l);
		tree.r && traverse(tree.r);
  };

	traverse(tree);
	return result;
};

const test = BuildASTNodes(testTree);
console.log(test);
