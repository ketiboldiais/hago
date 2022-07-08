import { Tabular } from '../DataTable';

export function formatTabularData(arg: Tabular) {
  if (Array.isArray(arg[0])) {
    return arg;
  } else {
    let formattedData: (string | number)[][] = [['x', 'y']];
    for (let i = 0; i < arg.length; i++) {
      let datum = [`${i}`, arg[i] as number];
      formattedData.push(datum as (string | number)[]);
    }
    return formattedData;
  }
}
