type ASTNode = string | object;

export const Program = (val: ASTNode) => ({
  type: 'Program',
  body: val,
});
export const NumericLiteral = (val: string): ASTNode => ({
  type: 'NumericLiteral',
  value: Number(val),
});
export const StringLiteral = (val: string) => ({
  type: 'StringLiteral',
  value: val.slice(1, -1),
});
export const ExpressionStatement = (val: ASTNode) => ({
  type: 'ExpressionStatement',
  expression: val,
});
export const BlockStatement = (val: ASTNode[]) => ({
  type: 'BlockStatement',
  expression: val,
});
export const EmptyStatement = () => ({
  type: 'EmptyStatement',
});
export const BinaryExpression = (
  op: string,
  left: ASTNode,
  right: ASTNode
) => ({
  type: 'BinaryExpression',
  operator: op,
  left,
  right,
});
