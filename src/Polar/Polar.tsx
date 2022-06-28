import React from 'react';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { lineRadial } from 'd3-shape';
import { Board, svg, PolarProps } from '../utils';
import { BuildPolarData } from './Helpers/BuildPolarData';

export const Polar = ({
  data = [{ f: (t) => Math.sin(2 * t) * Math.cos(2 * t) }],
  domain = [0, 2 * Math.PI],
  className = 'Hago_Polar',
  width = 500,
  height = 500,
  radius = Math.min(width, height) / 2 - 40,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PolarProps) => {
  const funcData = BuildPolarData(domain, data[0]);
  const _svg = svg(width, height, margins);
  const r = scaleLinear().domain([0, 0.5]).range([0, radius]);
  const gr = r.ticks(5).slice(1);
  const ga = range(0, 360, 30);
  const line = lineRadial()
    .radius((d) => r(d[1]))
    .angle((d) => -d[0] + Math.PI / 2)(funcData);

  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g
        className="hago_polar_plot"
        transform={`translate(${_svg.width / 2}, ${_svg.height / 2})`}
      >
        <g className="hago_polar_plot_r_axis">
          {gr.map((d, i) => {
            return (
              <g
                className="hago_polar_plot_r_axis_ticks"
                key={`hago_plot_${i}`}
              >
                <circle r={r(d)} stroke="lightgrey" fill="none" />
                <text
                  y={-r(d) - 4}
                  transform="rotate(15)"
                  textAnchor="middle"
                  fontSize={`${0.7}rem`}
                >
                  {d}
                </text>
              </g>
            );
          })}
        </g>
        <g className="hago_polar_plot_a_axis">
          {ga.map((d) => {
            return (
              <g transform={`rotate(${-d})`}>
                <line x2={radius} stroke="lightgrey" strokeDasharray={4} />
                <text
                  x={radius + 6}
                  dy="0.35em"
                  textAnchor={d < 270 && d > 90 ? 'end' : null}
                  fontSize={`${0.7}rem`}
                  transform={
                    d < 270 && d > 90 ? `rotate(180 ${radius + 6}, 0)` : null
                  }
                >{`${d}°`}</text>
              </g>
            );
          })}
        </g>
        <g className="hago_polar_plot_function_plot">
          <path fill="none" stroke="red" d={line} />
        </g>
      </g>
    </Board>
  );
};
