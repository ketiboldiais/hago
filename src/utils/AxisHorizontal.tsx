import React, { ReactElement, useMemo } from 'react';
import { scaleLinear } from 'd3';
import { Text } from './Text';

interface Props {
  domain: number[];
  range: number[];
  tickSep: number;
  markerStart?: string;
  markerEnd?: string;
  removeEndTicks?: boolean;
  offSetXTick?: number;
  offSetYTick?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  axisLabelArray?: (string | number)[];
}

export const AxisHorizontal = ({
  domain,
  range,
  tickSep = 50,
  markerStart,
  markerEnd,
  removeEndTicks = true,
  offSetXTick = 0,
  textAnchor = 'middle',
  axisLabelArray,
}: Props): ReactElement => {
  const ticks = useMemo(() => {
    const xScale = scaleLinear().domain(domain).range(range);
    const width = range[1] - range[0];
    const pixelsPerTick = tickSep;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value) + offSetXTick,
    }));
  }, [domain.join('-'), range.join('-')]);

  return (
    <g className="hago_x_axis">
      <path
        d={['M', range[0], 1, 'v', -1, 'H', range[1], 'v', 1].join(' ')}
        fill="none"
        stroke="black"
        markerStart={`url(#${markerStart})`}
        markerEnd={`url(#${markerEnd})`}
      />
      {ticks.map(({ value, xOffset }, i) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {removeEndTicks && (i === 0 || i === ticks.length - 1) ? (
            <></>
          ) : (
            <line y1={-3} y2={3} stroke="currentColor" />
          )}
          <Text
            val={axisLabelArray ? axisLabelArray[i] : value}
            dy={20}
            fontSize={0.65}
            anchor={textAnchor}
          />
        </g>
      ))}
    </g>
  );
};
