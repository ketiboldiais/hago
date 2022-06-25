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
