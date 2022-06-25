import { IsDefined } from './TypeChecks';

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

/**
 * @type { Point } an object {x: n, y: n}, where n is a number type value
 */
export type Point = { x: number; y: number };

/**
 * Checks whether the argument `datum` is of type Point
 */
export function IsAPoint(datum: any): boolean {
  return IsDefined((datum as Point).x) && IsDefined((datum as Point).y);
}

/**
 * All `<Tree/>` components consist of TreeNodes.
 * Each TreeNode maps to a`<g/>`, and is either a
 * child, parent, or both.
 */
export interface TreeNode {
  child: string | number | boolean;
  parent: string | number | boolean;
  /**
   * Optional - Sets whether the tree node is visible.
   */
  hide?: boolean;
  /**
   * Optional - The value initializing the class attribute
   * for the <g/> created for the TreeNode.
   */
  className?: string;
}

/**
 * The AntObject is used for annotations.
 */
export type AntObject = {
  /**
   * The value of the annotation text
   * to render.
   */
  val: string;
  /**
   * The position of the annotation.
   */
  pos?: string;
  /**
   * The color the annotation text.
   */
  color?: string;
  /**
   * The type of the annotation text.
   */
  type?: string;
  /**
   * Initializes the class attribute for
   * the AntObject's resulting
   * `<g/>`.
   */
  className?: string;
};

export type Annotation = string | AntObject;

export type Element = {
  val: string | number;
  id?: string | number;
  ant?: Annotation;
  class?: string;
};

export function isElement(datum: any) {
  return (datum as Element).val !== undefined;
}

export type ElementPointer = {
  val: string;
  i: number;
};

export type ElementPointerArray = ElementPointer[];

export type ArrayData = (Element | number | string)[] | string;

export type ElementArray = (Element | number | string)[];

export type Frame = {
  v: string | number;
  class?: string;
  ant?: Annotation;
  popped?: boolean;
};

export type StackData = (Frame | string | number)[];

// Graph Types

// node types

export interface FunctionElement {
  f: Function;
  scale?: number;
  color?: string;
}
export function IsAFunctionElement(datum: any): boolean {
  return IsDefined((datum as FunctionElement).f);
}

export interface SequenceFunction extends FunctionElement {
  start?: number;
  end?: number;
}

export type SequenceData = number[][] | SequenceFunction[] | Function;
