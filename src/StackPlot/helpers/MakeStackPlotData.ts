import {
  ReturnLarger,
  ReturnSmaller,
  NamedPoint,
  StackPlotData,
  IsANamedPoint,
} from '../../utils';

export function MakeStackPlotData(data: StackPlotData) {
  let points: NamedPoint[] = [];
  let xMax = 0;
  let xMin = 0;
  let yMin = 0;
  let yMax = 0;

  for (let i = 0; i < data.length; i++) {
    /**
     * Handle the case where the data passed is a point
     * {x: number, y: number, className: string}
     */
    if (IsANamedPoint(data[i])) {
      points.push(data[i] as NamedPoint);
    } else if (data.constructor === Array && typeof data[i][0] === 'string') {
      /**
       * Handle the case where data is string[][]
       */
      // handle
      for (let j = 0; j < (data[i] as Array<string>).length; j++) {
        yMin = ReturnSmaller(yMin, j);
        yMax = ReturnLarger(yMax, j);
        let frame: NamedPoint = { x: i, y: j, id: data[i][j] };
        points.push(frame);
      }
    } else if (data.constructor === Array && typeof data[0] === 'number') {
      /**
       * Handle the case where data is number[]
       */
      // handle
      for (let j = 0; j < data[i]; j++) {
        yMin = ReturnSmaller(yMin, j);
        yMax = ReturnLarger(yMax, j);
        let frame: NamedPoint = { x: i, y: j, id: '' };
        points.push(frame);
      }
    } else {
      /**
       * If none of the case above apply, then data format is incorrect
       */
      throw new Error('Improperly formatted data.');
    }
    xMin = ReturnSmaller(xMin, i);
    xMax = ReturnLarger(xMax, i);
  }

  return { points, xMax, xMin, yMin, yMax };
}
