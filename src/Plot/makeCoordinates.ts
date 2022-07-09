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
