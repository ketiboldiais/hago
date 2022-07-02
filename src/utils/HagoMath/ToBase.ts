export function ToBinary(val: number, bits?: number) {
  let remainder = val % 2;
  let quotient = val >> 1;
  let stringRemainder = `${remainder}`;
  let remainders = [stringRemainder];
  while (quotient !== 0) {
    remainder = quotient % 2;
    quotient = quotient >> 1;
    stringRemainder = `${remainder}`;
    remainders.push(stringRemainder);
  }
  const remaindersCount = remainders.length - 1;
  let result = '';
  if (bits && bits > remaindersCount) {
    bits = bits - remaindersCount;
    result = fillSpace(bits, result);
  }
  for (let i = remaindersCount; i >= 0; i--) {
    result += remainders[i];
  }
  return result;
}

export function ToHex(val: number, bits?: number) {
  let remainder = val % 16;
  let quotient = val >> 4;
  let stringRemainder = ReplaceWithHexCharacter(remainder);
  let remainders = [stringRemainder];
  while (quotient > 0) {
    remainder = quotient % 16;
    quotient = quotient >> 4;
    if (remainder > 9 && remainder < 16) {
      stringRemainder = ReplaceWithHexCharacter(remainder);
    } else {
      stringRemainder = `${remainder}`;
    }
    remainders.push(stringRemainder);
  }
  const remaindersCount = remainders.length;
  let result = '0×';
  if (bits && bits > remaindersCount) {
    let spaces = bits - remaindersCount;
    result = fillSpace(spaces, result);
  }
  for (let i = remaindersCount - 1; i >= 0; i--) {
    result += remainders[i];
  }
  return result;
}

function fillSpace(spaces: number, str: string) {
  for (let i = 0; i < spaces; i++) {
    str += '0';
  }
  return str;
}

function ReplaceWithHexCharacter(datum: number) {
  switch (datum) {
    case 10:
      return 'A';
    case 11:
      return 'B';
    case 12:
      return 'C';
    case 13:
      return 'D';
    case 14:
      return 'E';
    case 15:
      return 'F';
    default:
      return `${datum}`;
  }
}
