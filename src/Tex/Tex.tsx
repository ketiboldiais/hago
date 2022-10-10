import React, { ReactElement } from 'react';
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

export type LiteralMatrix = (string | number)[][];
export interface TexMatrixProps {
  data: LiteralMatrix;
  linespace?: number;
  name?: string;
  children?: ReactElement[];
}

function BuildMatrixData(
  data: LiteralMatrix | number,
  linespace: number | string,
  type: string,
  name?: string
): string {
  if (typeof data === 'number') {
    return `${data}`;
  }
  if (data === null) {
    return `{\\text{DNE}}`;
  }
  if ((data as LiteralMatrix).length === 1 && data[0].length === 1) {
    return `~~${data[0][0]}~~`;
  }
  let output = name ? (name += `= \\begin{${type}}`) : `\\begin{${type}}`;

  linespace = `${linespace}em`;

  const rowCount = (data as LiteralMatrix).length;
  const colCount = data[0].length;

  for (let i = 0; i < rowCount; i++) {
    output += `${data[i][0]}`;
    for (let j = 1; j < colCount; j++) {
      let el = data[i][j];
      if (el === Infinity || el === -Infinity) {
        el = `\\text{undefined}`;
      }
      j % 2 !== 0
        ? j !== colCount - 1
          ? (output += `& ${el} &`)
          : (output += `& ${el}`)
        : (output += `${el}`);
    }
    i !== rowCount - 1 ? (output += ` \\\\[${linespace}]`) : (output += '');
  }
  output += `\\end{${type}}`;
  return output;
}

function getChildren(d: ReactElement[]) {
  return React.Children.toArray(d);
}

class Matrix {
  protected _matrix: number[][];
  constructor(input: number[][]) {
    this._matrix = input;
  }

  matrix() {
    return this._matrix;
  }

  rowCount() {
    return this._matrix.length;
  }

  isSquare() {
    return this.colCount() === this.rowCount();
  }

  colCount() {
    const colcount = this.matrix()[0].length;
    const rowCount = this.rowCount();
    for (let i = 0; i < rowCount; i++) {
      const matrixRow_length = this._matrix[i].length;
      if (matrixRow_length !== colcount) {
        return -1;
      }
    }
    return colcount;
  }

  private op(M: Matrix, operation: Function) {
    const matrix_a = this.matrix();
    const matrix_b = M._matrix;
    const output: number[][] = [];

    const matrix_a_row_count = this.rowCount();
    const matrix_b_row_count = M.rowCount();

    for (let i = 0; i < matrix_a_row_count; i++) {
      const row: number[] = [];
      for (let j = 0; j < matrix_b_row_count; j++) {
        const result = operation(matrix_a[i][j], matrix_b[i][j]);
        row.push(result);
      }
      output.push(row);
    }
    return new Matrix(output);
  }

  similar(M1: Matrix, M2: Matrix) {
    const M1_Rows = M1.rowCount();
    const M2_Rows = M2.rowCount();
    const M1_Cols = M1.colCount();
    const M2_Cols = M2.colCount();
    return M1_Rows === M2_Rows && M1_Cols === M2_Cols;
  }

  verify_same_order(M1: Matrix, M2: Matrix) {
    const matrix_a_row_count = M1.rowCount();
    const matrix_b_row_count = M2.rowCount();
    const matrix_a_col_count = M1.colCount();
    const matrix_b_col_count = M2.colCount();
    if (matrix_a_col_count === -1 || matrix_b_col_count === -1) {
      throw new Error(
        'LogicError: Matrix operands are not of the same order. Jagged matrix passed.'
      );
    } else if (matrix_a_row_count !== matrix_b_row_count) {
      throw new Error(
        'LogicError: Matrix operands are not of the same order. Unequal columns.'
      );
    }
  }

