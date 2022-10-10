export function getIntersection(
  f1: Function,
  f2: Function,
  domain: [number, number],
  step: number
) {
  const start = domain[0];
  const end = domain[1];

  let intersection: { x: number; y1: number; y2: number };
  let intersection_points: { x: number; y1: number; y2: number }[] = [];
  for (let i = start; i < end; i += step) {
    let x = i;
    let y1 = f1(i);
    let y2 = f2(i);
		let g = y2 - y1;
		if (g === 0) {
			intersection = { x, y1, y2 };
			intersection_points.push(intersection);
		}
  }
  return intersection_points;
}

const f = (x: number) => x ** 2;
const g = (x: number) => x + 2;
const domain: [number, number] = [-2, 3];
const step = 0.2;

const result = getIntersection(f, g, domain, step);
console.log(result);
