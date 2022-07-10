import { IsAnArray, IsaNumber, IsDefined } from './TypeChecks';
import { ReactNode } from 'react';

/**
 * @public BaseProps
 * The underlying interface for
 * all Hago components.
 */
export interface BaseProps {
  /**
   * A unique identifier for the diagram.
   */
  id?: string;
  /**
   * An optional string value to set the
   * the diagram container (a DIV element)'s
   * class attribute.
   */
  className?: string;
  /**
   * Scales the diagram in percentage (%)
   * units.
   */
  scale?: number;
  /**
   * Sets the width of the SVG
   * element.
   */
  width?: number;
  /**
   * Sets the height of the SVG
   * element.
   */
  height?: number;
  /**
   * Scales the DIV container's
   * width in (%) units.
   */
  cwidth?: number;
  /**
   * Scales the DIV container's height
   * in (%) units.
   */
  cheight?: number;
  /**
   * Sets the SVG's top-margin
   * from the DIV container.
   */
  marginTop?: number;
  /**
   * Sets the SVG's right-margin
   * from the DIV container.
   */
  marginRight?: number;
  /**
   * Sets the SVG's bottom-margin
   * from the DIV container.
   */
  marginBottom?: number;
  /**
   * Sets the SVG's left-margin
   * from the DIV container.
   */
  marginLeft?: number;
  /**
   * Sets marginTop, marginRight,
   * marginBottom, and marginLeft
   * all at once.
   */
  margins?: [number, number, number, number];
  /**
   * Sets the font size
   */
  fontSize?: number;
}

/**
 * @public
 */
export type Annotation = string | AntObject;

/**
 * @internal
 * The datatype for the `StaticArray` data prop.
 */
export type ArrayData = (Datum | number | string)[] | string;

// @internal
export interface AxisProps {
  domain: number[];
  range: number[];
  tickSep: number;
  markerStart?: string;
  markerEnd?: string;
  dx?: number;
  dy?: number;
  tx?: number;
  ty?: number;
  offsetTick?: number;
  removeEndTicks?: boolean;
  textAnchor?: 'start' | 'middle' | 'end';
  axisLabelArray?: (string | number)[];
  fitContent?: boolean;
  latex?: boolean;
  fontsize?: number;
}

/**
 * @public
 */
export type BinaryTreeNode = [
  TreeNode | Literal,
  [TreeNode | Literal, TreeNode | Literal]
];

/**
 * @public
 */
export function IsBinaryTreeNode(datum: any): boolean {
  return Array.isArray(datum) && Array.isArray(datum[0][1]);
}

/**
 * @public
 */
export interface BoardProps {
  className: string;
  width: number;
  height: number;
  cwidth: number;
  cheight: number;
  margins: number[];
  children?: ReactNode;
}

/**
 * @public
 */
export type Edge = (string | number)[] | LinkObject | EdgeObject;

/**
 * @public
 * edge array type
 */
export type EdgeArray = ((string | number)[] | LinkObject | EdgeObject)[];

/**
 * @internal
 * Type checks if an object is an edge object.
 */
export function IsAnEdgeObject(datum: any): boolean {
  return (
    (datum as EdgeObject).source !== undefined &&
    (datum as EdgeObject).source !== undefined
  );
}

/**
 * @internal
 * Checks if a user input is a datum
 */
export function IsaDatum(datum: any) {
  return (datum as Datum).val !== undefined;
}

/**
 * @public
 * An array of Datum object.
 */
export type DatumArray = (Datum | number | string)[];

/**
 * @public
 * Used for the pointer array passed to a `StaticArray`
 */
export type DatumPointerArray = DatumPointer[];

/**
 * @public
 */
export interface FrameProps {
  width: number;
  height: number;
  stroke: string;
  fill: string;
  className?: string;
  position?: { x: number; y: number };
}

/**
 * @public
 */
