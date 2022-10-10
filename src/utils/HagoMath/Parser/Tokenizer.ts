import { IsNull } from '../../TypeChecks';
import { LexemeTable } from './Lexemes';

export class Tokenizer {
  tokens: string;
  cursor: number;
  tally: number;
  tokenIndex: any[];
  init(tokenStream: string) {
    this.tokens = tokenStream;
    this.tally = this.tokens.length;
    this.cursor = 0;
    this.tokenIndex = LexemeTable;
  }

  getNextToken() {
    if (!this.tokensExist()) return null;

    const lexeme = this.tokens.slice(this.cursor);

    for (const [regexp, tokenType] of this.tokenIndex) {
      const tokenValue = this.match(regexp, lexeme);

      if (IsNull(tokenValue)) continue;

      if (IsNull(tokenType)) return this.getNextToken();

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: "${lexeme[0]}"`);
  }
  isEOF() {
    return this.cursor === this.tally;
  }
  match(regexp: RegExp, rawString: string) {
    const matched = regexp.exec(rawString);
    if (matched === null) {
      return null;
    }
    this.cursor += matched[0].length;
    return matched[0];
  }

  tokensExist() {
    return this.cursor < this.tally;
  }
}
