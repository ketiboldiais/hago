import React, { ReactElement, useMemo } from 'react';
import { scaleLinear } from 'd3';
import { Text } from './Text';
import { AxisProps } from './Types';

export const AxisVertical = ({
  domain,
  range,
  tickSep = 50,
  removeEndTicks = true,
  dx = 0,
  dy = 0,
  offsetTick = 0,
  fitContent = true,
  latex = true,
  textAnchor = 'end',
  fontsize = 0.6,
}: AxisProps): ReactElement => {
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
      />
      {ticks.map(({ value, yOffset }, i) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          {removeEndTicks && (i === 0 || i === ticks.length - 1) ? (
            <></>
          ) : (
            <line x1={-3} x2={3} stroke="currentColor" />
          )}
          {latex ? (
            <Text
              val={value}
              pos={{ x: dx, y: dy }}
              fontSize={0.6}
              fitContent={fitContent}
            />
          ) : (
            <text
              dx={dx}
              y={dy}
              textAnchor={textAnchor}
              fontSize={`${fontsize}rem`}
            >
              {value}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};
