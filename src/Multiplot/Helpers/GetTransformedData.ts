import { GetHeights } from './GetHeights';
import { TransformPoint } from './TransformPoint';

export function getTransformedData(
  datum = [],
  displayWidth: number,
  yaw: number,
  pitch: number
) {
  let data = datum;
  let output = [];
  let t = [];
  let heights = GetHeights(datum);
  let xLength = data.length;
  let yLength = data[0].length;
  for (let x = 0; x < xLength; x++) {
    output.push((t = []));
    for (let y = 0; y < yLength; y++) {
      t.push(
        TransformPoint(
          [
            ((x - xLength / 2) / xLength) * displayWidth,
            heights[x][y],
            ((y - yLength / 2) / yLength) * displayWidth,
          ],
          yaw,
          pitch
        )
      );
    }
  }
  return output;
}
