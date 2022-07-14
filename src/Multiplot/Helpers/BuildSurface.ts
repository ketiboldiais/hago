import { getTransformedData } from './GetTransformedData';

export function BuildSurface(
  dataVals: any[],
  displayWidth: number,
  displayHeight: number,
  yaw: number,
  pitch: number
) {
  let originalData = dataVals;
  let data = getTransformedData(dataVals, displayWidth, yaw, pitch);
  let xLength = data.length;
  let yLength = data[0].length;
  const halfWidth = displayWidth / 2;
  const halfHeight = displayHeight / 2;
  let dProps = [];
  let depth: number;
  let x: number, y: number;
  let M1: number,
    M2: number,
    L1: number,
    L2: number,
    L3: number,
    L4: number,
    L5: number,
    L6: number;
  let path: string;
  for (x = 0; x < xLength - 1; x++) {
    for (y = 0; y < yLength - 1; y++) {
      depth =
        data[x][y][2] +
        data[x + 1][y][2] +
        data[x + 1][y + 1][2] +
        data[x][y + 1][2];
      M1 = (data[x][y][0] + halfWidth).toFixed(10);
      M2 = (data[x][y][1] + halfHeight).toFixed(10);
      L1 = (data[x + 1][y][0] + halfWidth).toFixed(10);
      L2 = (data[x + 1][y][1] + halfHeight).toFixed(10);
      L3 = (data[x + 1][y + 1][0] + halfWidth).toFixed(10);
      L4 = (data[x + 1][y + 1][1] + halfHeight).toFixed(10);
      L5 = (data[x][y + 1][0] + halfWidth).toFixed(10);
      L6 = (data[x][y + 1][1] + halfHeight).toFixed(10);
      path = `M ${M1},${M2} L${L1},${L2}, L${L3},${L4} L${L5},${L6} Z`;
      dProps.push({ path, depth, data: originalData[x][y] });
    }
  }
  dProps.sort((a, b) => b.depth - a.depth);
  return dProps;
}
