import React from 'react';
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

type EquationData = string[];
type MatrixData = (string | number)[][];
type MatrixRenderType =
  | 'matrix'
  | 'array'
  | 'pmatrix'
  | 'bmatrix'
  | 'vmatrix'
  | 'Vmatrix'
  | 'Bmatrix';

interface MathFigProps {
  eq?: EquationData;
  m?: MatrixData;
  align?: string;
  mtype?: MatrixRenderType;
  linespace?: number;
}

export function MathFig({
  eq = ['a + b = c', 'b = c - a'],
  m = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ],
  align = '=',
  mtype = 'bmatrix',
  linespace,
}: MathFigProps) {
  let text: string;
  let spacing = linespace ? linespace : eq ? 1 : 0.5;

  const lineBreak = `[${spacing}em]`;

  if (eq) {
    text = BuildEquation(eq, lineBreak, align);
  } else if (m) {
    text = BuildMatrixData(m, mtype, lineBreak);
  }

  return <TeX math={text} block />;
}

function BuildEquation(
  data: string[],
  linespace: string,
  align: string
): string {
  let output = `\\begin{aligned}\n`;

  const lineCount = data.length;

  if (align) {
    const alignChar = new RegExp(align);
    for (let i = 0; i < lineCount; i++) {
      const match = alignChar.exec(data[i]);
      if (match) {
        const index = match.index - 1;
        data[i] = insertAt(data[i], index, '&');
      }
    }
  } else {
    for (let i = 0; i < lineCount; i++) {
      data[i] = insertAt(data[i], 0, '&');
    }
  }

  for (let i = 0; i < lineCount; i++) {
    let current = data[i];
    output += current;
    output += ` \\\\${linespace} \n`;
  }

  output += `\\end{aligned}`;

  return output;
}

function BuildMatrixData(
  data: MatrixData,
  type: MatrixRenderType,
  linespace: string
): string {
  const btype = type === 'array' ? `{${type}}{cc}` : `{${type}}`;

  let output = `\\begin${btype}`;

  const rowCount = data.length;
  const colCount = data[0].length;

  for (let i = 0; i < rowCount; i++) {
    output += `${data[i][0]}&`;
    for (let j = 1; j < colCount; j++) {
      let el = data[i][j];
      colCount % j === 0 ? (output += `${el} &`) : (output += `${el}`);
    }
    i !== rowCount - 1 ? (output += ` \\\\${linespace} \n`) : (output += '');
  }
  output += `\\end{${type}}`;
  return output;
}

function insertAt(str: string, index: number, val: string): string {
  return str.substring(0, index) + val + str.substring(index);
}
