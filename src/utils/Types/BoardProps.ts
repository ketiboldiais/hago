import { ReactNode } from 'react';

export interface BoardProps {
  className: string;
  width: number;
  height: number;
  cwidth: number;
  cheight: number;
  margins: number[];
  children?: ReactNode;
}
