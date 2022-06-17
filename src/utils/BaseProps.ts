export interface BaseProps {
  id?: string;
  className?: string;
  scale?: number;
  width?: number;
  height?: number;
  cwidth?: number;
  cheight?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  margins?: [number, number, number, number];
}

export type Coordinate = { x: number, y: number }; 