export function MakePathCoordinates(
  curve1X: Function,
  curve1Y: Function | number,
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

  const integralIsFunc = typeof integral === 'function';
  const integralIsNum = typeof integral === 'number';
  const curve1YIsFunc = typeof curve1Y === 'function';
  const curve1YIsNum = typeof curve1Y === 'number';

  for (let i = -number_of_samples; i < number_of_samples; i++) {
    let n = (i / number_of_samples) * domain[1];
    if (typeof curve1Y === 'number' && typeof integral === 'number') {
      x0 = curve1Y;
      x1 = integral;
      y0 = i;
      y1 = i;
    } else {
      if (curve1YIsFunc && integralIsNum) {
        x0 = curve1X(n);
        x1 = integral;
        y0 = (curve1Y as Function)(x0);
        y1 = y0;
      } else if (curve1YIsNum && integralIsFunc) {
        x0 = n;
        x1 = n;
        y0 = 0;
        y1 = integral(x1);
      } else if (curve1YIsFunc && integralIsFunc) {
        x0 = curve1X(n);
        x1 = n;
        y0 = curve1Y(n);
        y1 = integral(n);
      } else {
        throw new Error('Data must be a function or a number.');
      }
    }
    if (isNaN(y0) || isNaN(y1)) {
      y0 = null;
      y1 = null;
    }
    if (lowerBound < n && n < upperBound) {
      dataSet.push({ x0, x1, y0, y1 });
    } else {
      continue;
    }
  }
  return dataSet;
}
