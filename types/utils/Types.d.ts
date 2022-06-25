export declare type Literal = string | number | boolean;
export declare function IsLiteral(datum: any): boolean;
export declare type Point = {
    x: number;
    y: number;
};
export interface TreeNode {
    child: string | number | boolean;
    parent: string | number | boolean;
    hide?: boolean;
    className?: string;
}
export declare type AntObject = {
    val: string;
    pos?: string;
    color?: string;
    type?: string;
};
export declare type Annotation = string | AntObject;
export declare type Element = {
    val: string | number;
    id?: string | number;
    ant?: Annotation;
    class?: string;
};
export declare function isElement(datum: any): boolean;
export declare type ElementPointer = {
    val: string;
    i: number;
};
export declare type ElementPointerArray = ElementPointer[];
export declare type ArrayData = (Element | number | string)[] | string;
export declare type ElementArray = (Element | number | string)[];
export declare type Frame = {
    v: string | number;
    class?: string;
    ant?: Annotation;
    popped?: boolean;
};
export declare type StackData = (Frame | string | number)[];
export declare type GraphNode = Element | Literal;
export declare type EdgeObject = {
    source: GraphNode;
    target: GraphNode;
};
export declare function IsAnEdgeObject(datum: any): boolean;
export declare type LinkObject = {
    link: [GraphNode, GraphNode];
    name: Element | Literal;
    className: string;
};
export declare function IsALinkObject(datum: any): boolean;
export declare type Edge = [GraphNode, GraphNode] | LinkObject | EdgeObject;
export declare type EdgeArray = Edge[];
