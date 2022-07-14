import { FunctionDatum } from '../utils';

// export type RiemannDatum = {
//   xi: 'left' | 'right';
//   yi: 'min' | 'max';
//   i: number;
//   r: [number, number];
//   f: 'x' | 'y' | number | Function;
// };

export const RiemannPlot = (
  datum: FunctionDatum,
  xScale: any,
  yScale: any,
  domain: [number, number]
) => {
  let output = [];

  const f = datum.f;

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

  let userFunction = riemannData.f;

  const userFunction_is_a_function = typeof userFunction === 'function';
  const userFunction_is_a_number = typeof userFunction === 'number';

  if (userFunction_is_a_function || userFunction_is_a_number) {
    y1Function = userFunction;
  } else if (userFunction === 'x') {
    y1Function = 0;
  } else if (userFunction === 'y') {
    y1Function = () => 0;
  } else {
    throw new Error('Unrecognized riemannData.f value');
  }

  const y1Function_is_a_function = typeof y1Function === 'function';

  for (let i = start; i < end; i += rectWidth) {
    let x0 = i;
    let y0 = f(x0);
    let x1 = i;
    let y1 = y1Function_is_a_function ? y1Function(x1) : y1Function;
    x0 = xScale(x0);
    y0 = yScale(y0);
    x1 = xScale(x1);
    y1 = yScale(y1);
    let p = { x0, y0, x1, y1, color };
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
      let w = current.x0 - prev.x0;
      prev.r = w;
      next.r = w;
      prev.tx = rx(w);
      next.tx = rx(w);
    }
    i++;
  } while (i < outCount);

  return output;
};
