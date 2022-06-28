import { BaseProps } from '../BaseProps';
import { ElementArray } from './ElementArray';

export interface LinkedListProps extends BaseProps {
  data: ElementArray;
  isIndexed?: boolean;
}
