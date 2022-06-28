import { BaseProps } from '../BaseProps';
import { FunctionElement } from './FunctionElement';

export interface PolarProps extends BaseProps {
  data: FunctionElement[];
  radius?: number;
  domain?: number[];
  range?: number[];
  className: string;
}
