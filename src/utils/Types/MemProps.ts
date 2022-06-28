import { RegisterArray } from './RegisterArray';
import { BaseProps } from '../BaseProps';

export interface MemProps extends BaseProps {
  data: RegisterArray;
  cellWidth?: number;
  cellHeight?: number;
  dataSize?: number;
  startAddressAt?: number;
  addressLength?: number;
}
