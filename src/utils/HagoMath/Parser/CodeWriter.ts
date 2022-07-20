export enum ASTNodeType {
  Program = 'Program',
  NumericLiteral = 'NumericLiteral',
  StringLiteral = 'StringLiteral',
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  EmptyStatement = 'EmptyStatement',
  BinaryExpression = 'BinaryExpression',
  LogicExpression = 'LogicExpression',
  AssignmentExpression = 'AssignmentExpression',
  UnaryExpression = 'UnaryExpression',
  CallExpression = 'CallExpression',
  ForStatement = 'ForStatement',
  WhileStatement = 'WhileStatement',
  DoWhileStatement = 'DoWhileStatement',
  BooleanLiteral = 'BooleanLiteral',
  ReturnStatement = 'ReturnStatement',
  Identifier = 'Identifier',
  FunctionDeclaration = 'FunctionDeclaration',
  VariableStatement = 'VariableStatement',
  VariableDeclaration = 'VariableDeclaration',
  IfStatement = 'IfStatement',
  NullLiteral = 'NullLiteral',
  MemberExpression = 'MemberExpression',
}

export type Program = {
  type: ASTNodeType.Program;
  body: StatementList;
};

export type StatementList = Statement[];

export type Statement =
  | EmptyStatement
  | IfStatement
  | BlockStatement
  | VariableStatement
  | FunctionDeclaration
  | ReturnStatement
  | LoopStatement
  | ExpressionStatement;

export type EmptyStatement = {
  type: ASTNodeType.EmptyStatement;
};

export type ExpressionStatement = {
  type: ASTNodeType.ExpressionStatement;
  expression: Expression;
};

export type Expression = AssignmentExpression;
export type AssignmentExpression =
  | BinaryExpression
  | {
      type: ASTNodeType.AssignmentExpression;
      operator: string;
      left: Identifier | MemberExpression;
      right: AssignmentExpression;
    };

export type Identifier = {
  type: ASTNodeType.Identifier;
  name: string;
};

export type MemberExpression = {
  type: ASTNodeType.MemberExpression;
  computed: boolean;
  object: PrimaryExpression | MemberExpression;
  property: Identifier | Expression;
};

export type PrimaryExpression =
  | Literal
  | BinaryExpression
  | UnaryExpression
  | ParenthesizedExpression
  | Identifier
  | LefthandSideExpression;

export type ParenthesizedExpression = Expression;

export type LefthandSideExpression = CallMemberExpression;

export type CallMemberExpression = MemberExpression | CallExpression;

export type CallExpression = {
  type: ASTNodeType.CallExpression;
  callee: MemberExpression;
  args: ArgumentList;
};

export type ArgumentList = ListOfArguments | [];

export type ListOfArguments = AssignmentExpression[];

export type IfStatement = {
  type: ASTNodeType.IfStatement;
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
};

export type FunctionDeclaration = {
  type: ASTNodeType.FunctionDeclaration;
  name: Identifier;
  params: ParameterList | [];
  body: BlockStatement | ExpressionStatement;
};

export type ParameterList = Identifier[];

export type ReturnStatement = {
  type: ASTNodeType.ReturnStatement;
  argument: Expression | null;
};

export type LoopStatement = WhileStatement | DoWhileStatement | ForStatement;

export type WhileStatement = {
  type: ASTNodeType.WhileStatement;
  test: Expression;
  body: Statement;
};

export type DoWhileStatement = {
  type: ASTNodeType.DoWhileStatement;
  test: Expression;
  body: Statement;
};

export type ForStatement = {
  type: ASTNodeType.ForStatement;
  init: LoopInitializer | null;
  test: Expression | null;
  update: Expression | null;
  body: Statement;
};

export type LoopInitializer = VariableInitialization | Expression;

export type BlockStatement = {
  type: ASTNodeType.BlockStatement;
  body: StatementList | [];
};

export type VariableStatement = VariableInitialization;
export type VariableInitialization = {
  type: ASTNodeType.VariableStatement;
  declarations: VariableDeclarationList;
};
export type VariableDeclarationList = VariableDeclaration[] | [null];

export type VariableDeclaration = {
  type: ASTNodeType.VariableDeclaration;
  id: Identifier;
  init: VarInit | null;
};

export type VarInit = AssignmentExpression;

export type BinaryExpression =
  | Literal
  | LogicExpression
  | ArithmeticExpression
  | {
      type: ASTNodeType.BinaryExpression;
      operator: string;
      left: Expression;
      right: Expression;
    };

export type LogicExpression = {
  type: ASTNodeType.LogicExpression;
  operator: string;
  left: Expression;
  right: Expression;
};

export type ArithmeticExpression = {
  type: ASTNodeType.BinaryExpression;
  operator: string;
  left: NumericLiteral;
  right: NumericLiteral;
};

export type Literal =
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | NumericLiteral;

export type UnaryExpression = {
  type: ASTNodeType.UnaryExpression;
  operator: string;
  argument: UnaryExpression | LefthandSideExpression;
};

export type NumericLiteral = {
  type: ASTNodeType.NumericLiteral;
  value: string;
};

export type StringLiteral = {
  type: ASTNodeType.StringLiteral;
  value: string;
};

export type BooleanLiteral = {
  type: ASTNodeType.BooleanLiteral;
  value: boolean;
};

export type NullLiteral = {
  type: ASTNodeType.NullLiteral;
  value: null;
};

export interface ParseTreeBuilder {
  Program: (val: StatementList) => Program;

  NumericLiteral: (val: string) => NumericLiteral;

  StringLiteral: (val: string) => StringLiteral;

  ExpressionStatement: (val: Expression) => ExpressionStatement;

