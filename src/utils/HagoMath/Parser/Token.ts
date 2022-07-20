export const token = {
  whitespace: { type: null, regex: /^\s+/ },
  lineComment: { type: null, regex: /^\/\/.*/ },
  blockComment: { type: null, regex: /^\/\*[\s\S]*?\*\// },
  delimiter: {
    semicolon: { type: `;`, regex: /^;/ },
    openBrace: { type: `{`, regex: /^\{/ },
    closeBrace: { type: `}`, regex: /^\}/ },
    openParen: { type: `(`, regex: /^\(/ },
    closeParen: { type: `)`, regex: /^\)/ },
    openBrack: { type: `[`, regex: /^\[/ },
    closeBrack: { type: `]`, regex: /^\]/ },
    dot: { type: `~`, regex: /^\~/ },
    comma: { type: `,`, regex: /^,/ },
    period: { type: `.`, regex: /^\./ },
  },
  keyword: {
    if: { type: 'if', regex: /^\bif\b/ },
    else: { type: 'else', regex: /^\belse\b/ },
    let: { type: 'let', regex: /^\blet\b/ },
    true: { type: 'true', regex: /^\btrue\b/ },
    false: { type: 'false', regex: /^\bfalse\b/ },
    null: { type: 'null', regex: /^\bnull\b/ },
    while: { type: 'while', regex: /^\bwhile\b/ },
    do: { type: 'do', regex: /^\bdo\b/ },
    for: { type: 'for', regex: /^\bfor\b/ },
    return: { type: 'return', regex: /^\breturn\b/ },
    def: { type: 'def', regex: /^\bdef\b/ },
  },
  logic: {
    and: { type: 'LOGICAL_AND', regex: /^\band\b/ },
    or: { type: 'LOGICAL_OR', regex: /^\bor\b/ },
    not: { type: 'LOGICAL_NOT', regex: /^\bnot\b/ },
  },
  relation: { type: 'RELATION_OPERATOR', regex: /^[><]=?/ },
  equality: { type: 'EQUALITY_OPERATOR', regex: /^[=!]=/ },
  literal: {
    number: { type: `DIGIT`, regex: /^\d+/ },
    string: { type: `STRING`, regex: /^"[^"]*"/ },
  },
  identifier: { type: `IDENTIFIER`, regex: /^\w+/ },
  assign: {
    simple: { type: `SIMPLE_ASSIGN`, regex: /^=/ },
    complex: { type: `COMPLEX_ASSIGN`, regex: /^[\*\/\+\-]=/ },
  },
  operator: {
    add: { type: `ADDITIVE_OPERATOR`, regex: /^[+\-]/ },
    mult: { type: `MULTIPLICATIVE_OPERATOR`, regex: /^[*\/%]/ },
    pow: { type: `POWER_OPERATOR`, regex: /^[\^]/ },
  },
};

// prettier-ignore
export const TokenTable = [
[token.whitespace.regex           , token.whitespace.type           ],          
[token.lineComment.regex          , token.lineComment.type          ],         
[token.blockComment.regex         , token.blockComment.type         ],        

[token.delimiter.semicolon.regex  , token.delimiter.semicolon.type  ], 
[token.delimiter.openBrace.regex  , token.delimiter.openBrace.type  ], 
[token.delimiter.closeBrace.regex , token.delimiter.closeBrace.type ],
[token.delimiter.openParen.regex  , token.delimiter.openParen.type  ], 
[token.delimiter.closeParen.regex , token.delimiter.closeParen.type ],
[token.delimiter.comma.regex      , token.delimiter.comma.type      ],
[token.delimiter.openBrack.regex  , token.delimiter.openBrack.type  ],
[token.delimiter.closeBrack.regex , token.delimiter.closeBrack.type ],
[token.delimiter.dot.regex        , token.delimiter.dot.type        ],
[token.delimiter.period.regex     , token.delimiter.period.type     ],

[token.keyword.let.regex          , token.keyword.let.type          ],      
[token.keyword.if.regex           , token.keyword.if.type           ],      
[token.keyword.else.regex         , token.keyword.else.type         ],      
[token.keyword.true.regex         , token.keyword.true.type         ],      
[token.keyword.false.regex        , token.keyword.false.type        ],      
[token.keyword.null.regex         , token.keyword.null.type         ],      
[token.keyword.while.regex        , token.keyword.while.type        ],      
[token.keyword.do.regex           , token.keyword.do.type           ],      
[token.keyword.for.regex          , token.keyword.for.type          ],      
[token.keyword.def.regex          , token.keyword.def.type          ],      
[token.keyword.return.regex       , token.keyword.return.type       ],      

[token.literal.number.regex       , token.literal.number.type       ],      

   

[token.equality.regex             , token.equality.type             ],      

[token.assign.simple.regex        , token.assign.simple.type        ],        
[token.assign.complex.regex       , token.assign.complex.type       ],        

[token.operator.add.regex         , token.operator.add.type         ],        
[token.operator.mult.regex        , token.operator.mult.type        ],       
[token.operator.pow.regex         , token.operator.pow.type         ],       
[token.relation.regex             , token.relation.type             ],       

[token.logic.and.regex            , token.logic.and.type            ],       
[token.logic.or.regex             , token.logic.or.type             ],       
[token.logic.not.regex            , token.logic.not.type            ],    

[token.identifier.regex           , token.identifier.type           ],     

[token.literal.string.regex       , token.literal.string.type       ],      
];