export function IsaFunctionDatum(datum: any): boolean {
  return IsDefined((datum as FunctionDatum).f);
}
/**
 * @public GraphProps
 * The props used in the `Graph` component.
 * `GraphProps` inherits all the properties
 * in `BaseProps`.
 */

/**
 * @public
 */
export interface GraphProps extends BaseProps {
  /**
   * @public data
   * Takes an array of edges. Either an array of strings
   * or numbers:
   *
   * ["a", "b", "c"]
   *
   * or an array of edge objects:
   *
   * [
   *   {source: "a", target: "b"},
   *   {source: "b", target: "c"},
   * ]
   */
  data: EdgeArray;
  /**
   * @public id
   * A unique id for the diagram. For faster rendering,
   * supply an id. Otherwise, hago will generate a unique id
   * using date.now().
   */
  id?: string;
  /**
   * @public className
   * Supply a class name for the entire diagram.
   * The default name is `hago_graph`.
   */
  className?: string;
  /**
   * @public radius
   * Sets the radius for each node in the graph.
   */
  radius?: number;
  /**
   * @public link
   * Takes either `'line'` or `'path'`. Sets
   * whether the edges between the nodes are rendered
   * as SVG line Datums or SVG path Datums.
   */
  link?: 'line' | 'path';
  /**
   * @public straightEdge
   * Determines whether the edges should be rendered
   * as straight lines.
   */
  straightEdge?: boolean;
  /**
   * @public textOffsetX
   * Sets how much the node text should be offset along
   * the x-axis.
   */
  textOffsetX?: number;
  /**
   * @public textOffsetY
   * Sets how much the node text should be offset along
   * the y-axis.
   */
  textOffsetY?: number;
  /**
   * @public isDirected
   * Sets whether to render arrow heads on the edges.
   * If true, arrow heads are rendered, otherwise, no arrow heads
   * are rendered. This translates to whether the graph is
   * directed or undirected.
   */
  isDirected?: boolean;
  /**
   * @public edgeLength
   * Sets the length of the edges.
   */
  edgeLength?: number;
  /**
   * @public fontSize
   * Sets the font size for the node text.
   */
  fontSize?: number;
  /**
   * @public repulsion
   * Sets how much the graph's nodes "push"
   * each other away.
   */
  repulsion?: number;
  /**
   * @public blast
   * Sets the radial boundaries for each of the graph nodes.
   */
  blast?: number;
}

/**
 * @public
 */
export interface LinkedListProps extends BaseProps {
  data: DatumArray;
  isIndexed?: boolean;
}

/**
 * @public
 */
export type LinkObject = {
  link: [string | number, string | number];
  name?: string | number;
  className?: string;
};

/**
 * @public
 */
export function IsALinkObject(datum: any): boolean {
  return (datum as LinkObject).link !== undefined;
}
/**
 * @public
 * a string, number, or boolean value.
 */
export type Literal = string | number | boolean;

/**
 * @public
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
 * @public
 */
export interface MemProps extends BaseProps {
  data: RegisterArray;
  cellWidth?: number;
  cellHeight?: number;
  dataSize?: number;
  endian?: 'big' | 'little';
  startAddressAt?: number;
  addressLength?: number;
}

/**
 * @public
 */
export interface MultiplotProps {
  data: FunctionDatum[];
  id: string;
  width?: number;
  height?: number;
  scale?: number;
  cwidth?: number;
  cheight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: [number, number, number, number];
  yaw?: number;
  pitch?: number;
  helpers?: boolean;
  xDomain?: [number, number];
  yDomain?: [number, number];
  zRange?: [number, number];
  renderXAxis?: boolean;
  renderYAxis?: boolean;
  renderZAxis?: boolean;
  xTickCount?: number;
  yTickCount?: number;
  zTickCount?: number;
}

/**
 * @public
 */
export type NamedPoint = {
  x: number;
  y: number;
  id?: string;
  group?: string | number;
};

