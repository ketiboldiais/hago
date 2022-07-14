export function StructGuard(callback: Function, properties: string[]) {
  return (x: any) => {
    for (let i = 0; i < properties.length; i++) {
      if (callback(x)[properties[i]] === undefined) return false;
    }
    return true;
  };
}