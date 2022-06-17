import React, { ReactElement, useMemo } from 'react';
import { scaleLinear } from 'd3';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

interface Props {
  domain: number[];
  range: number[];
  tickSep: number;
  markerStart?: string;
  markerEnd?: string;
}

export const AxisVertical = ({
  domain,
  range,
  tickSep = 50,
  markerStart,
  markerEnd,
}: Props): ReactElement => {
  const ticks = useMemo(() => {
    const yScale = scaleLinear()
      .domain(domain)
      .range(range);
    const width = range[0] - range[1];
    const pixelsPerTick = tickSep;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return yScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      yOffset: yScale(value),
    }));
  }, [domain.join('-'), range.join('-')]);

  return (
    <g>
      <path
        d={['M', range[1], -1, 'H', 0, 'v', range[0], 'H', 0].join(' ')}
        fill="none"
        stroke="black"
        markerStart={`url(#${markerStart})`}
        markerEnd={`url(#${markerEnd})`}
      />
      {ticks.map(({ value, yOffset }, i) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          {i === 0 || i === ticks.length - 1 ? (
            <></>
          ) : (
            <line x1={-3} x2={3} stroke="currentColor" />
          )}
          <g transform={'translate(5, -4)'}>
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