/**
 * @public
 */
export function IsANamedPoint(datum: any) {
  return IsDefined((datum as NamedPoint).y);
}

/**
 * @public
 */
export type NodeObject = {
  id: string | number;
  className?: string;
  r?: number;
  ant?: AntObject;
};

/**
 * @public
 */
export interface PlotProps extends BaseProps {
  data?: (FunctionDatum | ParametricFunctionDatum)[];
  domain?: [number, number];
  range?: [number, number];
  ticks?: number;
  xTicks?: number;
  yTicks?: number;
  samples?: number;
  className?: string;
  id?: string;
}

/**
 * @public
 * @type
 * an object {x: n, y: n}, where n is a number type value
 */
export type Point = { x: number; y: number; className?: string };

/**
 * @public
 * Checks whether the argument `datum` is of type Point
 */
export function IsAPoint(datum: any): boolean {
  return IsDefined((datum as Point).x) && IsDefined((datum as Point).y);
}

/**
 * @public
 */
export interface PolarProps extends BaseProps {
  data: FunctionDatum[];
  radius?: number;
  domain?: number[];
  range?: number[];
  className: string;
}

/**
 * @public
 */
export interface QueueProps extends BaseProps {
  data: ArrayData;
  pointers: DatumPointerArray;
  reverseIndex?: boolean;
  fontSize?: number;
  startIndex?: number;
}

/**
 * @public
 */
export type RegisterArray = (RegisterObject | MemoryDatum | Literal)[] | string;

/**
 * @public
 */
export type RegisterObject = {
  val: MemoryDatum | string | number | boolean;
  a?: string | number;
  id?: string;
  s?: number;
  className?: string;
  display?: 'block' | 'none';
};

/**
 * @public
 */
export function IsRegisterObject(datum: any) {
  return IsDefined(
    (datum as RegisterObject).a && IsDefined((datum as RegisterObject).val)
  );
}

/**
 * @public
 */
export type SequenceData = number[][] | SequenceFunction[] | Function;

/**
 * @public
 */
export interface SequenceProps extends BaseProps {
  data: SequenceData;
  /**
   * Sets the radius for the circles representing the
   * plot points.
   */
  r?: number;
  /**
   * Sets the start index for the sequence.
   * I.e., the sequence's lower bound for n.
   * By default, 5.
   */
  start?: number;
  /**
   * Sets the terminating index for the sequence.
   * I.e., the sequence's upper bound for n.
   * By default, 0.
   */
  end?: number;
  /**
   * If true, removes the end ticks on both the
   * x-axis and y-axis.
   * Otherwise, the end ticks are left on both axes.
   * The default value is false.
   * By default, 20.
   */
  removeEndTicks?: boolean;
  /**
   * If true, removes the end ticks on the x-axis.
   * Otherwise, the end ticks are left on the x-axis.
   * The default value is `removeEndTicks`.
   */
  removeEndTickX?: boolean;
  /**
   * If true, removes the end ticks on the y-axis,
   * Otherwise the end ticks are left on the y-axis.
   * The default value is `removeEndTicks`.
   */
  removeEndTickY?: boolean;
  /**
   * If true, renders a line connecting
   * a circle plot point to its corresponding
   * index (this can help the plot's readability).
   * Otherwise, no such line is rendered.
   * The default value is `true`.
   */
  renderLolly?: boolean;
  /**
   * The amount of seperation between each
   * tick along the axes.
   */
  tickSep?: number;
}

/**
 * @public
 */
export type StackData = (Frame | string | number)[];

/**
 * @public
 */
export interface StackProps extends BaseProps {
  data: StackData;
  scale?: number;
  fwidth?: number;
  fheight?: number;
}

/**
 * @public
 */
export type StackPlotData = string[][] | number[] | NamedPoint[];

/**
 * @public StackPlotProps
 * The `<StackPlot/>` component's
 * interface.
 */
