import { ParametricFunctionDatum } from '../utils';

export const RiemannPlotParametric = (
  datum: ParametricFunctionDatum,
  xScale: any,
  yScale: any,
  domain: [number, number]
) => {
  let output = [];

  const xFunction = datum.x;
  const yFunction = datum.y;

  const riemannData = datum.riemann;

  const interval = riemannData.i ? riemannData.i : domain;
  const rectWidth = riemannData.dx;

  const start = interval[0];
  const end = interval[1];
  const color = riemannData.color ? riemannData.color : '#54BAB9';

  /**
   * rx transforms the x coordinate according to the method passed
   */

  let rx: Function;

  // the width of the rectangle / Delta X

  const method = riemannData.m ? riemannData.m : 'midpoint';

  if (method === 'left') {
    /**
     * If it's the left method, the rectangle's start point is to the left:
     *
     *     +-------
     *
     * This is the default svg case, so rx will just return x
     */

    rx = (x: number) => x / 2;
  } else if (method === 'right') {
    /**
     * If it's the right method, the rectangle's start point is to the right:
     *
     *
     *    ------+
     */
    rx = (x: number) => -x / 2;
  } else if (method === 'midpoint') {
    rx = (x: number) => x;
  } else {
    throw new Error(
      `Invalid m value. Got ${method}, expected: (left|right|midpoint)`
    );
  }

  let y1Function: any;

  /**
   * This is the function to integrate with respect to
   */
  let userFunction = riemannData.f;

  /**
   * The orientation of the rectangles
   */

  const userFunction_is_a_function = typeof userFunction === 'function';

  const userFunction_is_a_number = typeof userFunction === 'number';

  if (userFunction_is_a_function || userFunction_is_a_number) {
    y1Function = userFunction;
  } else if (userFunction === 'x') {
    y1Function = 0;
  } else if (userFunction === 'y') {
    y1Function = () => 0;
  } else {
    throw new Error('Unrecognized riemannData.xFunction value');
  }

  const y1Function_is_a_function = typeof y1Function === 'function';

  let x1y1 = [];

  for (let i = start; i < end; i += rectWidth) {
    let x = i;
    let _x = xFunction(x);
    let _y = yFunction(x);
    let x1 = xScale(_x);
    let y1 = yScale(_y);
    let p = { x1, y1 };
    x1y1.push(p);
  }

  let x2y2 = [];

  for (let i = start; i < end; i += rectWidth) {
    let x2 = xScale(i);
    let y2 = yScale(y1Function_is_a_function ? y1Function(i) : y1Function);
    let p = { x2, y2 };
    x2y2.push(p);
  }

  const _length = x1y1.length;

  for (let i = 0; i < _length; i++) {
    let x1 = x1y1[i].x1;
    let y1 = x1y1[i].y1;
    let x2 = x2y2[i].x2;
    let y2 = x2y2[i].y2;
    let p = { x1, y1, x2, y2, color };
    output.push(p);
  }

  const outCount = output.length;

  let i = 0;
  let current: any;

  do {
    if (current === undefined) {
      current = output[0];
    } else {
      current = output[i];
      let prev = output[i - 1];
      let next = output[i + 1] ? output[i + 1] : output[i];
      let w = current.x1 - prev.x1;
      prev.r = w;
      next.r = w;
      prev.tx = rx(w);
      next.tx = rx(w);
    }
    i++;
  } while (i < outCount);

  return output;
};
