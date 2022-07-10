export function MakeCoordinates(
  f: Function | number,
  number_of_samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) {
  let dataSet = [];
  let x: number;
  let y: any;
  const xMax = domain[1];
  const [yMin, yMax] = range;
  for (let i = -number_of_samples; i < number_of_samples; i++) {
    if (typeof f === 'number') {
      x = f;
      y = i;
    } else if (typeof f === 'function') {
      x = (i / number_of_samples) * xMax;
      y = f(x);
    } else {
      throw new Error('Data must be a function or a number.');
    }
    if (y >= 2 * yMax || y <= 2 * yMin || isNaN(y)) {
      y = null;
    }
    dataSet.push({ x, y });
  }
  return dataSet;
}

export function MakeParametricCoordinates(
  xf: Function | number,
  yf: Function | number,
  number_of_samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) {
  let dataSet = [];

  const xMin = domain[0] * Math.PI;
  const xMax = domain[1] * Math.PI;

  const [yMin, yMax] = range;

  const xf_is_function = typeof xf === 'function';

  const xf_is_number = typeof xf === 'number';

  const yf_is_function = typeof yf === 'function';

  const yf_is_number = typeof yf === 'number';

  let datum: any;

  for (let i = -number_of_samples; i < number_of_samples; i++) {
    if (xf_is_function && yf_is_function) {
      let t = ((i * Math.PI) / number_of_samples) * xMax;
      datum = { x: xf(t), y: yf(t) };
    } else if (xf_is_function && yf_is_number) {
      let t = ((i * Math.PI) / number_of_samples) * xMax;
      datum = { x: xf(t), y: yf };
    } else if (yf_is_function && xf_is_number) {
      let t = ((i * Math.PI) / number_of_samples) * xMax;
      datum = { x: xf, y: yf(t) };
    } else {
      throw new Error('Improper parametric function format');
    }
    const y_cond = datum.y >= 2 * yMax || datum.y <= 2 * yMin || isNaN(datum.y);
    const x_cond = datum.x >= 2 * xMax || datum.x <= 2 * xMin || isNaN(datum.x);
    if (y_cond) {
      datum.y = null;
    }
    if (x_cond) {
      datum.x = null;
    }
    dataSet.push(datum);
  }
  return dataSet;
}

export function MakePathCoordinates(
  f: Function | number,
  integral: Function | number,
  upperBound,
  lowerBound,
  number_of_samples: number = 1000,
  domain: [number, number] = [-10, 10],
  range: [number, number] = [-10, 10]
) {
  let dataSet = [];
  let x0: number;
  let x1: number;
  let y0: any;

  let y1: any;

  const yMin = range[0];

  const yMax = range[1];

  let y1_lower_bound = range[0];
  let y1_upper_bound = range[1];

  console.log(upperBound);
  console.log(lowerBound);

  if (typeof integral === 'function') {
    y1_lower_bound = integral(lowerBound);
    y1_upper_bound = integral(upperBound);
  }
  console.log({ y1_upper_bound, y1_lower_bound });

  for (let i = -number_of_samples; i < number_of_samples; i++) {
    if (typeof f === 'number' && typeof integral === 'number') {
      x0 = f;
      x1 = integral;
      y0 = i;
      y1 = i;
    } else if (typeof f === 'function' && typeof integral === 'number') {
      x0 = (i / number_of_samples) * domain[1];
      x1 = integral;
      y0 = f(x0);
      y1 = y0;
    } else if (typeof f === 'number' && typeof integral === 'function') {
      x0 = (i / number_of_samples) * domain[1];
      x1 = (i / number_of_samples) * domain[1];
      y0 = i;
      y1 = integral(x1);
    } else if (typeof f === 'function' && typeof integral === 'function') {
      x0 = (i / number_of_samples) * domain[1];
      x1 = (i / number_of_samples) * domain[1];
      y0 = f(x0);
      y1 = integral(x1);
    } else {
      throw new Error('Data must be a function or a number.');
    }
    if (
      y0 >= 2 * yMax ||
      y0 <= 2 * yMin ||
      isNaN(y0) ||
      y1 >= 2 * yMax ||
      y1 <= 2 * yMin ||
      isNaN(y1)
    ) {
      y0 = null;
      y1 = null;
    }
    if (lowerBound < x1 && x1 < upperBound) {
      dataSet.push({ x0, x1, y0, y1 });
    } else {
      continue;
    }
  }
  return dataSet;
}
