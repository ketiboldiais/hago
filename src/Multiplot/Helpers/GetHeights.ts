function heightFunction(d: any) {
  return [d];
}

export function GetHeights(datum: any[]) {
  let data = datum;
  let output = [];
  let xLength = data.length;
  let yLength = data[0].length;
  let t: any[];
  let value: any[];
  for (let x = 0; x < xLength; x++) {
    output.push((t = []));
    for (let y = 0; y < yLength; y++) {
      value = heightFunction(data[x][y]);
      t.push(value);
    }
  }
  return output;
}
