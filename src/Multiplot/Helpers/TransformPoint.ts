export function TransformPoint(point: any[], yaw: number, pitch: number) {
  let newPoint = [];
  let cosA = Math.cos(pitch);
  let sinA = Math.sin(pitch);
  let cosB = Math.cos(yaw);
  let sinB = Math.sin(yaw);
  newPoint[0] = cosB;
  newPoint[1] = 0;
  newPoint[2] = sinB;
  newPoint[3] = sinA * sinB;
  newPoint[4] = cosA;
  newPoint[5] = -sinA * cosB;
  newPoint[6] = -sinB * cosA;
  newPoint[7] = sinA;
  newPoint[8] = cosA * cosB;
  let x =
    newPoint[0] * point[0] + newPoint[1] * point[1] + newPoint[2] * point[2];
  let y =
    newPoint[3] * point[0] + newPoint[4] * point[1] + newPoint[5] * point[2];
  let z =
    newPoint[6] * point[0] + newPoint[7] * point[1] + newPoint[8] * point[2];
  return [x, y, z];
}
