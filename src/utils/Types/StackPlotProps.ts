import { BaseProps } from '../BaseProps';
import { StackPlotData } from './StackPlotData';

export interface StackPlotProps extends BaseProps {
  data: StackPlotData;
  className: string;
}
