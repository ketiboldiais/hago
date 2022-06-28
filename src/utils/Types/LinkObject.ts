export type LinkObject = {
  link: [string | number, string | number];
  name?: string | number;
  className?: string;
};
export function IsALinkObject(datum: any): boolean {
  return (datum as LinkObject).link !== undefined;
}