export interface StackPlotProps extends BaseProps {
  /**
   * An array of stack frames.
   */
  data: StackPlotData;
  /**
   * An optional class name to
   * target the diagram.
   */
  className?: string;
  /**
   * An array of axis labels.
   */
  axisGroups?: (string | number)[];
}

/**
 * @public
 */
export interface StaticArrayProps extends BaseProps {
  data: ArrayData;
  pointers: DatumPointerArray;
  reverseIndex?: boolean;
  startIndex?: number;
}
/**
 * All `<Tree/>` components consist of TreeNodes.
 * Each TreeNode maps to a`<g/>`, and is either a
 * child, parent, or both.
 */

/**
 * @public
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
 * @public
 */
export interface TreeProps extends BaseProps {
  data: TreeNode[] | [Literal, Literal][] | BinaryTreeNode;
  nodes?: TreeNode[];
  nodeFontSize?: number;
  nodeRadius?: number;
  slim?: number;
  edgeLength?: number;
  markHeight?: boolean;
  markDepth?: boolean;
  markLevels?: boolean;
  markHeightBF?: boolean;
  heightStartsAt?: number;
}

export type HashDatum = (number | string)[];
export type HashData = HashDatum[] | Datum[];
export interface HashTableProps extends BaseProps {
  data: HashData;
  fontsize?: number;
  padding?: number;
}
export type JaggedArrayData = Datum[][] | Literal[][];

export interface JaggedArrayProps extends BaseProps {
  data: JaggedArrayData;
  padding?: number;
}
export type MatrixData = Datum[][] | Literal[][];
export interface MatrixProps extends BaseProps {
  data: MatrixData;
  order?: 'row' | 'col';
}
export type ScatterData = ScatterDatumObject[] | TupleXY[] | TupleXY[][];

export interface ScatterProps extends BaseProps {
  data: ScatterData;
  regression?: Regression;
  r?: number;
  start?: number;
  end?: number;
  tickSep?: number;
  removeEndTicks?: boolean;
  removeEndTickX?: boolean;
  removeEndTickY?: boolean;
}
export type ScatterDatumObject = {
  x: number;
  y: number;
  g: string | number;
  className?: string;
};

export function IsaScatterDatumObject(datum: any) {
  return (
    IsDefined((datum as ScatterDatumObject).x) &&
    IsDefined((datum as ScatterDatumObject).y) &&
    IsDefined((datum as ScatterDatumObject).g)
  );
}

export type TupleXY = [number, number];
export function IsATupleXY(datum: any) {
  return (
    IsAnArray(datum) &&
    datum.length === 2 &&
    IsaNumber(datum[0]) &&
    IsaNumber(datum[1])
  );
}
export type Regression = 'basicLinear';

export interface SumProps extends BaseProps {
  data: Function | FunctionDatum[] | NamedPoint[];
  start?: number;
  end?: number;
  tickSep?: number;
  removeEndTicks?: boolean;
  removeEndTickX?: boolean;
  removeEndTickY?: boolean;
}

export interface ArrowHeadProps {
  id: string;
  className?: string;
  arrowColor?: string;
  refX?: number;
  refY?: number;
  width?: number;
  height?: number;
  orient?: string | number;
}

export interface LatexProps {
  text: string;
  offset: { x: number; y: number };
  dx: number;
  dy: number;
  width: number;
  height: number;
  fontsize: number;
  color: string;
  fitContent: boolean;
  textAlign: 'center' | 'justify' | 'left' | 'right';
  block?: boolean;
}

export interface LineProps {
  start: Point;
  end: Point;
  color?: string;
  strokeWidth?: number;
  dash?: number;
  markerEnd?: string;
  markerStart?: string;
  shapeRendering?:
    | 'auto'
    | 'optimizeSpeed'
    | 'crispEdges'
    | 'geometricPrecision';
}

