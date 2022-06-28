import { hsl } from 'd3-color';

export function BuildColor(d: number) {
  const c = hsl(d + 80, 0.7, 0.5).rgb();
  const red = c.r;
  const green = c.g;
  const blue = c.b;
  return `rgb(${red}, ${green}, ${blue})`;
}
