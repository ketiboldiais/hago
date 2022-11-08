import React from 'react';
import { scaleLinear } from 'd3';
import { AreaPlot, FunctionPlot, ParametricFunctionPlot } from './FunctionPlot';
import { RiemannPlot } from './RiemannPlot';
import {
  Board, AxisVertical, AxisHorizontal,
  svg, PlotProps, Translate,
  makeId, FunctionDatum, ParametricFunctionDatum,
  TextDatum, IsUndefined, Label,
  PointDatum, Latex,
  BaseProps,
} from '../utils';
import { RiemannPlotParametric } from './RiemannPlotParametric';
import {makeLinearFunction} from './makeLinearFunction';
import {getMidPoint} from './getMidPoint';
import {MakeCoordinates} from './MakeCoordinates';

type Euclid = {
  s: string,
  xy: number[],
  r: number,
  class: string,
}

function GenerateLabel(datum: Label): any {
  let out: Label;
  if (typeof datum === 'string') { out = { t: datum as string }; }
  else { out = datum as Label; }
  return out;
}


/**
 * @public
 */
export interface PlotProps extends BaseProps {
  data?: (
    | FunctionDatum
    | ParametricFunctionDatum
    | TextDatum
    | PointDatum
    | Euclid
  )[];
  domain?: [number, number];
  range?: [number, number];
  ticks?: number;
  xTicks?: number;
  yTicks?: number;
  samples?: number;
  className?: string;
  id?: string;
  axesLabels?: [Label, Label];
}

export const Plot = ({
  data = [],
  className = 'Plot2',
  id = makeId(className),
  domain = [-10, 10],
  range = [-10, 10],
  ticks = 4,
  xTicks = ticks,
  yTicks = ticks,
  axesLabels = ['', ''],
  samples,
  width = 500,
  height = 500,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 30,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 30,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
}: PlotProps) => {
  let elements = [];
  let areas = [];
  let circles = [];
  let segments = [];
  let annotations = [];
  let riemanns: any = [];
  let points: PointDatum[] = [];
  let secants: any[] = [];
  const { width: _svg_width, height: _svg_height } = svg(
    width,
    height,
    margins
  );
  const xTickcount = xTicks * 10;
  const yTickCount = yTicks * 10;
  const xScale = scaleLinear().domain(domain).range([0, _svg_width]);
  const yScale = scaleLinear().domain(range).range([_svg_height, 0]);
  const xLabel = axesLabels[0]
    ? GenerateLabel(axesLabels[0])
    : GenerateLabel('');
  const yLabel = axesLabels[1]
    ? GenerateLabel(axesLabels[1])
    : GenerateLabel('');
  for (let i = 0; i < data.length; i++) {
    let datum = data[i];
    if ((datum as FunctionDatum).f) {
      datum = datum as FunctionDatum;
      if ((datum).disc) {
        let el = MakeCoordinates(datum.f, datum.disc, domain, range);
        el.filter(d=>d.y!==null).forEach((d) => {
          circles.push({s: 'circle', r: datum.r ? datum.r : 0.07, xy:[d.x,d.y]})
        })
        continue;
      }
      datum = datum as FunctionDatum;
      let el = FunctionPlot(datum, xScale, yScale, samples, domain, range);
      elements.push(el);
      if (datum.secant && typeof datum.f === 'function') {
        BuildSecantLine(datum,points,domain,annotations,xScale,yScale,secants);
      }
    }
    if ((datum as TextDatum).t) {
      datum = datum as TextDatum;
      datum.w = datum.w || 100;
      datum.h = datum.h || 20;
      datum.x = datum.x || 0;
      datum.y = datum.y || 0;
      annotations.push(datum);
    }
    if ((datum as FunctionDatum).riemann && (datum as FunctionDatum).f) {
      let el = RiemannPlot(datum as FunctionDatum, xScale, yScale, domain);
      riemanns.push(el);
    }
    if ((datum as ParametricFunctionDatum).riemann&&(datum as ParametricFunctionDatum).x&&(datum as ParametricFunctionDatum).y) {
      let el = RiemannPlotParametric(datum as ParametricFunctionDatum,xScale,yScale,domain);
      riemanns.push(el);
    }
    if ((datum as FunctionDatum | ParametricFunctionDatum).integrate) {
      let el = AreaPlot(datum as FunctionDatum,xScale,yScale,samples,domain);
      areas.push(el);
    }
    if ((datum as PointDatum).p) {
      points.push(datum as PointDatum);
    }
    if ((datum as ParametricFunctionDatum).x&&(datum as ParametricFunctionDatum).y&&IsUndefined((datum as any).t)) {
      let el = ParametricFunctionPlot(datum as ParametricFunctionDatum,xScale,yScale,samples,domain);
      elements.push(el);
    }
    if ((datum as Euclid).s) {
      switch ((datum as Euclid).s) {
        case 'segment':
          segments.push(datum);
          break;
        case 'circle':
          circles.push(datum);
          break;
      }
    }
  }
  riemanns = riemanns ? riemanns.flat() : false;
  return (
    <Board
      className={className}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="Plot" style={{ transformOrigin: `center` }}>
        <defs>
          <clipPath id={`${id}_Plot_clipPath`}>
            <rect width={_svg_width} height={_svg_height} />
          </clipPath>
        </defs>
        <g transform={Translate(0, yScale(0))} className="hago_XAxis">
          {RenderXAxis(domain, _svg_width, xTickcount)}
          {xLabel && RenderXLabel(xLabel, _svg_width)}
        </g>
        <g transform={Translate(xScale(0), 0)} className="hago_YAxis">
          {RenderYAxis(range, _svg_height, yTickCount)}
          {yLabel && RenderYLabel(yLabel)}
        </g>
        <g>{circles && circles.map((d,i) => <circle cx={xScale(d.xy[0])} cy={yScale(d.xy[1])} r={yScale(domain[1]-d.r)} fill={'none'} stroke={'black'} className={d.class || 'plot_circle'} key={`plot-circ-${id}${i}`}/>)}</g>
        <g>{segments && segments.map((d,i) => <line x1={xScale(d.xy[0])} y1={yScale(d.xy[1])} x2={xScale(d.xy[2])} y2={yScale(d.xy[3])} stroke={'black'} className={d.class || 'plog_segment'} key={`plot-seg-${id}${i}`}/>)}</g>
        {secants &&
          secants.map((d, i) => (
            <g key={`sc${id}_${i}`} className={`${d.className}`}>
              <path d={d.pathDatum} stroke={d.color} fill={'none'} />
            </g>
          ))}
        {points && RenderPoints(points, id, xScale, yScale)}
        {elements && RenderCurves(elements, id)}
        {areas && RenderIntegrals(areas, id)}
        {annotations && RenderAnnotations(annotations, id, xScale, yScale)}
        {riemanns && RenderRiemannSums(riemanns, id)}
      </g>
    </Board>
  );
};

