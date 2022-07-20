import {
  ArithmeticExpression,
  AssignmentExpression,
  ASTNodeType,
  BinaryExpression,
  BlockStatement,
  BooleanLiteral,
  CallExpression,
  DoWhileStatement,
  EmptyStatement,
  ExpressionStatement,
  ForStatement,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  LogicExpression,
  MemberExpression,
  NullLiteral,
  NumericLiteral,
  Program,
  ReturnStatement,
  Statement,
  StatementList,
  StringLiteral,
  UnaryExpression,
  VariableDeclaration,
  VariableStatement,
  WhileStatement,
} from './CodeWriter';
import { Parser } from './Parser';

// const parser = new Parser();

// const prog = `def f(x) = x^2 + (3*x) + (x+1);`;

// const result = JSON.stringify(parser.Start(prog), null, 2);

class Environment {
  record: {};
  constructor(record = {}) {
    this.record = record;
  }
  define(name, value) {
    this.record[name] = value;
    return value;
  }
}

class Interpreter {
  parser: Parser;
  ast: StatementList;
  statementcount: number;
  global: Environment;
  constructor(input: string) {
    this.parser = new Parser();
    this.global = new Environment();
    this.ast = this.parser.Start(input).body;
    this.statementcount = this.ast.length;
  }
  run() {
    let result;
    for (let i = 0; i < this.statementcount; i++) {
      let statement = this.ast[i];
      result = this.eval(statement);
    }
    return result;
  }
  eval(statement: any) {
    switch (statement.type) {
      case ASTNodeType.ExpressionStatement:
        return this.expressionStatement(statement);
      case ASTNodeType.VariableStatement:
        return this.variableStatement(statement as VariableStatement);
      case ASTNodeType.NumericLiteral:
        return this.numericLiteral(statement as NumericLiteral);
    }
  }
  variableStatement(node: VariableStatement) {
    const declarations = node.declarations;
    const declarationCount = declarations.length;
    for (let i = 0; i < declarationCount; i++) {
      let declaration = declarations[i];
      if (declaration === null) {
        return;
      } else {
        let name = declaration.id.name;
        let value = this.eval(declaration.init);
        return this.global.define(name, value);
      }
    }
  }
  expressionStatement(node: ExpressionStatement) {
    switch (node.expression.type) {
      case ASTNodeType.NumericLiteral:
        return this.numericLiteral(node.expression);
      case ASTNodeType.StringLiteral:
        return this.stringLiteral(node.expression);
      case ASTNodeType.BooleanLiteral:
        return this.booleanLiteral(node.expression);
      case ASTNodeType.NullLiteral:
        return this.nullLiteral(node.expression);
      case ASTNodeType.BinaryExpression:
        return this.binaryExpression(node.expression);
    }
  }
  binaryExpression(node: BinaryExpression) {
    const L = (node as ArithmeticExpression).left;
    const R = (node as ArithmeticExpression).right;
    const OP = (node as ArithmeticExpression).operator;

    const LType = L.type;
    const RType = R.type;

    if (
      LType === ASTNodeType.NumericLiteral &&
      RType === ASTNodeType.NumericLiteral
    ) {
      let left = this.numericLiteral(L);
      let right = this.numericLiteral(R);
      let f = this.arithmeticFunction(OP);
      return f(left, right);
    }
  }

  arithmeticFunction(op: string): Function {
    switch (op) {
      case '+':
        return (L: number, R: number) => L + R;
      case '-':
        return (L: number, R: number) => L - R;
      case '*':
        return (L: number, R: number) => L * R;
      case '/':
        return (L: number, R: number) => L / R;
      case '^':
        return (L: number, R: number) => L ** R;
      case '%':
        return (L: number, R: number) => L % R;
      default:
        return (L: number) => L;
    }
  }
  numericLiteral(node: NumericLiteral) {
    return Number(node.value);
  }
  stringLiteral(node: StringLiteral) {
    return node.value;
  }
  booleanLiteral(node: BooleanLiteral) {
    return node.value;
  }
  nullLiteral(node: NullLiteral) {
    return node.value;
  }
}

const test = `let x = 0;`;

const progAST = new Interpreter(test);
const p = progAST.run();

const ast = JSON.stringify(progAST.ast, null, 2);
ast;
// const result = JSON.stringify(p, null, 2);
// result;
