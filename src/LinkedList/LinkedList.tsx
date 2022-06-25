import React from 'react';
import { NextField, DataField, LinkMarkers, Links } from './Builders';
import { scaleBand } from 'd3';
import {
  Board,
  BaseProps,
  ElementArray,
  makeId,
  svg,
  generateElements,
  SetClassName,
  Translate,
} from '../utils';

export interface LinkedListProps extends BaseProps {
  data: ElementArray;
  isIndexed?: boolean;
}

export function LinkedList({
  data = [1, 2, 3, 4, 5],
  className = 'LinkedList',
  id = makeId(className),
  width = 30.1049 * data.length + 70.1515,
  height = 40,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 10,
  marginRight = 40,
  marginBottom = 10,
  marginLeft = 20,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  isIndexed = true,
}: LinkedListProps) {
  const _svg = svg(width, height, margins);
  const _data = generateElements(data);
  const _scale = scaleBand()
    .domain(_data)
    .rangeRound([0, _svg.width])
    .paddingInner(0.5);
  const _nodeWidth = _scale.bandwidth();
  const _nodeHeight = 10;

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      {LinkMarkers(id)}
      {_data.map((d, i) => {
        return (
          <g
            key={`${id}_${i}`}
            className={SetClassName(d.class, 'hago_LinkedList_node')}
            transform={Translate(_scale(d), 0)}
          >
            {DataField(_nodeWidth, _nodeHeight, d, isIndexed, i)}
            {NextField(_scale, _nodeWidth, _nodeHeight)}
            {Links(_nodeWidth, _nodeHeight, _scale, id)}
          </g>
        );
      })}
    </Board>
  );
}
