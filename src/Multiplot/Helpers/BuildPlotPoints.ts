import { FunctionDatum } from "../../utils";

export function BuildPlotPoints(
  FunctionDatum: FunctionDatum,
  xDomain: [number, number],
  yDomain: [number, number]
) {
  const f = FunctionDatum.f;
  const scale = FunctionDatum.scale ? FunctionDatum.scale : 1;
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
