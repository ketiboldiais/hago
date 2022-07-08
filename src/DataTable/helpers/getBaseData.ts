import { Tabular } from '../DataTable';

export function getBaseData(arg: Tabular) {
  const [headings, ...rows] = arg;
  let entries = [];
  let sampleSize = arg.length - 1;
  for (let i = 0; i < rows.length; i++) {
    let current = rows[i] as string[] | number[];
    let datum = [];
    for (let j = 0; j < current.length; j++) {
      let entry = current[j];
      let el = [headings[j], entry];
      datum.push(el);
    }
    entries.push(datum);
  }
  let dataset = [];
  for (let i = 0; i < entries.length; i++) {
    let n = Object.fromEntries(entries[i]);
    dataset.push(n);
  }
  return {
    headings,
    rows,
    dataset,
    sampleSize,
  };
}
