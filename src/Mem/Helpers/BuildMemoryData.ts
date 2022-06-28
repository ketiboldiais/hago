import {
  RegisterArray,
  MemoryElement,
  RegisterObject,
  IsRegisterObject,
  isElement,
  ToHex,
  Literal,
  IsLiteral,
} from '../../utils';

export function BuildMemoryData(
  data: RegisterArray,
  startAddressAt: number = 1,
  addressLength: number = 4,
  dataSize: number = 1
) {
  let formattedData: RegisterArray = [];
  const vdots = /vdots[0-9]+/;
  let addr = startAddressAt;

  for (let i = 0; i < data.length; i++) {
    addr = BuildRegisterObject(
      data,
      i,
      vdots,
      addr,
      formattedData,
      addressLength,
      dataSize
    );
  }
  return formattedData;
}

function BuildRegisterObject(
  data: RegisterArray,
  i: number,
  vdots: RegExp,
  addr: number,
  formattedData: (RegisterObject | MemoryElement | Literal)[],
  addressLength: number,
  dataSize: number
) {
  if (typeof data[i] === 'string' && vdots.test(data[i] as string)) {
    let n = parseInt(/[0-9]+/.exec(data[i] as string)[0]);
    let placeholder = { a: '⋮', val: '⋮', display: 'none' };
    addr = addr + n - 1;
    formattedData.push(placeholder as MemoryElement);
  } else if (IsRegisterObject(data[i])) {
    formattedData.push(data[i]);
    addr += (data[i] as RegisterObject).s;
  } else if (isElement(data[i])) {
    let dataElement = {
      a: ToHex(addr, addressLength),
      val: (data[i] as MemoryElement).val,
      id: (data[i] as MemoryElement).id ? (data[i] as MemoryElement).id : '',
      className: (data[i] as MemoryElement).className
        ? (data[i] as MemoryElement).className
        : 'memory_cell',
      s: (data[i] as MemoryElement).s ? (data[i] as MemoryElement).s : dataSize,
      display: 'block',
    };
    formattedData.push(dataElement as MemoryElement);
    addr += dataElement.s;
  } else if (IsLiteral(data[i])) {
    let literalElement = {
      a: ToHex(addr, addressLength),
      val: data[i] as Literal,
      s: dataSize,
      display: 'block',
    };
    formattedData.push(literalElement as MemoryElement);
    addr += literalElement.s;
  } else {
    throw new Error('Invalid data input.');
  }
  return addr;
}
