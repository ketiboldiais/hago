import React from 'react';
import { StructGuard } from './StructGuard';
import { Point } from './Types';

/**
 * @public
 * Creates a cubic Bezier curve
 */
export type CubicBezier = {
  /**
   * @param - start
   * The pull point for the start
   * Note: The point before the this
   * value is the starting point of
   * the cubic Bezier curve.
   */
  startPull: Point;
  /**
   * @param - endPull
   * The pull point for the end point
   * point (the point after this).
   */
  endPull: Point;
  /**
   * @param - end
   * The end of the bezier curve
   */
  end: Point;
};

const IsCubicBezier = StructGuard(
  (datum: any) => datum as CubicBezier,
  ['startPull', 'endPull', 'end']
);

function BuildCubicBezierCommand(datum: CubicBezier) {
  const x1 = datum.startPull.x;
  const y1 = datum.startPull.y;
  const x2 = datum.endPull.x;
  const y2 = datum.endPull.y;
  const x = datum.end.x;
  const y = datum.end.y;
  return `C${x1},${y1} ${x2},${y2} ${x},${y}`;
}

/**
 * @public
 * Creates a quadratic Bezier curve
 */
export type QuadraticBezier = {
  /**
   * @param - pull
   * The pull point for the start and end points.
   * Note: The point before the this
   * value is the starting point of
   * the cubic Bezier curve.
   */
  pull: Point;
  /**
   * @param - end
   * The end of the bezier curve
   */
  end: Point;
};

const IsQuadraticBezier = StructGuard(
  (datum: any) => datum as QuadraticBezier,
  ['pull', 'end']
);

function BuildQuadraticBezierCurveCommand(datum: QuadraticBezier) {
  const x1 = datum.pull.x;
  const y1 = datum.pull.y;
  const x2 = datum.end.x;
  const y2 = datum.end.y;
  return `Q${x1},${y1} ${x2}${y2}`;
}

/**
 * @public
 * Creates an elliptical arc
 */
export type EllipticalArc = {
  /**
   * @param - rx
   * The x-radius of the ellipse
   */
  rx: number;
  /**
   * @param - ry
   * The y-radius of the ellipse
   */
  ry: number;
  /**
   * @param - xRotation
   * The arc's rotation along the x-axis
   */
  xRotation: number;
  /**
   * @param - end
   * The end of the bezier curve
   */
  end: Point;
};

const IsEllipticalArc = StructGuard(
  (datum: any) => datum as EllipticalArc,
  ['rx', 'ry', 'xRotation', 'end']
);

function BuildEllipticalArc(datum: EllipticalArc) {
  const rx = datum.rx;
  const ry = datum.ry;
  const xRotation = datum.xRotation;
  const endx = datum.end.x;
  const endy = datum.end.y;
  return `A${rx},${ry} ${xRotation} ${endx},${endy}`;
}

/**
 * @public StartPoint
 * The starting point of the path
 */
export type StartPoint = { M: Point };
/**
 * @public - LineTo
 * Draws a line from `start` to
 * the `LineTo` point.
 */
function BuildMCommand(datum: StartPoint) {
  const x = datum.M.x;
  const y = datum.M.y;
  return `M${x},${y}`;
}

const IsStartingPoint = StructGuard((datum: any) => datum as StartPoint, ['M']);

export type LineTo = { L: Point };
/**
 * @public HorizontalLineTo
 * Draws a line from the current position
 * to the `HorizontalLineTo`'s point value.
 */
function BuildLCommand(datum: LineTo) {
  const x = datum.L.x;
  const y = datum.L.y;
  return `L${x},${y}`;
}

const IsLineTo = StructGuard((datum: any) => datum as LineTo, ['L']);

export type HorizontalLineTo = { H: Point };
/**
 * @public - VerticalLineTo
 * Draws a line from the current position
 * to the `HorizontalLineTo`'s `Point` value
 */

function BuildHCommand(datum: HorizontalLineTo) {
  const x = datum.H.x;
  const y = datum.H.y;
  return `H${x},${y}`;
}

const IsHorizontalLineTo = StructGuard(
  (datum: any) => datum as HorizontalLineTo,
  ['H']
);

export type VerticalLineTo = { V: Point };
/**
 * @public - ClosePath
 * Draws a straight line from the current
 * position back to the first point of the path.
 */

const IsVerticalLineTo = StructGuard(
  (datum: any) => datum as VerticalLineTo,
  ['V']
);

function BuildVCommand(datum: VerticalLineTo) {
  const x = datum.V.x;
  const y = datum.V.y;
  return `V${x},${y}`;
}

/**
 * @public
 * Sets the data for path attribute.
 * The start point must have already
 * been provided. The `d` attribute
 * string is build in order - from
 * index 0 to the last.
 */
export type PathData = (
  | LineTo
  | HorizontalLineTo
  | VerticalLineTo
  | CubicBezier
  | QuadraticBezier
  | EllipticalArc
)[];

/**
 * @public
 * Initializes the `d` attribute
 * and others
 */
export interface PathProps {
  start: StartPoint;
  d: PathData;
  fill?: string;
  color?: string;
  strokeWidth?: number;
}

function BuildDAttribute(start: StartPoint, attrs: PathData) {
  if (IsStartingPoint(start)) {
    let d = `${BuildMCommand(start)}`;
    for (let i = 0; i < attrs.length; i++) {
      let current = attrs[i];
      if (IsLineTo(current)) d += BuildLCommand(current as LineTo);
      else if (IsHorizontalLineTo(current))
        d += BuildHCommand(current as HorizontalLineTo);
      else if (IsVerticalLineTo(current))
        d += BuildVCommand(current as VerticalLineTo);
      else if (IsCubicBezier(current))
        d += BuildCubicBezierCommand(current as CubicBezier);
      else if (IsQuadraticBezier(current))
        d += BuildQuadraticBezierCurveCommand(current as QuadraticBezier);
      else if (IsEllipticalArc(current))
        d += BuildEllipticalArc(current as EllipticalArc);
    }
    return d;
  } else {
    throw new Error('Invalid start value entered');
  }
}

export function Path({
  start,
  d,
  fill = 'none',
  color = 'black',
  strokeWidth = 1,
}: PathProps) {
  const dattr = BuildDAttribute(start, d);
  return (
    <path fill={fill} stroke={color} strokeWidth={strokeWidth} d={dattr} />
  );
}
