import { BaseProps } from '../BaseProps';
import { StackPlotData } from './StackPlotData';

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
