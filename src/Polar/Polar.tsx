import React from 'react';
import { scaleLinear, range } from 'd3';
import { svg } from '../utils';
import * as d3 from 'd3';
import { Board } from '../Board/Board';

type FunctionElement = { f: Function; scale?: number; color?: string };

export interface PolarProps {
  data: FunctionElement[];
  radius?: number;
  domain?: number[];
  range?: number[];
  className: string;
  width?: number;
  height?: number;
  cwidth?: number;
  cheight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: number[];
}

function generateData(_domain: number[], _f: FunctionElement) {
  const f = _f.f;
  let points = [];
  range(_domain[0], _domain[1], 0.01).map(t => {
    let p = [t, f(t)];
    points.push(p);
  });
  return points;
}

export const Polar = ({
  data = [{ f: t => Math.sin(2 * t) * Math.cos(2 * t) }],
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
}) => {
  const funcData = generateData(domain, data[0]);
  const _svg = svg(width, height, margins);
  const r = scaleLinear()
    .domain([0, 0.5])
    .range([0, radius]);
  const gr = r.ticks(5).slice(1);
  const ga = d3.range(0, 360, 30);
  const line = d3
    .lineRadial()
    .radius(d => r(d[1]))
    .angle(d => -d[0] + Math.PI / 2)(funcData);

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
          {ga.map(d => {
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
