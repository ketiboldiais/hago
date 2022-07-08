import { scaleBand } from 'd3-scale';
import React from 'react';
import {
  BaseProps,
  Board,
  Cell,
  makeId,
  StructGuard,
  svg,
  Translate,
} from '../utils';

type PriorityQueueDatum = {
  val: string | number;
  p: string | number;
  order?: number;
};

export const IsPriorityQueueDatum = StructGuard(
  (val: any) => val as PriorityQueueDatum,
  ['val', 'p']
);

export type PriorityQueueData = (string[] | number[])[] | PriorityQueueDatum[];

export interface PriorityQueueProps extends BaseProps {
  data: PriorityQueueData;
}

export function BuildPriorityQueueData(data: PriorityQueueData) {
  let priorities = {};
  if (!Array.isArray(data)) {
    throw new Error('Improper data format.');
  } else {
    let output: PriorityQueueDatum[] = [];
    const datumCount = data.length;
    for (let i = 0; i < datumCount; i++) {
      let current = data[i];
      let pq = current as PriorityQueueDatum;
      if (IsPriorityQueueDatum(current)) {
        !(`${pq.p}` in priorities) && (priorities[`${pq.p}`] = {});
        pq.order = pq.order ? pq.order : i;
        output.push(pq);
      } else {
        let currentPriorityLength = (current as number[] | string[]).length;
        !(`${i}` in priorities) && (priorities[`${i}`] = {});
        for (let j = 0; j < currentPriorityLength; j++) {
          let currentElement = current[j];
          let datum: PriorityQueueDatum = {
            val: currentElement,
            p: i,
            order: j,
          };
          output.push(datum);
        }
      }
    }
    return { output, priorities: Object.keys(priorities) };
  }
}

export function PriorityQueue({
  data = [
    [1, 2, 3, 8, 2],
    [7, 5, 0, 1],
    [2, 9, 1, 7],
    [1, 9, 8, 0, 3, 5, 6, 8, 9],
  ],
  className = 'hago_PriorityQueue',
  id = makeId(className),
  fontSize = 0.6,
  width = 400,
  height = 400,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginRight = 50,
  marginBottom = 20,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PriorityQueueProps) {
  const _svg = svg(width, height, margins);
  const _formattedData = BuildPriorityQueueData(data);
  const _data = _formattedData.output;
  const _priorities = _formattedData.priorities;
  console.log(_formattedData);
  const _xScale = scaleBand()
    .domain(_data.map((d) => `${d.order}`))
    .range([0, _svg.width])
    .paddingInner(0.1);
  const _yScale = scaleBand()
    .domain(_data.map((d) => `${d.p}`))
    .range([0, _svg.width / 4])
    .paddingInner(0.2);
  const _rwidth = _xScale.bandwidth();
  const _rheight = _yScale.bandwidth();
  const _dataFieldTranslate = Translate(_rwidth / 2, _rheight / 1.5);
  const priorityCircleRadius = _rwidth / 4;
  const priorityCircleOffset = -margins[3] / 4;
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      {_priorities.map((d, i) => {
        return (
          <g
            key={`pqp${id}_${i}`}
            transform={Translate(
              priorityCircleOffset,
              _yScale(d) + _rheight / 2
            )}
          >
            <circle fill="none" stroke="black" r={priorityCircleRadius} />
            <text
              fontSize={`${fontSize}rem`}
              textAnchor="middle"
              dy={priorityCircleRadius / 2}
            >
              {d}
            </text>
          </g>
        );
      })}
      {_data.map((d, i) => {
        return (
          <g
            key={`pqd${id}_${i}`}
            transform={Translate(_xScale(`${d.order}`), _yScale(`${d.p}`))}
          >
            <Cell w={_rwidth} h={_rheight} />
            <g className={`data_field`} transform={_dataFieldTranslate}>
              <text fontSize={`${fontSize}rem`} textAnchor="middle">
                {d.val}
              </text>
            </g>
          </g>
        );
      })}
    </Board>
  );
}
