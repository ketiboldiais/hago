import React from 'react';
import { Board, svg } from '../utils';
import { hsl } from 'd3';

function colorFunction(d: number) {
  const c = hsl(d + 80, 0.7, 0.5).rgb();
  const red = c.r;
  const green = c.g;
  const blue = c.b;
  return `rgb(${red}, ${green}, ${blue})`;
}

type FunctionElement = { f: Function; scale?: number };

export interface MultiplotProps {
  data: FunctionElement[];
  id: string;
  width?: number;
  height?: number;
  scale?: number;
  cwidth?: number;
  cheight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: [number, number, number, number];
  yaw?: number;
  pitch?: number;
  helpers?: boolean;
  xDomain?: [number, number];
  yDomain?: [number, number];
  zRange?: [number, number];
  renderXAxis?: boolean;
  renderYAxis?: boolean;
  renderZAxis?: boolean;
  xTickCount?: number;
  yTickCount?: number;
  zTickCount?: number;
}

function generatePlotPoints(
  functionElement: FunctionElement,
  xDomain: [number, number],
  yDomain: [number, number]
) {
  const f = functionElement.f;
  const scale = functionElement.scale ? functionElement.scale : 1;
  let xDomainLowerBound = xDomain[0];
  let xDomainUpperBound = xDomain[1];
  let yDomainLowerBound = yDomain[0];
  let yDomainUpperBound = yDomain[1];
  let output = [];
  for (let x = xDomainLowerBound; x < xDomainUpperBound; x++) {
    let f0 = [];
    output.push(f0);
    for (let y = yDomainLowerBound; y < yDomainUpperBound; y++) {
      f0.push(f(x, y) * scale);
    }
  }
  return output;
}

function transformPoint(point: any[], yaw: number, pitch: number) {
  let newPoint = [];
  let cosA = Math.cos(pitch);
  let sinA = Math.sin(pitch);
  let cosB = Math.cos(yaw);
  let sinB = Math.sin(yaw);
  newPoint[0] = cosB;
  newPoint[1] = 0;
  newPoint[2] = sinB;
  newPoint[3] = sinA * sinB;
  newPoint[4] = cosA;
  newPoint[5] = -sinA * cosB;
  newPoint[6] = -sinB * cosA;
  newPoint[7] = sinA;
  newPoint[8] = cosA * cosB;
  let x =
    newPoint[0] * point[0] + newPoint[1] * point[1] + newPoint[2] * point[2];
  let y =
    newPoint[3] * point[0] + newPoint[4] * point[1] + newPoint[5] * point[2];
  let z =
    newPoint[6] * point[0] + newPoint[7] * point[1] + newPoint[8] * point[2];
  return [x, y, z];
}

function heightFunction(d: any) {
  return [d];
}

function getHeights(datum: any[]) {
  let data = datum;
  let output = [];
  let xLength = data.length;
  let yLength = data[0].length;
  let t: any[];
  let value: any[];
  for (let x = 0; x < xLength; x++) {
    output.push((t = []));
    for (let y = 0; y < yLength; y++) {
      value = heightFunction(data[x][y]);
      t.push(value);
    }
  }
  return output;
}

function getTransformedData(
  datum = [],
  displayWidth: number,
  yaw: any,
  pitch: any
) {
  let data = datum;
  let output = [];
  let zoom = Math.SQRT2;
  let t = [];
  let heights = getHeights(datum);
  let xLength = data.length;
  let yLength = data[0].length;
  for (let x = 0; x < xLength; x++) {
    output.push((t = []));
    for (let y = 0; y < yLength; y++) {
      t.push(
        transformPoint(
          [
            ((x - xLength / 2) / (xLength * zoom)) * displayWidth,
            heights[x][y],
            ((y - yLength / 2) / (yLength * zoom)) * displayWidth,
          ],
          yaw,
          pitch
        )
      );
    }
  }
  return output;
}

function renderSurface(
  dataVals: any[],
  displayWidth: number,
  displayHeight: number,
  yaw: number,
  pitch: number
) {
  let originalData = dataVals;
  let data = getTransformedData(dataVals, displayWidth, yaw, pitch);
  let xLength = data.length;
  let yLength = data[0].length;
  let d0 = [];
  let depth: any;
  let x: number, y: number;
  let M1: any, M2: any, L1: any, L2: any, L3: any, L4: any, L5: any, L6: any;
  let path: string;
  for (x = 0; x < xLength - 1; x++) {
    for (y = 0; y < yLength - 1; y++) {
      depth =
        data[x][y][2] +
        data[x + 1][y][2] +
        data[x + 1][y + 1][2] +
        data[x][y + 1][2];
      M1 = (data[x][y][0] + displayWidth / 2).toFixed(10);
      M2 = (data[x][y][1] + displayHeight / 2).toFixed(10);
      L1 = (data[x + 1][y][0] + displayWidth / 2).toFixed(10);
      L2 = (data[x + 1][y][1] + displayHeight / 2).toFixed(10);
      L3 = (data[x + 1][y + 1][0] + displayWidth / 2).toFixed(10);
      L4 = (data[x + 1][y + 1][1] + displayHeight / 2).toFixed(10);
      L5 = (data[x][y + 1][0] + displayWidth / 2).toFixed(10);
      L6 = (data[x][y + 1][1] + displayHeight / 2).toFixed(10);
      path = `M ${M1},${M2} L${L1},${L2}, L${L3},${L4} L${L5},${L6} Z`;
      d0.push({ path, depth, data: originalData[x][y] });
    }
  }
  d0.sort((a, b) => b.depth - a.depth);
  return d0;
}

export function Multiplot({
  data = [{ f: (x: number, y: number) => x ** 2 - y ** 2 }],
  id,
  width = 600,
  height = 600,
  scale = 100,
  cwidth = scale,
  cheight,
  marginTop = 60,
  marginRight = 60,
  marginBottom = 60,
  marginLeft = 60,
  margins = [marginTop, marginRight, marginBottom, marginLeft],
  xDomain = [-20, 20],
  yDomain = [-20, 20],
  yaw = 0.5,
  pitch = 0.5,
}: MultiplotProps) {
  const _svg = svg(width, height, margins);
  let _data: any[];
  let _surface: any[];
  let plotData = [];
  for (let i = 0; i < data.length; i++) {
    _data = generatePlotPoints(data[i], xDomain, yDomain);
    console.log(_data);
    _surface = renderSurface(_data, _svg.width, _svg.height, yaw, pitch);
    console.log(_surface);
    plotData.push(_surface);
  }
  console.log(plotData);
  return (
    <Board
      className={'hago_multiplot'}
      width={width}
      height={height}
      cwidth={cwidth}
      cheight={cheight}
      margins={margins}
    >
      <g className="multiplot_canvas">
        {plotData.map((d, i) => {
          return (
            <g key={`${id}_multiplot_${i}`}>
              {d.map((el: { path: string; data: any }, i: any) => {
                return (
                  <path
                    d={el.path}
                    fill={colorFunction(el.data)}
                    key={`${id}_${i}`}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </Board>
  );
}
