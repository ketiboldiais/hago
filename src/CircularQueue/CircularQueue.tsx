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
  Text,
} from '../utils';

export interface CircularQueueProps extends BaseProps {
  data: ArrayData;
  fontSize?: number;
  iradius?: number;
  oradius?: number;
  padding?: number;
}

export function CircularQueue({
  data = [{ val: 1, ant: 'p' }, 2, 3, 4, { val: 71, ant: 'c' }, 6, 7, 8, 9],
  className = 'hago_queue',
  id = makeId(className),
  width = 500,
  height = 250,
  iradius,
  oradius,
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
  iradius = 70;
  oradius = 90;
  const _arc = arc().innerRadius(iradius).outerRadius(oradius);
  const _indexArc = arc()
    .innerRadius(iradius)
    .outerRadius(oradius * 1.5);

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
              <Text
                val={d.data.val}
                fitContent={true}
                pos={{ x: -iradius / 18, y: -iradius / 3.5 }}
                fontSize={0.7}
                textAlign={'center'}
              />
            </g>
            {d.data.ant && (
              <g transform={`translate(${_indexArc.centroid(d)})`}>
                <Text
                  val={d.data.ant}
                  fitContent={true}
                  pos={{ x: -iradius / 18, y: -iradius / 3.5 }}
                  fontSize={0.7}
                  textAlign={'center'}
                />
              </g>
            )}
          </g>
        );
      })}
    </Board>
  );
}
