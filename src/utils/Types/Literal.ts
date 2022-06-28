/**
 * @type { Literal } a string, number, or boolean value.
 */
export type Literal = string | number | boolean;

/**
 * Checks whether `datum` is a literal value
 * @returns boolean
 */
export function IsLiteral(datum: any): boolean {
  return (
    typeof datum === 'string' ||
    typeof datum === 'number' ||
    typeof datum === 'boolean'
  );
}
