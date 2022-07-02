export function IsDefined(testSubject: any): boolean {
  return typeof testSubject !== 'undefined';
}
export function IsUndefined(testSubject: any): boolean {
  return typeof testSubject === 'undefined';
}
export function IsNonNull(testSubject: any): boolean {
  return testSubject !== null;
}
export function IsNull(testSubject: any): boolean {
  return testSubject === null;
}
export function IsaString(datum: any) {
  return typeof datum === 'string';
}
export const isObjectLiteral = (expression: any) => {
  let testCase = expression;

  const case1 = typeof expression !== 'object' || expression === null;

  const case2 = () =>
    Object.getPrototypeOf((testCase = Object.getPrototypeOf(testCase))) ===
    null;

  return case1
    ? false
    : (() => {
        while (!false) {
          if (case2()) break;
        }
        return Object.getPrototypeOf(expression) === testCase;
      })();
};
export function IsAFunction(datum: any) {
  return datum.constructor === Function;
}
export function IsaNumber(datum: any) {
  return !isNaN(datum) && typeof datum === 'number';
}
export function IsAnArray(datum: any) {
  return datum.constructor === Array;
}
