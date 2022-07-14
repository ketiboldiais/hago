import { arc, pie } from 'd3';
import React from 'react';
import {
  Board,
  generateElements,
  makeId,
  svg,
  ArrayData,
  BaseProps,
  Translate,
} from '../utils';

export interface CircularQueueProps extends BaseProps {
  data: ArrayData;
  fontSize?: number;
  iradius?: number;
  oradius?: number;
  padding?: number;
  index?: boolean;
}

export function CircularQueue({
  data = [{ val: 1, ant: 'p' }, 2, 3, 4, { val: 71, ant: 'c' }, 6, 7, 8, 9],
  index = false,
  className = 'hago_queue',
  id = makeId(className),
  width = 500,
  fontSize = 0.8,
  height = 250,
  iradius = 70,
  oradius = 90,
  scale = 100,
  cwidth = scale,
  cheight,
  padding = 0.05,
  marginTop = 50,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: CircularQueueProps) {
  const _data = pie()
    .padAngle(padding)
    .value((d: any) => d.data)(generateElements(data));
  const _svg = svg(width, height, margins);

  const _arc = arc().innerRadius(iradius).outerRadius(oradius);

  const _pointerArc = arc()
    .innerRadius(iradius)
    .outerRadius(oradius * 1.5);

  const _indexArc = arc()
    .innerRadius(iradius / 1.5)
    .outerRadius(iradius);

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      {_data.map((d: any, i: number) => {
        return (
          <g
            key={`cq${id}_${i}`}
            transform={Translate(_svg.width / 2, _svg.height / 2)}
          >
            <path d={_arc(d)} fill={'none'} stroke={'black'} />
            <g transform={`translate(${_arc.centroid(d)})`}>
              <text
                textAnchor="middle"
                fontSize={`${fontSize}rem`}
                dx={0}
                dy={3 + fontSize}
              >
                {d.data.val}
              </text>
            </g>
            {d.data.ant && (
              <g transform={`translate(${_pointerArc.centroid(d)})`}>
                <text
                  textAnchor="middle"
                  fontSize={`${fontSize - 0.1}rem`}
                  dx={0}
                  dy={2 + fontSize}
                >
                  {d.data.ant}
                </text>
              </g>
            )}
            {index && (
              <g transform={`translate(${_indexArc.centroid(d)})`}>
                <text
                  textAnchor="middle"
                  fontSize={`${fontSize - 0.1}rem`}
                  dx={0}
                  dy={2 + fontSize}
                >
                  {i}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </Board>
  );
}
