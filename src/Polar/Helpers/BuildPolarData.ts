import { FunctionElement } from '../../utils';
import { range } from 'd3';

export function BuildPolarData(_domain: number[], _f: FunctionElement) {
  const f = _f.f;
  let points = [];
  range(_domain[0], _domain[1], 0.01).map((t) => {
    let p = [t, f(t)];
    points.push(p);
  });
  return points;
}
