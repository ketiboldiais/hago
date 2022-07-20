import { TokenType } from './Lexemes';

export class The_token {
  static _is_simple_assignment(val: string) {
    return val === TokenType.simple_assignment;
  }
  static _is_complex_assignment(val: string) {
    return val === TokenType.complex_assignment;
  }

  static _is_an_assignment_operator(val: string) {
    return this._is_simple_assignment(val) || this._is_complex_assignment(val);
  }

  static _is_not_assignment(val: string) {
    return !this._is_an_assignment_operator(val);
  }

  static _is_a_valid_assignment_target(node: any) {
    return node.type === 'Identifier' || node.type === 'MemberExpression';
  }

  static _is_the_keyword_let(tokenType: string) {
    return tokenType === TokenType.keyword_let;
  }

  static _is_a_tilde(tokenType: any) {
    return tokenType === TokenType.tilde;
  }

  static _is_not_the_right_brace(tokenType: any) {
    return !this._is_the_right_brace(tokenType);
  }

  static _is_an_identifier(tokenType: string) {
    return tokenType === TokenType.identifier;
  }

  static _is_a_valid_lefthand_side(node: any) {
    return node.type === 'Identifier';
  }

  static _is_a_number(tokenType: string) {
    return tokenType === TokenType.literal_number;
  }

  static _is_a_string(tokenType: string) {
    return tokenType === TokenType.literal_string;
  }

  static _is_a_boolean(tokenType: string) {
    return (
      tokenType === TokenType.keyword_false ||
      tokenType === TokenType.keyword_true
    );
  }

  static _is_the_value_null(tokenType: string) {
    return tokenType === TokenType.keyword_null;
  }

  static _is_some_literal(tokenType: string) {
    return (
      this._is_a_number(tokenType) ||
      this._is_a_string(tokenType) ||
      this._is_a_boolean(tokenType) ||
      this._is_the_value_null(tokenType)
    );
  }

  static _is_the_semicolon(tokenType: string) {
    return tokenType === TokenType.semicolon;
  }

  static _is_not_the_semicolon(tokenType: string) {
    return !this._is_the_semicolon(tokenType);
  }

  static _is_the_left_brace(tokenType: string) {
    return tokenType === TokenType.left_brace;
  }

  static _is_the_left_parenthesis(tokenType: string) {
    return tokenType === TokenType.left_parenthesis;
  }

  static _is_the_right_brace(tokenType: string) {
    return tokenType === TokenType.right_brace;
  }

  static _is_the_left_bracket(tokenType: string) {
    return tokenType === TokenType.left_bracket;
  }

  static _is_the_right_bracket(tokenType: string) {
    return tokenType === TokenType.right_bracket;
  }

  static _is_a_period(tokenType: string) {
    return tokenType === TokenType.period;
  }

  static _is_the_right_parenthesis(tokenType: string) {
    return tokenType === TokenType.right_parenthesis;
  }

  static _is_not_the_right_parenthesis(tokenType: string) {
    return !this._is_the_right_parenthesis(tokenType);
  }

  static _is_the_keyword_else(tokenType: string) {
    return tokenType === TokenType.keyword_else;
  }

  static _is_a_comma(tokenType: string) {
    return tokenType === TokenType.comma;
  }

  static _is_not_a_separator(tokenType: string) {
    return tokenType !== TokenType.semicolon && tokenType !== TokenType.comma;
  }
}
