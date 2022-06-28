import { Annotation } from './Annotation';

export type Frame = {
  v: string | number;
  display?: 'block' | 'none';
  className?: string;
  ptr?: string;
  ant?: Annotation;
  popped?: boolean;
};
