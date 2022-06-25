import { ArrayData, ElementArray, StackData } from './Types';
export declare function formatStackData(userInputDataArray: StackData): any[];
export declare function generateElements(userInputDataArray: StackData | ArrayData | ElementArray): any[];
export declare function generateTreeData(rawData: any[]): any[];
export declare const generateBinaryTreeData: (rawData: any) => any[];
