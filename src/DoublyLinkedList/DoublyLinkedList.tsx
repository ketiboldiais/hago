import React from 'react';
import { scaleBand } from 'd3-scale';
import {
  Board,
  makeId,
  svg,
  generateElements,
  SetClassName,
  Translate,
  LinkedListProps,
  Cell,
  Line,
  Marker,
} from '../utils';
import { range } from 'd3';

export function DoublyLinkedList({
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
  const _nonDataFieldWidth = _scale.bandwidth() / 3;
  const _nodeGroupTranslation = (i: string) => Translate(_scale(i), 0);
  const _prevFieldTranslation = Translate(0, 0);
  const _dataFieldTranslation = Translate(_scale.bandwidth() / 3, 0);
  const _nextFieldTranslation = Translate(_scale.bandwidth(), 0);

  const _prev_link_x0 = -_nodeWidth + (_nodeWidth + _nodeWidth / 5);
  const _prev_link_y0 = _nodeHeight / 1.5;
  const _prev_link_x1 = -_nodeWidth + _nodeWidth / 1.8;
  const _prev_link_y1 = _nodeHeight / 1.5;

  const _next_link_x0 = _nodeWidth + _nodeWidth / 8;
  const _next_link_y0 = _nodeHeight / 4;
  const _next_link_x1 = _nodeWidth + _nodeWidth / 1.3;
  const _next_link_y1 = _nodeHeight / 4;

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
        <Marker
          id={`DLinkedList_Arrowhead`}
          refX={0}
          refY={0}
          width={3}
          height={3}
          orient={'auto'}
        />
        <Marker
          id={`DLinkedList_LinkOrigin`}
          type="circle"
          circleFillColor="black"
          radius={1}
          refX={3}
          refY={3}
          width={4}
          height={4}
          cx={3}
          cy={3}
          viewbox={`0 0 6 6`}
        />
      </defs>
      {_data.map((d, i) => {
        return (
          <g key={`dlk${id}_${i}`} transform={_nodeGroupTranslation(d)}>
            <g className={'prev_field'} transform={_prevFieldTranslation}>
              <Cell w={_nonDataFieldWidth} h={_nodeHeight} />
              <g transform={Translate(_nodeWidth / 1.5, _nodeHeight / 1.3)}>
                <text fontSize={`0.45rem`} textAnchor={'middle'}>
                  {d.val}
                </text>
              </g>
            </g>
            <g className={'data_field'} transform={_dataFieldTranslation}>
              <Cell w={_nodeWidth} h={_nodeHeight} />
            </g>
            <g className={'next_field'} transform={_nextFieldTranslation}>
              <Cell w={_nonDataFieldWidth} h={_nodeHeight} />
            </g>
            <g className={`prev_link`}>
              <Line
                start={{ x: _prev_link_x0, y: _prev_link_y0 }}
                end={{ x: _prev_link_x1, y: _prev_link_y1 }}
                markerEnd={`DLinkedList_Arrowhead`}
                markerStart={`DLinkedList_LinkOrigin`}
              />
            </g>
            <g className={`prev_link`}>
              <Line
                start={{ x: _next_link_x0, y: _next_link_y0 }}
                end={{ x: _next_link_x1, y: _next_link_y1 }}
                markerEnd={`DLinkedList_Arrowhead`}
                markerStart={`DLinkedList_LinkOrigin`}
              />
            </g>
          </g>
        );
      })}
    </Board>
  );
}
