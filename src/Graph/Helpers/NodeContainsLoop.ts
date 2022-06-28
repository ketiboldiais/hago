export function NodeContainsLoop(d) {
  const x1 = d.source.x;
  const y1 = d.source.y;
  const x2 = d.target.x;
  const y2 = d.target.y;
  return x1 === x2 && y1 === y2;
}