type CharNum = string | number;

const Transpose = (matrix: CharNum[][]) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];
  for (let j = 0; j < cols; j++) {
    transposed[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
};

const MultiplyMTX = (matrix1: CharNum[][], matrix2: CharNum[][]) => {
	const rows_1 = matrix1.length;
	const cols_1 = matrix1[0].length;
	const rows_2 = matrix2.length;
	const cols_2 = matrix2[0].length;
	
	if (rows_1 === rows_2 && cols_1 === cols_2) {

	} else {
		throw new Error("Jagged matrices not allowed.");
	}
}

const arr1 = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12]
];

const _test = Transpose(arr1);
_test
