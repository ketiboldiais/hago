export function MakePathCoordinates(
  f: Function | number,
  integral: Function | number,
  upperBound: number,
  lowerBound: number,
  number_of_samples: number = 1000,
  domain: [number, number] = [-10, 10]
) {
  let dataSet = [];
  let x0: number;
  let x1: number;
  let y0: number;
  let y1: number;

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
      y0 = 0;
      y1 = integral(x1);
    } else if (typeof f === 'function' && typeof integral === 'function') {
      x0 = (i / number_of_samples) * domain[1];
      x1 = (i / number_of_samples) * domain[1];
      y0 = f(x0);
      y1 = integral(x1);
    } else {
      throw new Error('Data must be a function or a number.');
    }
    if (isNaN(y0) || isNaN(y1)) {
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
