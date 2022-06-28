import React, { ReactElement, useMemo } from 'react';
import { scaleLinear } from 'd3';
import { Text } from './Text';

interface Props {
  domain: number[];
  range: number[];
  tickSep: number;
  markerStart?: string;
  markerEnd?: string;
  textOffsetX?: number;
  textOffsetY?: number;
  offsetTick?: number;
  removeEndTicks?: boolean;
  textAnchor?: 'start' | 'middle' | 'end';
}

export const AxisVertical = ({
  domain,
  range,
  tickSep = 50,
  markerStart,
  markerEnd,
  removeEndTicks = true,
  textOffsetX = 12,
  textOffsetY = 4,
  textAnchor = 'middle',
  offsetTick = 0,
}: Props): ReactElement => {
  const ticks = useMemo(() => {
    const yScale = scaleLinear().domain(domain).range(range);
    const width = range[0] - range[1];
    const pixelsPerTick = tickSep;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value) + offsetTick,
    }));
  }, [domain.join('-'), range.join('-')]);

  return (
    <g className="hago_y_axis">
      <path
        d={['M', range[1], -1, 'H', 0, 'v', range[0], 'H', 0].join(' ')}
        fill="none"
        stroke="black"
        markerStart={`url(#${markerStart})`}
        markerEnd={`url(#${markerEnd})`}
      />
      {ticks.map(({ value, yOffset }, i) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          {removeEndTicks && (i === 0 || i === ticks.length - 1) ? (
            <></>
          ) : (
            <line x1={-3} x2={3} stroke="currentColor" />
          )}
          <Text
            val={value}
            dx={textOffsetX}
            fontSize={0.65}
            dy={textOffsetY}
            anchor={textAnchor}
          />
        </g>
      ))}
    </g>
  );
};
