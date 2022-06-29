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
}
