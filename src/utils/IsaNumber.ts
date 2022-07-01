export function IsaNumber(datum: any) {
  return !isNaN(datum) && typeof datum === 'number';
}
/**
 * Tests
 */
// const test1 = 2;
// const test2 = '2';
// const test3 = {};

// console.log(IsaNumber(test1));
// console.log(IsaNumber(test2));
// console.log(IsaNumber(test3));