  BlockStatement: (val: StatementList) => BlockStatement;

  EmptyStatement: () => EmptyStatement;

  BinaryExpression: (
    operator: string,
    left: Expression,
    right: Expression
  ) => BinaryExpression;

  LogicExpression: (
    operator: string,
    left: BooleanLiteral,
    right: BooleanLiteral
  ) => LogicExpression;

  AssignmentExpression: (
    operator: string,
    left: Identifier | MemberExpression,
    right: AssignmentExpression
  ) => AssignmentExpression;

  UnaryExpression: (
    operator: string,
    argument: UnaryExpression | LefthandSideExpression
  ) => UnaryExpression;

  CallExpression: (
    callee: MemberExpression,
    args: ArgumentList
  ) => CallExpression;

  ForStatement: (
    init: LoopInitializer | null,
    test: Expression | null,
    update: Expression | null,
    body: Statement
  ) => ForStatement;

  WhileStatement: (test: Expression, body: Statement) => WhileStatement;

  DoWhileStatement: (test: Expression, body: Statement) => DoWhileStatement;

  BooleanLiteral: (value: boolean) => BooleanLiteral;

  NullLiteral: () => NullLiteral;

  MemberExpression: (
    computed: boolean,
    object: PrimaryExpression | MemberExpression,
    property: Identifier | Expression
  ) => MemberExpression;

  ReturnStatement: (argument: Expression) => ReturnStatement;

  Identifier: (name: string) => Identifier;

  FunctionDeclaration: (
    name: Identifier,
    params: ParameterList,
    body: BlockStatement | ExpressionStatement
  ) => FunctionDeclaration;

  VariableStatement: (
    declarations: VariableDeclarationList
  ) => VariableInitialization;

  VariableDeclaration: (
    id: Identifier,
    init: VarInit | null
  ) => VariableDeclaration;

  IfStatement: (
    test: Expression,
    consequent: Statement,
    alternate: Statement | null
  ) => IfStatement;
}

export const DefaultLexer: ParseTreeBuilder = {
  Program: (val: StatementList) => ({
    type: ASTNodeType.Program,
    body: val,
  }),
  NumericLiteral: (val: string) => ({
    type: ASTNodeType.NumericLiteral,
    value: val,
  }),
  StringLiteral: (val: string) => ({
    type: ASTNodeType.StringLiteral,
    value: val.slice(1, -1),
  }),
  ExpressionStatement: (expression: Expression) => ({
    type: ASTNodeType.ExpressionStatement,
    expression,
  }),
  BlockStatement: (val: StatementList) => ({
    type: ASTNodeType.BlockStatement,
    body: val,
  }),
  EmptyStatement: () => ({ type: ASTNodeType.EmptyStatement }),
  BinaryExpression: (
    operator: string,
    left: Expression,
    right: Expression
  ) => ({
    type: ASTNodeType.BinaryExpression,
    operator,
    left,
    right,
  }),
  LogicExpression: (operator: string, left: Expression, right: Expression) => ({
    type: ASTNodeType.LogicExpression,
    operator,
    left,
    right,
  }),
  AssignmentExpression: (
    operator: string,
    left: Identifier | MemberExpression,
    right: AssignmentExpression
  ) => ({
    type: ASTNodeType.AssignmentExpression,
    operator,
    left,
    right,
  }),
  UnaryExpression: (
    operator: string,
    argument: UnaryExpression | LefthandSideExpression
  ) => ({
    type: ASTNodeType.UnaryExpression,
    operator,
    argument,
  }),
  CallExpression: (callee: MemberExpression, args: ArgumentList) => ({
    type: ASTNodeType.CallExpression,
    callee,
    args,
  }),
  ForStatement: (
    init: LoopInitializer | null,
    test: Expression | null,
    update: Expression | null,
    body: Statement
  ) => ({
    type: ASTNodeType.ForStatement,
    init,
    test,
    update,
    body,
  }),
  WhileStatement: (test: Expression, body: Statement) => ({
    type: ASTNodeType.WhileStatement,
    test,
    body,
  }),
  DoWhileStatement: (test: Expression, body: Statement) => ({
    type: ASTNodeType.DoWhileStatement,
    test,
    body,
  }),
  BooleanLiteral: (value: boolean) => ({
    type: ASTNodeType.BooleanLiteral,
    value,
  }),
  NullLiteral: () => ({
    type: ASTNodeType.NullLiteral,
    value: null,
  }),
  MemberExpression: (
    computed: boolean,
    object: PrimaryExpression | MemberExpression,
    property: Identifier | Expression
  ) => ({
    type: ASTNodeType.MemberExpression,
    computed,
    object,
    property,
  }),
  ReturnStatement: (argument: Expression | null) => ({
    type: ASTNodeType.ReturnStatement,
    argument,
  }),
  Identifier: (name: string) => ({ type: ASTNodeType.Identifier, name }),
  FunctionDeclaration: (
    name: Identifier,
    params: ParameterList | [],
    body: BlockStatement | ExpressionStatement
  ) => ({
    type: ASTNodeType.FunctionDeclaration,
    name,
    params,
    body,
  }),
  VariableStatement: (declarations: VariableDeclarationList) => ({
    type: ASTNodeType.VariableStatement,
    declarations,
  }),
  VariableDeclaration: (id: Identifier, init: VarInit | null) => ({
    type: ASTNodeType.VariableDeclaration,
    id,
    init,
  }),
  IfStatement: (
    test: Expression,
    consequent: Statement,
    alternate: Statement | null
  ) => ({
    type: ASTNodeType.IfStatement,
    test,
    consequent,
    alternate,
  }),
};
