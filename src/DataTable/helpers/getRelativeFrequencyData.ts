import { getBaseData } from './getBaseData';

export function getRelativeFrequencyData(data, key) {
  let tableData = data;
  let sample_size = tableData.sampleSize;
  let formattedData = tableData.dataset;
  let datavals = formattedData.map((value) => value[key]);
  let frequencymap = {};
  let headings = ['Value', 'Relative Frequency'];
  let dataset = [];
  dataset.push(headings);
  for (let i = 0; i < datavals.length; i++) {
    let current = datavals[i];
    current in frequencymap
      ? (frequencymap[current] += 1)
      : (frequencymap[current] = 1);
  }
  for (let key in frequencymap) {
    let val = frequencymap[key] / sample_size;
    let datum = [key, val];
    dataset.push(datum);
  }
  const outdata = getBaseData(dataset);
  return outdata;
}
