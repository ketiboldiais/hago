export type Literal = string | number | boolean;
export function IsLiteral(datum: any) {
  return (
    typeof datum === 'string' ||
    typeof datum === 'number' ||
    typeof datum === 'boolean'
  );
}

export type Point = { x: number; y: number };
export interface TreeNode {
  child: string | number | boolean;
  parent: string | number | boolean;
  hide?: boolean;
  className?: string;
}

export type AntObject = {
  val: string;
  pos?: string;
  color?: string;
  type?: string;
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
export type GraphNode = Element | Literal;

export type EdgeObject = { source: GraphNode; target: GraphNode };
export function IsAnEdgeObject(datum: any): boolean {
  return (
    (datum as EdgeObject).source !== undefined &&
    (datum as EdgeObject).source !== undefined
  );
}

export type LinkObject = {
  link: [GraphNode, GraphNode];
  name: Element | Literal;
  className: string;
};
export function IsALinkObject(datum: any): boolean {
  return (datum as LinkObject).link !== undefined;
}

export type Edge = [GraphNode, GraphNode] | LinkObject | EdgeObject;

export type EdgeArray = Edge[];
