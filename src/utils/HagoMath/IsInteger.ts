export function IsInteger(val: number) {
  if (isNaN(val)) return false;
  let x = parseFloat(`${val}`);
  return (x | 0) === x;
}

const n = IsInteger(2);
n