  verify_dot_productability(M1: Matrix, M2: Matrix) {
    const matrix_a_col_count = M1.colCount();
    const matrix_b_row_count = M2.rowCount();
    const matrix_b_col_count = M2.rowCount();
    const cond1 = matrix_a_col_count === matrix_b_row_count;
    const cond2 = matrix_b_col_count === 1 && matrix_b_row_count === 1;
    const cond3 = this.similar(M1, M2);
    if (!(cond1 || cond2 || cond3)) {
      throw new Error('LogicError: Invalid operands.');
    }
  }

  verify_productability(M1: Matrix, M2: Matrix) {
    const matrix_b_row_count = M2.rowCount();
    const matrix_a_col_count = M1.colCount();
    const matrix_b_col_count = M2.colCount();
    if (matrix_a_col_count === -1 || matrix_b_col_count === -1) {
      throw new Error(
        'LogicError: Matrix operands are not of the same order. Jagged matrix passed.'
      );
    } else if (matrix_a_col_count !== matrix_b_row_count) {
      throw new Error(
        'LogicError: First matrix column count not equal to second matrix row count.'
      );
    }
  }

  add(M: Matrix) {
    this.verify_same_order(this, M);
    return this.op(M, (a: number, b: number) => a + b);
  }

  sub(M: Matrix) {
    this.verify_same_order(this, M);
    return this.op(M, (a: number, b: number) => a - b);
  }

  divide(M: Matrix) {
    return this.op(M, (a: number, b: number) => a / b);
  }

  isConstant(M: Matrix) {
    return M.colCount() === M.rowCount();
  }

  constantOp(constant_operation: Function) {
    const matrix_a_col_count = this.colCount();
    const matrix_a_row_count = this.rowCount();
    let result = this.matrix();

    for (let i = 0; i < matrix_a_row_count; i++) {
      for (let j = 0; j < matrix_a_col_count; j++) {
        result[i][j] = constant_operation(this._matrix[i][j]);
      }
    }
    return new Matrix(result);
  }

  vectorOp(M1: Matrix, M2: Matrix, vector_operation: Function) {
    const matrix_a_col_count = M1.colCount();
    const matrix_b_row_count = M2.rowCount();
    let result = M1.matrix();
    let m2 = M2.matrix();

    for (let i = 0; i < matrix_b_row_count; i++) {
      let C = m2[i][0];
      for (let j = 0; j < matrix_a_col_count; j++) {
        result[i][j] = vector_operation(result[i][j], C);
      }
    }

    return new Matrix(result);
  }

  dotProduct(M: Matrix) {
    this.verify_dot_productability(this, M);
    if (this.similar(this, M))
      return this.op(M, (a: number, b: number) => a * b);
    else if (this.isConstant(M)) {
      const C = M.matrix()[0][0];
      return this.constantOp((n: number) => n * C);
    } else {
      return this.vectorOp(this, M, (n: number, m: number) => n * m);
    }
  }

  modulo(M: Matrix) {
    return this.op(M, (a: number, b: number) => a % b);
  }

  matrixProduct(M: Matrix) {
    this.verify_productability(this, M);
    const A = this.matrix();
    const B = M.matrix();
    const A_rows = this.rowCount();
    const A_cols = this.colCount();
    const B_cols = M.colCount();

    const result: number[][] = [];

    for (let i = 0; i < A_rows; ++i) {
      let row = [];
      for (let j = 0; j < B_cols; ++j) {
        row.push(0);
      }
      result.push(row);
    }

    for (let i = 0; i < A_rows; ++i) {
      for (let j = 0; j < B_cols; ++j) {
        for (let k = 0; k < A_cols; ++k) {
          result[i][j] = result[i][j] + A[i][j] * B[k][j];
        }
      }
    }
    return new Matrix(result);
  }

  power(M: Matrix) {
    return this.op(M, (a: number, b: number) => a ** b);
  }

