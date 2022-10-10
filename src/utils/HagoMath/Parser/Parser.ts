import { Tokenizer } from './Tokenizer';
import {
  ListOfArguments,
  ParameterList,
  ParseTreeBuilder,
  StatementList,
  VariableDeclarationList,
} from './CodeWriter';
import { The_token } from './TypeChecker';
import { Tell_the_user } from './ErrorHandler';
import { TokenType } from './Lexemes';
import { DefaultLexer } from './CodeWriter';

export class Parser {
  input: string;
  tokenizer: Tokenizer;
  _upcoming_token: { type: string; value: string };
  _token_aheadNext: { type: string; value: string };
  _node_called_: ParseTreeBuilder;
  constructor() {
    this.input = '';
    this._node_called_ = DefaultLexer;
    this.tokenizer = new Tokenizer();
  }
  Start(input: string) {
    this.input = input;
    this.tokenizer.init(input);
    this._upcoming_token = this.tokenizer.getNextToken();
    return this._parsed_program();
  }
  _parsed_program() {
    const the_result = this._parsed_statement_list();
    return this._node_called_.Program(the_result);
  }

  _parsed_statement_list(the_null_token: null | TokenType.right_brace = null) {
    const the_list_of_statements: StatementList = [this._parsed_statement()];
    while (
      this._is_not_null(this._upcoming_token) &&
      this._upcoming_token.type !== the_null_token
    ) {
      the_list_of_statements.push(this._parsed_statement());
    }
    return the_list_of_statements;
  }

  _parsed_statement() {
    switch (this._upcoming_token.type) {
      case TokenType.semicolon:
        return this._parsed_empty_statement();

      case TokenType.keyword_if:
        return this._parsed_if_statement();

      case TokenType.left_brace:
        return this._parsed_block_statement();

      case TokenType.keyword_let:
        return this._parsed_variable_statement();

      case TokenType.keyword_def:
        return this._parsed_function_declaration();

      case TokenType.keyword_return:
        return this._parsed_return_statement();

      case TokenType.keyword_while:
      case TokenType.keyword_do:
      case TokenType.keyword_for:
        return this._parsed_loop_statement();

      default:
        return this._parsed_expression_statement();
    }
  }

  _parsed_function_declaration() {
    this._token_is_the_(TokenType.keyword_def);

    const name = this._parsed_identifier();

    this._token_is_the_(TokenType.left_parenthesis);

    The_token._is_the_right_parenthesis(this._upcoming_token.type);

    const params = The_token._is_not_the_right_parenthesis(
      this._upcoming_token.type
    )
      ? this._parsed_list_of_formal_parameters()
      : [];

    this._token_is_the_(TokenType.right_parenthesis);

    let body;

    if (The_token._is_the_left_brace(this._upcoming_token.type)) {
      body = this._parsed_block_statement();
    } else {
      this._token_is_the_(TokenType.simple_assignment);

      body = this._parsed_expression_statement();
    }
    return this._node_called_.FunctionDeclaration(name, params, body);
  }

  _parsed_list_of_formal_parameters() {
    const params: ParameterList = [];
    do {
      params.push(this._parsed_identifier());
    } while (
      The_token._is_a_comma(this._upcoming_token.type) &&
      this._token_is_the_(TokenType.comma)
    );
    return params;
  }
  _parsed_return_statement() {
    this._token_is_the_(TokenType.keyword_return);

    const argument = The_token._is_not_the_semicolon(this._upcoming_token.type)
      ? this._parsed_expression()
      : null;

    return this._node_called_.ReturnStatement(argument);
  }
  _parsed_loop_statement() {
    switch (this._upcoming_token.type) {
      case TokenType.keyword_while:
        return this._parsed_while_statement();

      case TokenType.keyword_do:
        return this._parsed_do_while_statement();

      case TokenType.keyword_for:
        return this._parsed_for_statement();
    }
  }
  _parsed_while_statement() {
    this._token_is_the_(TokenType.keyword_while);

    this._token_is_the_(TokenType.left_parenthesis);

    const test = this._parsed_expression();

    this._token_is_the_(TokenType.right_parenthesis);

    const body = this._parsed_statement();

    return this._node_called_.WhileStatement(test, body);
  }

