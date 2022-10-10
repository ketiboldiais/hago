class Matrix {
  protected _matrix: number[][];
  constructor(input: number[][]) {
    this._matrix = input;
  }
  matrix() {
    return this._matrix;
  }
  add(M: Matrix) {
    const matrix_a = this.matrix();
    const matrix_b = M._matrix;
    const output: number[][] = [];
    for (let i = 0; i < matrix_a.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < matrix_a[i].length; j++) {
        const result = matrix_a[i][j] + matrix_b[i][j];
        row.push(result);
      }
      output.push(row);
    }
		return output;
  }
  sub(M: Matrix) {
    const matrix_a = this.matrix();
    const matrix_b = M._matrix;
    const output: number[][] = [];
    for (let i = 0; i < matrix_a.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < matrix_a[i].length; j++) {
        const result = matrix_a[i][j] - matrix_b[i][j];
        row.push(result);
      }
      output.push(row);
    }
		return output;
  }
}

const m1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const m2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

const m3 = m1.sub(m2);
m3
