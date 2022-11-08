import { NodeContainsLoop } from "./NodeContainsLoop";

export function BuildPath(d: any) {
  let x1 = d.source.x;
  let y1 = d.source.y;
  let x2 = d.target.x;
  let y2 = d.target.y;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dr = Math.sqrt(dx * dx + dy * dy);
  // Set the defaults for a normal edge
  let drx = dr;
  let dry = dr;
  let xRotation = 1; // units are in degrees
  let largeArc = 0; // edge arc value (1 or 0)
  let sweep = 1; // edge sweep value (1 or 0)

  // Self edge.
  if (NodeContainsLoop(d)) {
    // Angle for orienting the loop.
    xRotation = -45;
    // This value must stay as 1
    largeArc = 1;
    // Change sweep to change orientation of loop.
    // sweep = 0;
    // Making drx and dry different yields an ellipse
    // rather than a circle.
    drx = 12;
    dry = 12;
    x2 = x2 + 1;
    y2 = y2 + 1;
  }

  return `M${x1},${y1}A${drx},${dry} ${xRotation},${largeArc},${sweep} ${x2},${y2}`;
}