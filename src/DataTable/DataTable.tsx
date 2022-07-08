import React from 'react';
import { getMax, getMean, getMedian, getMin, makeId, Maths } from '../utils';
import {
  formatTabularData,
  getBaseData,
  getCumulativeRelativeFrequencyData,
  getFrequencyData,
  getRelativeFrequencyData,
} from './helpers';

export type Tabular = (string | number)[][] | (string | number)[];

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
  data: Tabular;
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
  const _data = getBaseData(formatTabularData(data));

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
    let _dataList = toRender[_toRenderLength].rows.map((d) => d[1]);
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
