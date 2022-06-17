import React, { ReactElement, useMemo } from 'react';
import { scaleLinear } from 'd3';
import "katex/dist/katex.min.css";
import TeX from '@matejmazur/react-katex';

interface Props {
  domain: number[];
  range: number[];
  tickSep: number;
  markerStart?: string;
  markerEnd?: string;
}

export const AxisHorizontal = ({
  domain,
  range,
  tickSep = 50,
  markerStart,
  markerEnd,
}: Props): ReactElement => {
  const ticks = useMemo(() => {
    const xScale = scaleLinear()
      .domain(domain)
      .range(range);
    const width = range[1] - range[0];
    const pixelsPerTick = tickSep;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain.join('-'), range.join('-')]);

  return (
    <g>
      <path
        d={['M', range[0], 1, 'v', -1, 'H', range[1], 'v', 1].join(' ')}
        fill="none"
        stroke='black'
        markerStart={`url(#${markerStart})`}
        markerEnd={`url(#${markerEnd})`}
      />
      {ticks.map(({ value, xOffset }, i) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {i === 0 || i === ticks.length - 1 ? (
            <></>
          ) : (
            <line y1={-3} y2={3} stroke="currentColor" />
          )}
          <g transform={'translate(-2, 4)'}>
            <foreignObject width={20} height={20}>
              <div style={{ fontSize: '8px' }}>
                <TeX math={`${value}`} />
              </div>
            </foreignObject>
          </g>
        </g>
      ))}
    </g>
  );
};
