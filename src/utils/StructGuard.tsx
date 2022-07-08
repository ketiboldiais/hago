export function StructGuard(callback: Function, properties: string[]) {
  return (x: any) => {
    for (let i = 0; i < properties.length; i++) {
      if (callback(x)[properties[i]] === undefined) return false;
    }
    return true;
  };
}

// type foo = { x: number; y: number };

// const x = { x: 1, y: 2 };
// const z = { x: 3, f: 2 };

// const y = StructGuard((datum: any) => datum as foo, ['x', 'y']);

// const n = y(z);
// console.log(n);
