import React from 'react';
import { Latex } from './Latex';
import { TextProps } from '../utils';

export function Text({
  val,
  fontSize = 0.8,
  color = 'black',
  pos = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  width = 50,
  height = 50,
  fitContent = false,
  textAlign = 'center',
  latex = true,
  anchor = 'middle',
  block=true,
}: TextProps) {
  if (latex) {
    return (
      <Latex
        text={`${val}`}
        offset={{
          x: pos.x,
          y: pos.y,
        }}
        fitContent={fitContent}
        color={color}
        dx={dx}
        dy={dy}
        width={width}
        height={height}
        fontsize={fontSize}
        textAlign={textAlign}
        block={block}
      />
    );
  } else {
    return (
      <text
        textAnchor={anchor}
        x={pos.x}
        y={pos.y}
        dx={dx}
        dy={dy}
        fontSize={`${fontSize}rem`}
        fill={color}
      >
        {val}
      </text>
    );
  }
}
