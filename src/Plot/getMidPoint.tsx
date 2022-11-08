export function getMidPoint(point1: [number,number],point2: [number,number]) {
  const x0 = point1[0];
  const y0 = point1[1];
  const x1 = point2[0];
  const y1 = point2[1];
  const dx = x1 + x0;
  const dy = y1 + y0;
  const x = dx / 2;
  const y = dy / 2;
  return {x,y};
}
