import { FunctionElement } from './FunctionElement';
import { BaseProps } from '../BaseProps';

export interface PlotProps extends BaseProps {
  data?: FunctionElement[];
  domain?: [number, number];
  range?: [number, number];
  ticks?: number;
  xTicks?: number;
  yTicks?: number;
  samples?: number;
  className?: string;
  id?: string;
}
