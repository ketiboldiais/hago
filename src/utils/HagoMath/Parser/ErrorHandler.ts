export class Tell_the_user {
  static _the_input_was_cut_short(tokenType: string) {
    throw new SyntaxError(`Unexpected end of input. Expected: ${tokenType}`);
  }
  static _I_got_the_wrong_token(actual: string, exp: string) {
    throw new SyntaxError(`Unexpected token: ${actual}|Expected: ${exp}`);
  }
  static BadToken(token: string) {
    throw new SyntaxError(`Unexpected token: ${token}`);
  }
  static _I_dont_recognize_that_literal() {
    throw new SyntaxError(`Literal: Unrecognized literal.`);
  }
  static _the_lefthand_side_is_wrong() {
    throw new SyntaxError(`Bad left-hand side in assignment expression.`);
  }
}
