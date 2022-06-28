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
