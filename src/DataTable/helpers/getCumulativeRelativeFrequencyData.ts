import { getBaseData } from './getBaseData';
import { getCumulativeRelativeFrequencies } from '../../utils';

export function getCumulativeRelativeFrequencyData(data, key) {
  let formattedData = data.dataset;
  let datavals = formattedData.map((value) => value[key]);
  let headings = ['Value', 'Cumulative Relative Frequency'];
  let dataset = [];
  dataset.push(headings);
  let frequencymap = getCumulativeRelativeFrequencies(datavals);
  for (let key in frequencymap) {
    let datum = [key, frequencymap[key]];
    dataset.push(datum);
  }
  const outdata = getBaseData(dataset);
  return outdata;
}