  _parsed_do_while_statement() {
    this._token_is_the_(TokenType.keyword_do);

    const body = this._parsed_statement();

    this._token_is_the_(TokenType.keyword_while);

    this._token_is_the_(TokenType.left_parenthesis);

    const test = this._parsed_expression();

    this._token_is_the_(TokenType.right_parenthesis);

    this._token_is_the_(TokenType.semicolon);

    return this._node_called_.DoWhileStatement(test, body);
  }
  _parsed_for_statement() {
    this._token_is_the_(TokenType.keyword_for);

    this._token_is_the_(TokenType.left_parenthesis);

    const init = The_token._is_not_the_semicolon(this._upcoming_token.type)
      ? this._parsed_loop_initializer()
      : null;

    this._token_is_the_(TokenType.semicolon);

    const test = The_token._is_not_the_semicolon(this._upcoming_token.type)
      ? this._parsed_expression()
      : null;

    this._token_is_the_(TokenType.semicolon);

    const update = The_token._is_not_the_right_parenthesis(
      this._upcoming_token.type
    )
      ? this._parsed_expression()
      : null;

    this._token_is_the_(TokenType.right_parenthesis);

    const body = this._parsed_statement();

    return this._node_called_.ForStatement(init, test, update, body);
  }

  _parsed_loop_initializer() {
    if (The_token._is_the_keyword_let(this._upcoming_token.type)) {
      return this._parsed_variable_initialization();
    }

    return this._parsed_expression();
  }

  _parsed_if_statement() {
    this._token_is_the_(TokenType.keyword_if);

    this._token_is_the_(TokenType.left_parenthesis);

    const test = this._parsed_expression();

    this._token_is_the_(TokenType.right_parenthesis);

    const consequent = this._parsed_statement();

    const alternate =
      this._is_not_null(this._upcoming_token) &&
      The_token._is_the_keyword_else(this._upcoming_token.type)
        ? this._token_is_the_(TokenType.keyword_else) &&
          this._parsed_statement()
        : null;

    return this._node_called_.IfStatement(test, consequent, alternate);
  }

  _parsed_variable_initialization() {
    this._token_is_the_(TokenType.keyword_let);

    const declarations = this._parsed_list_of_variable_declarations();

    return this._node_called_.VariableStatement(declarations);
  }

  _parsed_variable_statement() {
    const variableStatement = this._parsed_variable_initialization();

    this._token_is_the_(TokenType.semicolon);

    return variableStatement;
  }

  _parsed_list_of_variable_declarations() {
    const declarations: VariableDeclarationList = [];

    do {
      declarations.push(this._parsed_variable_declaration());
    } while (
      The_token._is_a_comma(this._upcoming_token.type) &&
      this._token_is_the_(TokenType.comma)
    );

    return declarations;
  }

  _parsed_variable_declaration() {
    const id = this._parsed_identifier();

    const init = The_token._is_not_a_separator(this._upcoming_token.type)
      ? this._parsed_variable_initializer()
      : null;

    return this._node_called_.VariableDeclaration(id, init);
  }

  _parsed_variable_initializer() {
    this._token_is_the_(TokenType.simple_assignment);

    return this._parsed_assignment_expression();
  }

  _parsed_empty_statement() {
    this._token_is_the_(TokenType.semicolon);

    return this._node_called_.EmptyStatement();
  }

  _parsed_block_statement() {
    this._token_is_the_(TokenType.left_brace);

    const body: StatementList = The_token._is_not_the_right_brace(
      this._upcoming_token.type
    )
      ? this._parsed_statement_list(TokenType.right_brace)
      : [];

    this._token_is_the_(TokenType.right_brace);

    return this._node_called_.BlockStatement(body);
  }
  _parsed_expression_statement() {
    const expression = this._parsed_expression();

    this._token_is_the_(TokenType.semicolon);

    return this._node_called_.ExpressionStatement(expression);
  }

  _parsed_expression() {
    return this._parsed_assignment_expression();
  }

