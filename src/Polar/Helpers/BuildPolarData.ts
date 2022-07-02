import { range } from 'd3';
import { FunctionDatum } from '../../utils';

export function BuildPolarData(_domain: number[], _f: FunctionDatum) {
  const f = _f.f;
  let points = [];
  range(_domain[0], _domain[1], 0.01).map((t) => {
    let p = [t, f(t)];
    points.push(p);
  });
  return points;
}