export interface MarkerProps {
  id: string;
  type?: 'circle' | 'arrow' | 'square';
  className?: string;
  arrowColor?: string;
  refX?: number;
  refY?: number;
  width?: number;
  height?: number;
  radius?: number;
  viewbox?: string;
  cx?: number;
  cy?: number;
  circleFillColor?: string;
  circleStrokeColor?: string;
  orient?: string | number;
}

/**
 * @public
 * Used to set the `anchor` attribute.
 */
// type Anchor = 'start' | 'middle' | 'end';

/**
 * @public TextProps
 * An API for working with the `SVGText`
 * element.
 */
export interface TextProps {
  /**
   * Sets the contents of
   * the `<Text/>` element.
   */
  val: number | string | boolean;
  /**
   * Sets the fontsize of the
   * the `<Text/>` element.
   * Measured in REM.
   */
  fontSize?: number;
  /**
   * Sets the color of the
   * `<Text/>` element.
   */
  color?: string;
  /**
   * Sets the position of the
   * the `<Text/>` element. Takes the form
   * `{x: <number>, y: <number>}`. The `x` property
   * sets the `SVGText` elemnent's `x` attribute, and the
   * `y` property sets the `SVGText` element's `y` attribute.
   */
  pos?: Coordinate;
  /**
   * Sets the x-offset of the `SVGText` element.
   */
  dx?: number;
  /**
   * Sets the y-offset of the `SVGText` element.
   */
  dy?: number;
  /**
   * Sets the `textAnchor` attribute of the `SVGText`
   * element.
   */
  width?: number;
  height?: number;
  fitContent?: boolean;
  textAlign?: 'center' | 'justify' | 'left' | 'right';
  anchor?: 'start' | 'middle' | 'end';
  latex?: boolean;
}

/* Refactor Candidates ---- */
/**
 * @public
 */
export type Coordinate = { x: number; y: number };

/**
 * @public
 * simplest aggregate type in Hago
 */
export type Datum = {
  val: string | number;
  id?: string | number;
  group?: string | number;
  ant?: Annotation;
  ptr?: string;
  data?: number;
  class?: string;
};
/**
 * @public AntObject
 * The AntObject is used for annotations.
 *
 * @param val
 * The value of the annotation text to render.
 * @param pos
 * The position of the annotation.
 * @param color
 * The color the annotation text.
 * @param type
 * The type of the annotation text: Either `latex` or `plain`
 * @param className
 * Initializes the class attribute for the AntObject's resulting `<g/>`.
 */
export type AntObject = {
  val: string;
  pos?: string;
  color?: string;
  type?: string;
  className?: string;
};
/**
 * @public
 * EdgeObject type
 */
export type EdgeObject = {
  source: string | number;
  target: string | number;
  name?: string;
  weight?: number;
  className?: string;
};
/**
 * @public
 * Used to populate the `DatumPointerArray`
 */
export type DatumPointer = {
  val: string;
  i: number;
};
/**
 * @public
 */
export type Frame = {
  v: string | number;
  display?: 'block' | 'none';
  className?: string;
  ptr?: string;
  ant?: Annotation;
  popped?: boolean;
};
/**
 * @public
 */

export type FunctionDatum = {
  f: Function;
  scale?: number;
  color?: string;
  integrate?: [number, number, Integral];
  id?: string;
};

export type ParametricFunctionDatum = {
  x: Function;
  y: Function;
  scale?: number;
  color?: string;
  integrate?: [number, number, Integral];
  id?: string;
};

export type Integral = 'x' | 'y' | Function;

/**
 * @public
 */
export type MemoryDatum = {
  val: Literal;
  a?: string;
  id?: string;
  className: string;
  display?: 'block' | 'none';
  s?: number;
};
/**
 * @public
 */
export type SequenceFunction = {
  f: Function;
  className?: string;
  start?: number;
  end?: number;
};
