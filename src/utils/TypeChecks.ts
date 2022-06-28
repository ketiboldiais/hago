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
