import React, { ReactElement } from 'react';

interface Props {
  id: string;
  className?: string;
  arrowColor?: string;
  refX?: number;
  refY?: number;
  width?: number;
  height?: number;
  orient?: string | number;
}

export const ArrowHead = ({
  id,
  className,
  arrowColor,
  refX = -5,
  refY = 0,
  width = 6,
  height = 6,
  orient = 'auto',
}: Props): ReactElement => {
  return (
    <marker
      id={id}
      className={className}
      viewBox="0 -5 10 10"
      refX={refX}
      refY={refY}
      orient={orient}
      markerWidth={width}
      markerHeight={height}
    >
      <path d={'M0,-5L10,0L0,5Z'} fill={arrowColor}></path>
    </marker>
  );
};
