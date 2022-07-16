export function MakeCoordinates(
  f: Function | number,
  number_of_samples: number = 2000,
  domain,
  range
) {
  let dataSet = [];
  let x: number;
  let y: any;

  const fisFunc = typeof f === 'function';
  const fisNum = typeof f === 'number';

  let minY = range[0] * 2;
  let maxY = range[1] * 2;

  const xMax = domain[1];
  for (let i = -number_of_samples; i < number_of_samples; i++) {
    if (fisNum) {
      x = f;
      y = i;
    } else if (fisFunc) {
      x = (i / number_of_samples) * xMax;
      y = f(x);
    } else {
      throw new Error('Data must be a function or a number.');
    }
    if (isNaN(y) || y <= minY || y >= maxY) {
      y = null;
    }
    if (x < domain[0] || domain[1] < x) {
      continue;
    } else {
      dataSet.push({ x, y });
    }
  }
  return dataSet;
}

export function MakeParametricCoordinates(
  xf: Function | number,
  yf: Function | number,
  number_of_samples: number = 1000,
  domain: [number, number] = [-10, 10]
) {
  let dataSet = [];

  const xMax = domain[1] * Math.PI;

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
    const y_cond = isNaN(datum.y);
    const x_cond = isNaN(datum.x);
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
