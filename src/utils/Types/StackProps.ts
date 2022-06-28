import { BaseProps } from '../BaseProps';
import { StackData } from './StackData';

export interface StackProps extends BaseProps {
  data: StackData;
  scale?: number;
  fwidth?: number;
  fheight?: number;
}
