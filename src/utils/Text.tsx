import React from 'react';
import { Coordinate } from '../utils';

/**
 * @public
 * Used to set the `anchor` attribute.
 */
type Anchor = 'start' | 'middle' | 'end';

/**
 * @deprecated
 * Used to set the `alignment` property.
 * Currently not used while LaTex rendering
 * is being explored.
 *
 */
type TextAlignment = 'right' | 'center' | 'left' | 'justify';

/**
 * @public TextProps
 * An API for working with the `SVGText`
 * element.
 */
interface TextProps {
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
  anchor?: Anchor;
  /**
   * @deprecated align
   * Sets the alignment attribute of the `DIV` element
   * containing the text. Formerly used for LaTeX rendering.
   * LaTex rendering currently being held off in development
   * until a suitable approach for rendering LaTeX in React
   * is determined.
   */
  align?: TextAlignment;
}

export function Text({
  val,
  fontSize = 0.8,
  color = 'black',
  pos = { x: 0, y: 0 },
  dx = 0,
  dy = 0,
  anchor = 'middle',
}: TextProps) {
  return (
    <text
      textAnchor={anchor}
      x={pos.x}
      y={pos.y}
      dx={dx}
      dy={dy}
      fontSize={`${fontSize}rem`}
      fill={color}
    >
      {val}
    </text>
  );
}