function BuildSecantLine(
  datum: FunctionDatum,
  points: PointDatum[],
  domain: [number, number],
  annotations: any[],
  xScale,
  yScale,
  secants: any[]
) {
  let sec = datum.secant;
  let className = sec.class ? sec.class : 'hago_SecantLine';
  let renderFormula = sec.renderFormula;

  // First input supplied by user
  let x0: number = sec.x0;

  // Second input supplied by user
  let x1: number = sec.x1;

  // computed y-output for first point
  let y0: number = datum.f(x0);

  // computed y-output for second point
  let y1: number = datum.f(x1);

  let color = sec.c || 'teal';

  // only render the points supplied by the user
  const point1: [number, number] = [x0, y0];
  const point2: [number, number] = [x1, y1];

  if (sec.renderPoints) {
    points.push({ p: point1, label: `(${x0}, ${y0})` });
    points.push({ p: point2, label: `(${x1}, ${y1})` });
  }

  const getLineFunction = makeLinearFunction(point1, point2);

  const secantFunction = getLineFunction.f;
  const secantFormula = getLineFunction.formula;

  let xi = domain[0];
  let xf = domain[1];

  let yi = secantFunction(xi);
  let yf = secantFunction(xf);

  if (renderFormula) {
    const midpoint = getMidPoint(point1, point2);
    const textFormula: TextDatum = {
      t: secantFormula,
      w: 100,
      h: 100,
      x: midpoint.x,
      y: midpoint.y,
      color: 'teal',
    };
    annotations.push(textFormula);
  }

  // scale the values for path rendering
  xi = xScale(xi);
  yi = yScale(yi);

  x0 = xScale(x0);
  y0 = yScale(y0);

  x1 = xScale(x1);
  y1 = yScale(y1);

  xf = xScale(xf);
  yf = yScale(yf);

  let pathDatum = `M${xi} ${yi} L${x0} ${y0} L${x1} ${y1} L${xf} ${yf}`;

  secants.push({ pathDatum, color, className });
}

