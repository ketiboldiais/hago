export type AntObject = {
  val: string;
  pos?: string;
  color?: string;
  type?: string;
};
export type Annotation = string | AntObject;

export type Element = { val: string | number; ant: Annotation; class: string };

export type ElementPointer = {
  val: string;
  i: number;
};

export type ElementPointerArray = ElementPointer[];

export type ArrayData = (Element | number | string)[];
export type ElementArray = (Element | number | string)[];

export type Frame = {
  v: string | number;
  class?: string;
  ant?: Annotation;
  popped?: boolean;
};
export type StackData = (Frame | string | number)[];
