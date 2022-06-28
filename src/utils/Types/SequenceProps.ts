import { BaseProps } from '../BaseProps';
import { SequenceData } from './SequenceData';

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