  matrixMinor(row = 0, col = 0) {
    if (!this.isSquare()) {
      throw new Error(
        'LogicError: Matrix minors are only defined for square matrices.'
      );
    }
    if (row > this.rowCount() || row <= 0) {
      throw new Error('ArgumentError: Invalid row index.');
    }
    if (col > this.colCount() || col <= 0) {
      throw new Error('ArgumentError: Invalid column index.');
    }
    let result: number[][] = [];
    const rows = this.rowCount();
    const cols = this.colCount();
    for (let i = 0; i < rows; i++) {
      if (i === row - 1) continue;
      let _row = [];
      for (let j = 0; j < cols; j++) {
        if (j === col - 1) continue;
        _row.push(this._matrix[i][j]);
      }
      result.push(_row);
    }
    return new Matrix(result);
  }

  cofactor() {
    let determinant = 0;
    const rows = this.rowCount();
    for (let r = 0; r < rows; r++) {
      const a = (-1) ** r;
      const b = this._matrix[0][r];
      const c = a * b;
      const _matrixMinor = this.matrixMinor(1, r + 1);
      const _minor_determinant = _matrixMinor.determinant();
      determinant += c * _minor_determinant;
    }
    return determinant;
  }

  determinant() {
    const m = this._matrix;
    const rows = this.rowCount();
    const cols = this.colCount();
    if (rows === 2 && cols === 2) {
      const p1 = m[0][0] * m[1][1];
      const p2 = m[0][1] * m[1][0];
      return p1 - p2;
    }
    return this.cofactor();
  }

  comatrix() {
    if (!this.isSquare())
      throw new Error(
        'LogicError: Comatrices are not defined for non-square matrices.'
      );
    let cofactors = [];
    const rows = this.rowCount();
    const cols = this.colCount();
    if (rows === 2 && cols === 2) {
      const cofactor = this.determinant();
      cofactors.push([cofactor]);
      return new Matrix(cofactors);
    }
    for (let r = 0; r < rows; r++) {
      let cofactor_row = [];
      for (let c = 0; c < rows; c++) {
        let minor = this.matrixMinor(r + 1, c + 1);
        const n = (-1) ** (r + c);
        const d = n * minor.determinant();
        cofactor_row.push(d);
      }
      cofactors.push(cofactor_row);
    }
    return new Matrix(cofactors);
  }

  adjugate() {
    return this.comatrix().transpose();
  }

  inverse() {
    if (!this.isSquare())
      throw new Error(
        'LogicError: Inverses are not defined for non-square matrices.'
      );
    const determinant = this.determinant();

    if (determinant === 0) {
      return null;
    }

    const rows = this.rowCount();
    const cols = this.colCount();
    if (rows === 2 && cols === 2) {
      const a = this._matrix[1][1] / determinant;
      const b = (-1 * this._matrix[0][1]) / determinant;
      const c = (-1 * this._matrix[1][0]) / determinant;
      const d = this._matrix[0][0] / determinant;
      return new Matrix([
        [a, b],
        [c, d],
      ]);
    }
    let cofactors = [];
    const co_factor_matrix = this.adjugate();
    const cofactor_rows = co_factor_matrix.rowCount();
    for (let r = 0; r < cofactor_rows; r++) {
      for (let c = 0; c < cofactor_rows; c++) {
        cofactors[r][c] = cofactors[r][c] / determinant;
      }
    }
    return new Matrix(cofactors);
  }

  transpose() {
    const N = this.rowCount();
    const M = this.colCount();
    const matrix = this._matrix;
    let transposeMatrix = [];
    for (let i = 0; i < M; i++) {
      let r = [];
      for (let j = 0; j < N; j++) {
        const el = matrix[j][i];
        r.push(el);
      }
      transposeMatrix.push(r);
    }
    return new Matrix(transposeMatrix);
  }
}

function getReactElementName(element: ReactElement) {
  return element.props.originalType.displayName;
}

