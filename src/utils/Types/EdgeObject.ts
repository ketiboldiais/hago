// edge types
export type EdgeObject = {
  source: string | number;
  target: string | number;
  name?: string;
  weight?: number;
  className?: string;
};
export function IsAnEdgeObject(datum: any): boolean {
  return (
    (datum as EdgeObject).source !== undefined &&
    (datum as EdgeObject).source !== undefined
  );
}
