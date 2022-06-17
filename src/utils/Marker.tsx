import React, { ReactElement } from 'react';

interface MarkerProps {
  id: string;
  type?: 'circle' | 'arrow' | 'square';
  className?: string;
  arrowColor?: string;
  refX?: number;
  refY?: number;
  width?: number;
  height?: number;
  radius?: number;
  viewbox?: string;
  cx?: number;
  cy?: number;
  circleFillColor?: string;
  circleStrokeColor?: string;
  orient?: string | number;
}

function CirclePath({ cx, cy, r, fill, stroke }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} />;
}

function ArrowPath({ fill = 'black' }) {
  return <path d={'M0,-5L10,0L0,5Z'} fill={fill}></path>;
}

export const Marker = ({
  id,
  type = 'arrow',
  className,
  arrowColor,
  radius,
  refX = radius,
  refY = radius,
  width,
  height,
  cx,
  cy,
  circleFillColor = 'white',
  circleStrokeColor = 'black',
  orient,
  viewbox = `0 -5 10 10`,
}: MarkerProps): ReactElement => {
  const GetCorrectMarkerType = () => {
    switch (type) {
      case 'arrow':
        return <ArrowPath fill={arrowColor} />;
      case 'circle':
        return (
          <CirclePath
            cx={cx}
            cy={cy}
            r={radius}
            fill={circleFillColor}
            stroke={circleStrokeColor}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <marker
      id={id}
      className={className}
      viewBox={viewbox}
      refX={refX}
      refY={refY}
      orient={orient}
      markerWidth={width}
      markerHeight={height}
    >
      {GetCorrectMarkerType()}
    </marker>
  );
};