  _parsed_assignment_expression() {
    const leftHandSide = this._parsed_operator_or();

    if (The_token._is_not_assignment(this._upcoming_token.type)) {
      return leftHandSide;
    }

    const operator = this._parsed_assignment_operator().value;

    let left;

    if (The_token._is_a_valid_assignment_target(leftHandSide)) {
      left = leftHandSide;
    } else {
      Tell_the_user._the_lefthand_side_is_wrong();
    }

    const right = this._parsed_assignment_expression();

    return this._node_called_.AssignmentExpression(operator, left, right);
  }

  _parsed_relation_expression() {
    return this._binary(
      '_parsed_addition_expression',
      TokenType.relation_operator
    );
  }

  _parsed_identifier() {
    const name = this._token_is_the_(TokenType.identifier).value;

    return this._node_called_.Identifier(name);
  }

  _parsed_assignment_operator() {
    if (The_token._is_simple_assignment(this._upcoming_token.type)) {
      return this._token_is_the_(TokenType.simple_assignment);
    }
    return this._token_is_the_(TokenType.complex_assignment);
  }

  _parsed_operator_or() {
    return this._logic('_parsed_operator_and', TokenType.logic_operator_or);
  }

  _parsed_operator_and() {
    return this._logic('_parsed_operator_xor', TokenType.logic_operator_and);
  }

  _parsed_operator_xor() {
    return this._logic(
      '_parsed_equality_expression',
      TokenType.logic_operator_xor
    );
  }

  _parsed_equality_expression() {
    return this._binary(
      '_parsed_relation_expression',
      TokenType.equality_operator
    );
  }

  _parsed_addition_expression() {
    return this._binary(
      '_parsed_multiplication_expression',
      TokenType.operator_add
    );
  }

  _parsed_multiplication_expression() {
    return this._binary(
      '_parsed_power_expression',
      TokenType.operator_multiply
    );
  }

  _parsed_power_expression() {
    return this._binary('_parsed_unary_expression', TokenType.operator_power);
  }

  _parsed_unary_expression() {
    let operator;
    switch (this._upcoming_token.type) {
      case TokenType.operator_add:
        operator = this._token_is_the_(TokenType.operator_add).value;
        break;
      case TokenType.logic_operator_not:
        operator = this._token_is_the_(TokenType.logic_operator_not).value;
        break;
    }

    if (this._is_not_null(operator)) {
      const argument = this._parsed_unary_expression();
      return this._node_called_.UnaryExpression(operator, argument);
    }
    return this._parsed_lefthand_side_of_the_expression();
  }

  _parsed_lefthand_side_of_the_expression() {
    return this._parsed_call_member_expression();
  }

  _parsed_call_member_expression() {
    const member = this._parsed_member_expression();
    if (The_token._is_the_left_parenthesis(this._upcoming_token.type)) {
      return this._parsed_call_expression(member);
    }
    return member;
  }

  _parsed_call_expression(callee) {
    const args = this._parsed_list_of_arguments();
    let the_call_expression = this._node_called_.CallExpression(callee, args);
    if (The_token._is_the_left_parenthesis(this._upcoming_token.type)) {
      the_call_expression = this._parsed_call_expression(the_call_expression);
    }
    return the_call_expression;
  }

  _parsed_list_of_arguments() {
    this._token_is_the_(TokenType.left_parenthesis);

    const the_argument_list = The_token._is_not_the_right_parenthesis(
      this._upcoming_token.type
    )
      ? this._list_of_arguments()
      : [];

    this._token_is_the_(TokenType.right_parenthesis);
    return the_argument_list;
  }

  _list_of_arguments() {
    const the_argument_list: ListOfArguments = [];
    do {
      the_argument_list.push(this._parsed_assignment_expression());
    } while (
      The_token._is_a_comma(this._upcoming_token.type) &&
      this._token_is_the_(TokenType.comma)
    );
    return the_argument_list;
  }

