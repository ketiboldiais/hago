import React from 'react';
import {
  getMax,
  getMean,
  getMedian,
  getMin,
  IsAnArray,
  makeId,
  Maths,
  StructGuard,
} from '../utils';
import {
  formatTabularData,
  getBaseData,
  getCumulativeRelativeFrequencyData,
  getFrequencyData,
  getRelativeFrequencyData,
} from './helpers';

export type Tabular = (string | number)[][] | (string | number)[];
export type FunctionTest = {
  f: Function[];
  step?: number;
  fLabels?: string[];
  inputLabel?: string[];
  domain?: [number, number];
};
const IsFunctionTest = StructGuard((d: any) => d as FunctionTest, ['f']);

function GenerateFunctionData(data: FunctionTest) {
  const functions = data.f;

  if (IsAnArray(functions)) {
    const step = data.step ? data.step : 1;
    const functionCount = functions.length;

    let labels = [];

    let result = [];

    if (data.inputLabel) {
      const inputLabels = data.inputLabel;
      const inputLabelCount = inputLabels.length;
      for (let i = 0; i < inputLabelCount; i++) {
        labels.push(inputLabels[i]);
      }
    } else {
      labels.push('x');
    }

    if (data.fLabels) {
      const fLabels = data.fLabels;
      const labelCount = fLabels.length;
      for (let i = 0; i < labelCount; i++) {
        labels.push(fLabels[i]);
      }
    } else {
      for (let i = 0; i < functionCount; i++) {
        let label = `function ${i}`;
        labels.push(label);
      }
    }

    result.push(labels);

    const domain =
      data.domain && data.domain.length === 2 ? data.domain : [-10, 10];
    const domainStart = domain[0];
    const domainEnd = domain[1];

    for (let i = domainStart; i < domainEnd; i += step) {
      result.push([i]);
    }

    const resLength = result.length;

    for (let i = 1; i < resLength; i++) {
      for (let j = 0; j < functionCount; j++) {
        let f = functions[j];
        let x = result[i][0];
        let y = f(x);
        result[i].push(y);
      }
    }
    return result;
  } else {
    throw new Error('Expected an array of functions.');
  }
}

export type AnalysisType =
  | 'raw'
  | 'min'
  | 'max'
  | 'median'
  | 'sum'
  | 'mean'
  | 'frequency'
  | 'relative frequency'
  | 'cumulative relative frequency';
export type PlotType = 'table' | 'scatter' | 'histogram';
export type OutputType = (AnalysisType | [AnalysisType, string])[];

export interface DataTableProps {
  data: Tabular | FunctionTest;
  className?: string;
  id: string;
  latex?: boolean;
  output?: OutputType;
  include?: AnalysisType[];
}

export function DataTable({
  data = [
    ['x', 'y'],
    ['A', 5],
    ['B', 6],
    ['C', 3],
    ['D', 3],
    ['E', 2],
    ['F', 4],
    ['G', 7],
    ['H', 5],
  ],
  className = 'hago_table',
  id = makeId(className),
  latex = false,
  output = ['raw'],
  include,
}: DataTableProps) {
  const textElement = latex
    ? (d: any) => <Maths val={d} block={false} />
    : (d: any) => d;

  let _data: any;
  if (IsFunctionTest(data)) {
    let n = GenerateFunctionData(data as FunctionTest);
    _data = getBaseData(n as Tabular);
  } else {
    _data = getBaseData(formatTabularData(data as Tabular));
  }

  let toRender = [];
  for (let i = 0; i < output.length; i++) {
    let dataset: any;
    let current = output[i];
    if (Array.isArray(current)) {
      if (current.length === 2) {
        let analysis_type = current[0];
        let key = current[1];
        switch (analysis_type) {
          case 'frequency':
            dataset = getFrequencyData(_data, key);
            break;
          case 'relative frequency':
            dataset = getRelativeFrequencyData(_data, key);
            break;
          case 'cumulative relative frequency':
            dataset = getCumulativeRelativeFrequencyData(_data, key);
            break;
        }
      }
    } else {
      dataset = _data;
    }
    toRender.push(dataset);
  }
  if (include) {
    const _toRenderLength = toRender.length - 1;
    let _dataList = toRender[_toRenderLength].rows.map((d: any) => d[1]);
    let _datum: [string, number];
    for (let i = 0; i < include.length; i++) {
      let current = include[i];
      if (current === 'mean') {
        const _mean = getMean(_dataList);
        _datum = ['Mean', _mean];
        toRender[_toRenderLength].rows.push(_datum);
      } else if (current === 'max') {
        const _max = getMax(_dataList).max;
        _datum = ['Max', _max];
        toRender[_toRenderLength].rows.push(_datum);
      } else if (current === 'min') {
        const _min = getMin(_dataList).min;
        _datum = ['Min', _min];
        toRender[_toRenderLength].rows.push(_datum);
      } else if (current === 'median') {
        const _median = getMedian(_dataList).median;
        _datum = ['Median', _median];
        toRender[_toRenderLength].rows.push(_datum);
      }
    }
  }

  return toRender.map((d, i) => {
    let _headers = d.headings;
    let _rows = d.rows;
    return BuildTable(className, _headers, id, textElement, _rows, i);
  });
}

function BuildTable(
  className: string,
  _headers: (string | number)[],
  id: string,
  textElement: (d: any) => any,
  _rows: (string | number)[][],
  idx: number
) {
  return (
    <div className={className} key={`ht${idx}${id}`}>
      <table>
        {BuildHeader(_headers, id, textElement)}
        {BuildBody(_rows, id, textElement)}
      </table>
    </div>
  );
}

function BuildHeader(
  _headers: (string | number)[],
  id: string,
  textBuilder: Function
) {
  return <thead>{BuildHeaderRows(_headers, id, textBuilder)}</thead>;
}

function BuildBody(
  _rows: (string | number)[][],
  id: string,
  textBuilder: Function
) {
  return (
    <tbody>{_rows.map((d, i) => BuildBodyRows(id, i, d, textBuilder))}</tbody>
  );
}

function BuildBodyRows(
  id: string,
  i: number,
  d: (string | number)[],
  textBuilder: Function
): JSX.Element {
  return (
    <tr key={`tr_${id}_${i}`} className={`hago_row_${d[0]}`}>
      {d.map((e, j) => BuildBodyCell(id, j, e, textBuilder))}
    </tr>
  );
}

function BuildBodyCell(
  id: string,
  j: number,
  e: string | number,
  textBuilder: Function
): JSX.Element {
  return <td key={`td_${id}_${j}`}>{textBuilder(e)}</td>;
}

function BuildHeaderRows(
  _headers: (string | number)[],
  id: string,
  textBuilder: Function
) {
  return (
    <tr>{_headers.map((d, i) => BuildHeaderCell(id, i, d, textBuilder))}</tr>
  );
}
function BuildHeaderCell(
  id: string,
  i: number,
  d: string | number,
  textBuilder: Function
): JSX.Element {
  return <th key={`th_${id}_${i}`}>{textBuilder(d)}</th>;
}
