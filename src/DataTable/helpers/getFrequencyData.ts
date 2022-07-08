import { getBaseData } from './getBaseData';
import { getFrequencies } from '../../utils';

export function getFrequencyData(data, key) {
  let formattedData = data.dataset;
  let datavals = formattedData.map((value) => value[key]);
  let headings = ['Value', 'Frequency'];
  let dataset = [];
  dataset.push(headings);
  let frequencymap = getFrequencies(datavals);
  for (let key in frequencymap) {
    let datum = [key, frequencymap[key]];
    dataset.push(datum);
  }
  const outdata = getBaseData(dataset);
  return outdata;
}
