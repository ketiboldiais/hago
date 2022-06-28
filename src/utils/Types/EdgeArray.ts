import { LinkObject } from './LinkObject';
import { EdgeObject } from './EdgeObject';

// edge array type
export type EdgeArray = ((string | number)[] | LinkObject | EdgeObject)[];
