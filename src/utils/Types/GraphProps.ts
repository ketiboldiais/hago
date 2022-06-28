import { EdgeArray } from './EdgeArray';
import { BaseProps } from '../BaseProps';

export interface GraphProps extends BaseProps {
  data: EdgeArray;
  id?: string;
  className?: string;
  radius?: number;
  link?: 'line' | 'path';
  straightEdge?: boolean;
  textOffsetX?: number;
  textOffsetY?: number;
  isDirected?: boolean;
  edgeLength?: number;
  fontSize?: number;
  repulsion?: number;
  blast?: number;
}
