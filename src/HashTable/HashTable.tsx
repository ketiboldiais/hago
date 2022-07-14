import { scaleLinear, scaleBand } from 'd3';
import React from 'react';
import {
  Board,
  svg,
  Datum,
  makeId,
  ReturnLarger,
  Translate,
  Line,
  ArrowHead,
  Marker,
} from '../utils';
import { HashTableProps, HashData, HashDatum } from '../utils';

function BuildHashData(data: HashData) {
  let datum: Datum;
  let groups: { x: number; y: number }[] = [];
  let xMax = 0;
  let outputData: Datum[] = [];
  for (let i = 0; i < data.length; i++) {
    let current = data[i] as HashDatum;
    xMax = ReturnLarger(xMax, current.length);
    groups.push({ x: 0, y: i });
    if (current.length === 0) {
      datum = { val: '', group: i };
      outputData.push(datum);
    }
    for (let j = 0; j < current.length; j++) {
      datum = { val: data[i][j], group: i as number, id: j };
      outputData.push(datum);
    }
  }
  return {
    keys: groups,
    values: outputData,
    xMax,
  };
}

export function HashTable({
  data = [
    ['val1'],
    [],
    [],
    ['val2', 'val3'],
    ['val4', 'val5', 'val6'],
    ['val7', 'val8', 'val9', 'val10', 'val11'],
    [],
    ['val10'],
  ],
  className = 'hago_HashTable',
  id = makeId(className),
  fontsize = 0.7,
  width = 350,
  height = width,
  scale = 70,
  cwidth = scale,
  cheight,
  marginTop = 50,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  padding = 0.12,
}: HashTableProps) {
  const _svg = svg(width, height, margins);
  const _data = BuildHashData(data);
  const _keys = _data.keys;
  const _values = _data.values;
  const _yMax = data.length;
  const _xMax = _data.xMax;

  const _scaleY = scaleLinear().domain([0, _yMax]).range([0, _svg.height]);
  const _scaleX = scaleLinear().domain([0, _xMax]).range([0, _svg.width]);
  const _scale = scaleBand()
    .domain(_values.map((d) => `${d.id}`))
    .range([0, _svg.width - 50])
    .padding(padding);
  const rectWidth = _scale.bandwidth();

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <defs>
        <ArrowHead id={'hash_table_pointer'} refX={9} />
        <Marker
          id={`hash_table_pointer_start`}
          type="circle"
          circleFillColor="black"
          radius={4}
          refX={5}
          refY={5}
          width={6}
          height={6}
          cx={5}
          cy={5}
          viewbox={`0 0 10 10`}
        />
      </defs>
      {_keys.map((d, i) => {
        return (
          <g
            key={`hk_${id}_${i}`}
            transform={Translate(_scaleX(0), _scaleY(d.y))}
          >
            <text
              dx={-rectWidth / 4}
              dy={rectWidth / 1.5}
              textAnchor="end"
              fontSize={`${fontsize - 0.1}rem`}
            >
              {d.y}
            </text>
            <rect
              width={rectWidth}
              height={rectWidth}
              stroke={'black'}
              fill={'none'}
            />
            <Line
              start={{ x: rectWidth / 2, y: rectWidth / 2 }}
              end={{
                x: rectWidth * 2 + _scaleX(padding) * 3,
                y: rectWidth / 2,
              }}
              markerEnd={'hash_table_pointer'}
              markerStart={'hash_table_pointer_start'}
            />
          </g>
        );
      })}
      {_values.map((d, i) => {
        return (
          d.id && (
            <g
              key={`hv_${id}_${i}`}
              transform={Translate(
                _scaleX(padding),
                _scaleY(d.group as number)
              )}
            >
              <rect
                width={rectWidth}
                x={_scale(`${d.id}`)}
                y={rectWidth / 4}
                height={rectWidth / 2}
                stroke={'black'}
                fill={'none'}
              />
              <text
                dx={_scale(`${d.id}`) + rectWidth / 2}
                dy={rectWidth / 1.5}
                textAnchor={'middle'}
                fontSize={`0.7rem`}
              >
                {d.val}
              </text>
            </g>
          )
        );
      })}
    </Board>
  );
}

// [
//   { val: 'val1', group: 0 },
//   { val: '', group: 1 },
//   { val: '', group: 2 },
//   { val: 'val2', group: 3 },
//   { val: 'val3', group: 3 },
//   { val: 'val4', group: 4 },
//   { val: 'val5', group: 4 },
//   { val: 'val6', group: 4 },
//   { val: 'val7', group: 5 },
//   { val: 'val8', group: 5 },
//   { val: 'val9', group: 5 },
//   { val: '', group: 6 },
//   { val: 'val10', group: 7 },
// ];
