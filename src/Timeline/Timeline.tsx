import React from 'react';
import { BaseProps, Board, makeId } from '../utils';

export type DateInterval = [number, number] | number;

export interface TimelineDatum {
  /**
   * @public
   * A time interval:
   * - [number, number]
   */
  t: DateInterval;
  L: string;
}

export interface TimelineProps extends BaseProps {}

export function Timeline({
  className = 'hago_sequence',
  id = makeId(className),
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 100,
  marginLeft = 50,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: TimelineProps) {
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    ></Board>
  );
}
