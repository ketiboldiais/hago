type HagoElement = {
  val: string | number;
  id?: string | number;
  group?: string | number;
  class?: string;
};

type HashDatum = (number | string)[];
type HashData = HashDatum[] | HagoElement[];

function BuildHashData(data: HashData) {
  let datum: HagoElement;
  let groups: { x: number; y: number }[] = [];
  let outputData: HagoElement[] = [];
  for (let i = 0; i < data.length; i++) {
    let current = data[i] as HashDatum;
    groups.push({ x: 0, y: i });
    if (current.length === 0) {
      datum = { val: '', group: i };
      outputData.push(datum);
    }
    for (let j = 0; j < current.length; j++) {
      datum = { val: data[i][j], group: i };
      outputData.push(datum);
    }
  }
  return {
    keys: groups,
    values: outputData,
  };
}
