export enum TokenType {
  semicolon = `;`,
  left_brace = `{`,
  right_brace = `}`,
  left_parenthesis = `(`,
  right_parenthesis = `)`,
  left_bracket = `[`,
  right_bracket = `]`,
  tilde = `~`,
  comma = `,`,
  period = `.`,
  keyword_if = 'if',
  keyword_else = 'else',
  keyword_let = 'let',
  keyword_true = 'true',
  keyword_false = 'false',
  keyword_null = 'null',
  keyword_while = 'while',
  keyword_do = 'do',
  keyword_for = 'for',
  keyword_return = 'return',
  keyword_def = 'def',
  logic_operator_and = 'LOGICAL_AND',
  logic_operator_or = 'LOGICAL_OR',
  logic_operator_xor = 'LOGICAL_XOR',
  logic_operator_not = 'LOGICAL_NOT',
  relation_operator = 'RELATION_OPERATOR',
  equality_operator = 'EQUALITY_OPERATOR',
  literal_number = `DIGIT`,
  literal_string = `STRING`,
  identifier = `IDENTIFIER`,
  simple_assignment = `SIMPLE_ASSIGN`,
  complex_assignment = `COMPLEX_ASSIGN`,
  operator_add = `ADDITIVE_OPERATOR`,
  operator_multiply = `MULTIPLICATIVE_OPERATOR`,
  operator_power = `POWER_OPERATOR`,
}

const special_chars = {
  logic: {
    and: { char: `∧`, reg: /\u{2227}/u },
    or: { char: `∨`, reg: /\u{2228}/u },
    xor: { char: `⊻`, reg: /\u{22bb}/u },
    nand: { char: `⊼`, reg: /\u{22bc}/u },
    nor: { char: `⊽`, reg: /\u{22bd}/u },
  },
  math: {
    sqrt: {char: '√', reg: /\u{221a}/u},
    emptySet: {char: '∅', reg: /\u{2205}/u},
    elementOf: {char: `∈`, reg: /\u{2208}/u},
    notElementOf: {char: `∉`, reg: /\u{2209}/u},
    contains: {char: `∋`, reg: /\u{220b}/u},
    doesNotContain: {char: `∌`, reg: /\u{220c}/u},
    subsetof: {char: `⊂`, reg: /\u{2282}/u},
    notSubsetof: {char: `⊄`, reg: /\u{2284}/u},
    supersetof: {char: `⊃`, reg: /\u{2283}/u},
    notSupersetof: {char: `⊅`, reg: /\u{2285}/u},
    real_division: {char: `÷`, reg: /\u{f7}/u},
    multiplication: {char: `✕`, reg: /\u{2715}/u},
    left_ceiling: {char: `⌈`, reg: /\u{2308}/u},
    right_ceiling: {char: `⌉`, reg: /\u{2309}/u},
    left_floor: {char: `⌊`, reg: /\u{230a}/u},
    right_floor: {char: `⌋`, reg: /\u{230b}/u},
    sum: {char: `∑`, reg: /\u{2211}/u},
    product: {char: `∏`, reg: /\u{220f}/u},
    are_not_equal: {char: `≠`, reg: /\u{2260}/u},
    are_they_equal: {char: `≟`, reg: /\u{225f}/u},
    are_equivalent: {char: `≡`, reg: /\u{2261}/u},
    are_not_equivalent: {char: `≢`, reg: /\u{2262}/u},
    pi: {char: `π`, reg: /\u{3c0}/u},
  }
};

const sym = `π`;
const r = special_chars.math.pi.reg.test(sym);
r;

export const LexemeTable = [
  [/^\s+/, null],
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],
  [/^;/, TokenType.semicolon],
  [/^\{/, TokenType.left_brace],
  [/^\}/, TokenType.right_brace],
  [/^\(/, TokenType.left_parenthesis],
  [/^\)/, TokenType.right_parenthesis],
  [/^,/, TokenType.comma],
  [/^\[/, TokenType.left_bracket],
  [/^\]/, TokenType.right_bracket],
  [/^\~/, TokenType.tilde],
  [/^\./, TokenType.period],
  [/^\blet\b/, TokenType.keyword_let],
  [/^\bif\b/, TokenType.keyword_if],
  [/^\belse\b/, TokenType.keyword_else],
  [/^\btrue\b/, TokenType.keyword_true],
  [/^\bfalse\b/, TokenType.keyword_false],
  [/^\bnull\b/, TokenType.keyword_null],
  [/^\bwhile\b/, TokenType.keyword_while],
  [/^\bdo\b/, TokenType.keyword_do],
  [/^\bfor\b/, TokenType.keyword_for],
  [/^\bdef\b/, TokenType.keyword_def],
  [/^\breturn\b/, TokenType.keyword_return],
  [/^\d+/, TokenType.literal_number],
  [/^[=!]=/, TokenType.equality_operator],
  [/^=/, TokenType.simple_assignment],
  [/^[\*\/\+\-]=/, TokenType.complex_assignment],
  [/^[+\-]/, TokenType.operator_add],
  [/^[*\/%]/, TokenType.operator_multiply],
  [/^[\^]/, TokenType.operator_power],
  [/^[><]=?/, TokenType.relation_operator],
  [/^\bxor\b/, TokenType.logic_operator_xor],
  [/^\band\b/, TokenType.logic_operator_and],
  [/^\bor\b/, TokenType.logic_operator_or],
  [/^\bnot\b/, TokenType.logic_operator_not],
  [/^\w+/, TokenType.identifier],
  [/^"[^"]*"/, TokenType.literal_string],
];