function MatrixOperation(
  children,
  operation: string,
  unary?: `left` | `right`,
  row?: number,
  col?: number
) {
  const MatrixOp = {
    add: { type: 'add', symbol: '+' },
    sub: { type: 'sub', symbol: '-' },
    divide: { type: 'divide', symbol: '\\div' },
    dotProduct: { type: 'dotProduct', symbol: '{\\Large\\cdot}' },
    matrixProduct: { type: 'matrixProduct', symbol: '\\times' },
    modulo: { type: 'modulo', symbol: '\\text{rem}' },
    power: { type: 'power', symbol: '*' },
    transpose: { type: 'transpose', symbol: '^{\\text{T}}' },
    matrixMinor: { type: 'matrixMinor', symbol: '_{\\text{Minor}}' },
    determinant: { type: 'determinant', symbol: '' },
    inverse: { type: 'inverse', symbol: '^{-1}' },
    comatrix: { type: 'comatrix', symbol: '^{\\text{C}}' },
    adjugate: { type: 'adjugate', symbol: '^{\\text{A}}' },
  };
  let resultOperand = '=';
  const op = MatrixOp[operation];
  const matrixChildren = getChildren(children);
  const matrixCount = matrixChildren.length;
  const firstChild = matrixChildren[0];
  let MatrixType:
    | 'Pmatrix'
    | 'BoxMatrix'
    | 'Determinant'
    | 'Norm'
    | 'BracedMatrix' = getReactElementName(firstChild as ReactElement);
  let result: Matrix;
  let matrices: number[][][] = [];
  let symbol = op.symbol;

  if ((matrixChildren[0] as ReactElement).props.data) {
    let datum = (matrixChildren[0] as ReactElement).props.data;
    matrices.push(datum);
    result = new Matrix(datum);
  }

  if (matrixCount === 1) {
    if (op.type === 'matrixMinor') {
      result = result[op.type](row, col);
      symbol = `{\\large M_{${row},${col}}}`;
    } else {
      result = result[op.type]();
    }
    if (op.type === `determinant`) {
      MatrixType = `Determinant`;
    }
  } else {
    for (let i = 1; i < matrixCount; i++) {
      if ((matrixChildren[i] as ReactElement).props.data) {
        let datum = (matrixChildren[i] as ReactElement).props.data;
        matrices.push(datum);

        const childMatrix = new Matrix(datum);
        result = result[op.type](childMatrix);
      }
    }
  }
  const output =
    typeof result === 'number' || result === null
      ? (result as any)
      : result.matrix();
  if (result === null) {
    resultOperand = '\\implies';
  }

  const texString = BuildOpString(
    matrices,
    MatrixElement[MatrixType],
    symbol,
    output,
    unary,
    resultOperand
  );

  return <TeX math={texString} block />;
}

export function MatrixSum({ children }) {
  return MatrixOperation(children, 'add');
}
export function MatrixDifference({ children }) {
  return MatrixOperation(children, 'sub');
}
export function MatrixQuotient({ children }) {
  return MatrixOperation(children, 'divide');
}
export function DotProduct({ children }) {
  return MatrixOperation(children, 'dotProduct');
}
export function MatrixProduct({ children }) {
  return MatrixOperation(children, 'matrixProduct');
}
export function MatrixModulo({ children }) {
  return MatrixOperation(children, 'modulo');
}
export function MatrixPower({ children }) {
  return MatrixOperation(children, 'power');
}
export function Transpose({ children }) {
  return MatrixOperation(children, 'transpose', `right`);
}
export function MatrixMinor({ children, row, col }) {
  return MatrixOperation(children, 'matrixMinor', `left`, row, col);
}
export function Adjugate({ children }) {
  return MatrixOperation(children, 'adjugate', `right`);
}
export function Inverse({ children }) {
  return MatrixOperation(children, 'inverse', `right`);
}
export function Comatrix({ children }) {
  return MatrixOperation(children, 'comatrix', `right`);
}

const MatrixElement = {
  Pmatrix: 'pmatrix',
  BoxMatrix: 'bmatrix',
  Determinant: 'vmatrix',
  Norm: 'Vmatrix',
  BracedMatrix: 'Bmatrix',
};

