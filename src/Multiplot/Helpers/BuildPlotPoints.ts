import { FunctionElement } from '../../utils';

export function BuildPlotPoints(
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