function RenderYAxis(
  range: [number, number],
  _svg_height: number,
  yTickCount: number
) {
  return (
    <AxisVertical
      domain={range}
      range={[_svg_height, 0]}
      tickSep={yTickCount}
      dy={5}
      dx={-10}
      markerStart={range[1] && 'yArrowUp'}
      markerEnd={range[0] && 'yArrowDown'}
      latex={false}
    />
  );
}

function RenderXAxis(
  domain: [number, number],
  _svg_width: number,
  xTickcount: number
) {
  return (
    <AxisHorizontal
      domain={domain}
      range={[0, _svg_width]}
      tickSep={xTickcount}
      dx={0}
      dy={20}
      markerStart={domain[0] && 'xArrowLeft'}
      markerEnd={domain[1] && 'xArrowRight'}
      fitContent={true}
      latex={false}
    />
  );
}

function RenderXLabel(xLabel: any, _svg_width: number): React.ReactNode {
  return (
    <text
      dx={xLabel.x || _svg_width + 10}
      dy={xLabel.y || 4}
      textAnchor={xLabel.textAnchor || 'start'}
    >
      {xLabel.t}
    </text>
  );
}

function RenderYLabel(yLabel: any): React.ReactNode {
  return (
    <text
      dx={yLabel.x || 0}
      dy={yLabel.y || -10}
      textAnchor={yLabel.textAnchor || 'middle'}
    >
      {yLabel.t}
    </text>
  );
}

function RenderPoints(
  points: PointDatum[],
  id: string,
  xScale,
  yScale
): React.ReactNode {
  return points.map((d, i) => (
    <g
      key={`pp${id}_${i}`}
      transform={Translate(xScale(d.p[0]), yScale(d.p[1]))}
      className={d.class || 'hago_PlotPoint'}
    >
      <circle
        r={d.r || 2}
        stroke={d.c || 'tomato'}
        fill={!d.in ? d.c || 'tomato' : 'none'}
      />
      {d.label && (
        <text x={d.dx || 1} y={-d.dy || -5} fontSize={'0.7rem'}>
          {d.label}
        </text>
      )}
    </g>
  ));
}

function RenderCurves(elements: any[], id: string): React.ReactNode {
  return elements.map((d, i) => (
    <g key={`li${id}_${i}`} clipPath={`url(#${id}_Plot_clipPath)`} className={`hago_PlotPath`}>
      {d}
    </g>
  ));
}

function RenderIntegrals(areas: any[], id: string): React.ReactNode {
  return areas.map((d, i) => (
    <g
      key={`ar${id}_${i}`}
      clipPath={`url(#${id}_Plot_clipPath)`}
      className="integration_area"
    >
      {d}
    </g>
  ));
}

function RenderAnnotations(
  annotations: any[],
  id: string,
  xScale,
  yScale
): React.ReactNode {
  return annotations.map((d, i) => (
    <g key={`plot-annotations-hago-${id}-${d.t}-${i}`}>
      <Latex
        text={d.t}
        offset={{
          x: xScale(d.x),
          y: yScale(d.y),
        }}
        fontsize={d.fontsize || 0.8}
        dx={0}
        dy={0}
        width={d.w}
        height={d.h}
        color={d.color || 'black'}
        fitContent={true}
        textAlign={'center'}
        block={false}
      />
    </g>
  ));
}

function RenderRiemannSums(
  riemanns: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    r: number;
    tx: number;
    color: string;
  }[],
  id: string
): React.ReactNode {
  return riemanns.map((d, i) => (
    <g
      key={`rm${id}${i}`}
      className="riemann_sums"
      transform={Translate(d.tx, 0)}
      clipPath={`url(#${id}_Plot_clipPath)`}
    >
      <line
        x1={d.x1}
        y1={d.y1}
        x2={d.x2}
        y2={d.y2}
        stroke={d.color}
        strokeOpacity={0.1}
        strokeWidth={d.r}
      />
      <line
        x1={d.x1}
        y1={d.y1}
        x2={d.x2}
        y2={d.y2}
        stroke={d.color}
        strokeOpacity={0.6}
        strokeWidth={d.r - 1}
      />
    </g>
  ));
}