function BuildOpString(
  matrices: number[][][],
  matrixType: string,
  operand: string,
  result: number[][] | number | null,
  unary?: `left` | `right`,
  resultOperand = '='
) {
  let output = '';
  const matrixCount = matrices.length;

  if (unary === `left`) {
    let matrix = matrices[0];
    const str = BuildMatrixData(matrix, 0.1, matrixType);
    output = operand + str;
  } else if (unary === `right`) {
    let matrix = matrices[0];
    const str = BuildMatrixData(matrix, 0.1, matrixType);
    output = str + operand;
  } else {
    for (let i = 0; i < matrixCount; i++) {
      let matrix = matrices[i];
      const str = BuildMatrixData(matrix, 0.1, matrixType);
      output += i % matrixCount !== 0 ? operand + str : str;
    }
  }
  output += resultOperand;
  const _result = BuildMatrixData(result, 0.1, matrixType);
  output += _result;
  return output;
}

export function Pmatrix({
  data = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 10],
  ],
  linespace = 0.3,
  name,
}: TexMatrixProps) {
  const out = BuildMatrixData(data, linespace, `pmatrix`, name);
  return <TeX math={out} block />;
}

export function BoxMatrix({
  data = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 10],
  ],
  linespace = 0.3,
  name,
}: TexMatrixProps) {
  const out = BuildMatrixData(data, linespace, `bmatrix`, name);
  return <TeX math={out} block />;
}

export function Determinant({
  data = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 10],
  ],
  linespace = 0.3,
  name,
  children,
}: TexMatrixProps) {
  if (children) {
    return MatrixOperation(children, `determinant`);
  }
  const out = BuildMatrixData(data, linespace, `vmatrix`, name);
  return <TeX math={out} block />;
}

export function Norm({
  data = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 10],
  ],
  linespace = 0.3,
  name,
}: TexMatrixProps) {
  const out = BuildMatrixData(data, linespace, `Vmatrix`, name);
  return <TeX math={out} block />;
}

export function BracedMatrix({
  data = [
    [1, 2, 3],
    [4, 5, 6],
    [8, 9, 10],
  ],
  linespace = 0.3,
  name,
}: TexMatrixProps) {
  const out = BuildMatrixData(data, linespace, `Bmatrix`, name);
  return <TeX math={out} block />;
}
// type EquationData = string[];
// type LiteralMatrix = (string | number)[][];
// type MatrixRenderType =
//   | 'matrix'
//   | 'array'
//   | 'pmatrix'
//   | 'bmatrix'
//   | 'vmatrix'
//   | 'Vmatrix'
//   | 'Bmatrix';

// interface MathsProps {
//   eq?: EquationData;
//   m?: LiteralMatrix;
//   align?: string;
//   mtype?: MatrixRenderType;
//   linespace?: number;
// }

// export function Maths({
//   eq,
//   m,
//   align = '=',
//   mtype = 'bmatrix',
//   linespace,
// }: MathsProps) {
//   let text: string;
//   let spacing = linespace ? linespace : eq ? 1 : 0.5;

//   const lineBreak = `[${spacing}em]`;

//   if (eq) {
//     text = BuildEquation(eq, lineBreak, align);
//   } else if (m) {
//     text = BuildMatrixData(m, mtype, lineBreak);
//   } else {
//     return;
//   }

//   return <TeX math={text} block />;
// }

// function BuildEquation(
//   data: string[],
//   linespace: string,
//   align: string
// ): string {
//   let output = `\\begin{aligned}\n`;

//   const lineCount = data.length;

//   if (align) {
//     const alignChar = new RegExp(align);
//     for (let i = 0; i < lineCount; i++) {
//       const match = alignChar.exec(data[i]);
//       if (match) {
//         const index = match.index - 1;
//         data[i] = insertAt(data[i], index, '&');
//       }
//     }
//   } else {
//     for (let i = 0; i < lineCount; i++) {
//       data[i] = insertAt(data[i], 0, '&');
//     }
//   }

//   for (let i = 0; i < lineCount; i++) {
//     let current = data[i];
//     output += current;
//     output += ` \\\\${linespace} \n`;
//   }

//   output += `\\end{aligned}`;

//   return output;
// }