  _parsed_member_expression() {
    let object = this._parsed_primary_expression();
    while (
      The_token._is_a_tilde(this._upcoming_token.type) ||
      The_token._is_the_left_bracket(this._upcoming_token.type)
    ) {
      if (The_token._is_a_tilde(this._upcoming_token.type)) {
        this._token_is_the_(TokenType.tilde);
        const property = this._parsed_identifier();
        object = this._node_called_.MemberExpression(false, object, property);
      }
      if (The_token._is_the_left_bracket(this._upcoming_token.type)) {
        this._token_is_the_(TokenType.left_bracket);
        const property = this._parsed_expression();
        this._token_is_the_(TokenType.right_bracket);
        object = this._node_called_.MemberExpression(true, object, property);
      }
    }
    return object;
  }

  _parsed_primary_expression() {
    if (The_token._is_some_literal(this._upcoming_token.type)) {
      return this._parsed_literal();
    }
    switch (this._upcoming_token.type) {
      case TokenType.left_parenthesis:
        return this._parsed_parentheses();

      case TokenType.identifier:
        return this._parsed_identifier();

      default:
        return this._parsed_lefthand_side_of_the_expression();
    }
  }

  _parsed_parentheses() {
    this._token_is_the_(TokenType.left_parenthesis);

    const expression = this._parsed_expression();

    this._token_is_the_(TokenType.right_parenthesis);

    return expression;
  }

  _parsed_literal() {
    switch (this._upcoming_token.type) {
      case TokenType.literal_number:
        return this._parsed_numeric_literal();

      case TokenType.literal_string:
        return this._parsed_string_literal();

      case TokenType.keyword_true:
        return this._parsed_boolean_literal(true);

      case TokenType.keyword_false:
        return this._parsed_boolean_literal(false);

      case TokenType.keyword_null:
        return this._parsed_null_literal();
    }
    Tell_the_user._I_dont_recognize_that_literal();
  }

  _parsed_string_literal() {
    const token = this._token_is_the_(TokenType.literal_string);
    return this._node_called_.StringLiteral(token.value);
  }

  _parsed_numeric_literal() {
    let token = this._token_is_the_(TokenType.literal_number);
    let value = token.value;
    while (The_token._is_a_number(token.type)) {
      if (The_token._is_a_period(this._upcoming_token.type)) {
        value += this._token_is_the_(TokenType.period).value;
        value += this._token_is_the_(TokenType.literal_number).value;
      }
      return this._node_called_.NumericLiteral(value);
    }
  }

  _parsed_boolean_literal(value) {
    this._token_is_the_(
      value ? TokenType.keyword_true : TokenType.keyword_false
    );
    return this._node_called_.BooleanLiteral(value);
  }

  _parsed_null_literal() {
    this._token_is_the_(TokenType.keyword_null);
    return this._node_called_.NullLiteral();
  }

  _binary(builderName: string, operatorString: string) {
    let the_lefthand_side = this[builderName]();
    while (this._upcoming_token.type === operatorString) {
      const operator = this._token_is_the_(operatorString).value;
      const the_righthand_side = this[builderName]();

      the_lefthand_side = this._node_called_.BinaryExpression(
        operator,
        the_lefthand_side,
        the_righthand_side
      );
    }
    return the_lefthand_side;
  }

  _logic(builderName: string, operatorString: string) {
    let the_lefthand_side = this[builderName]();
    while (this._upcoming_token.type === operatorString) {
      const operator = this._token_is_the_(operatorString).value;
      const the_righthand_side = this[builderName]();
      the_lefthand_side = this._node_called_.LogicExpression(
        operator,
        the_lefthand_side,
        the_righthand_side
      );
    }
    return the_lefthand_side;
  }

  _token_is_the_(tokenType: string) {
    const token = this._upcoming_token;
    if (this._is_null(token)) {
      Tell_the_user._the_input_was_cut_short(tokenType);
    }
    if (token.type !== tokenType) {
      Tell_the_user._I_got_the_wrong_token(`${token.value}`, tokenType);
    }
    this._upcoming_token = this.tokenizer.getNextToken();
    return token;
  }

  _is_not_null(value: any) {
    return value != null;
  }
  _is_null(value: any) {
    return value === null;
  }
}

const test = `y = n % 2;`;

const result = new Parser().Start(test);
console.log(JSON.stringify(result,null,2));

