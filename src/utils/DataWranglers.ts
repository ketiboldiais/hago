import { isObjectLiteral } from './TypeChecks';
import { ArrayData, Datum, DatumArray, StackData } from './Types';
import { IsNull } from './TypeChecks';

export function formatStackData(userInputDataArray: StackData) {
  let formattedData = [];
  for (let i = 0; i < userInputDataArray.length; i++) {
    let currentElement = userInputDataArray[i];
    if (isObjectLiteral(currentElement)) {
      formattedData.push(currentElement);
    } else {
      let newFrame = { val: currentElement };
      formattedData.push(newFrame);
    }
  }
  return formattedData;
}

export function generateElements(
  userInputDataArray: StackData | ArrayData | DatumArray
) {
  let formattedData = [];
  for (let i = 0; i < userInputDataArray.length; i++) {
    let currentElement = userInputDataArray[i];
    if (isObjectLiteral(currentElement)) {
      if (!(currentElement as Datum).data) (currentElement as Datum).data = 1;
      formattedData.push(currentElement);
    } else {
      let newFrame: Datum = {
        val: currentElement as string | number,
        data: 1,
      };
      formattedData.push(newFrame);
    }
  }
  return formattedData;
}

export function generateTreeData(rawData: any[]) {
  let data = [];
  for (let i = 0; i < rawData.length; i++) {
    if (isObjectLiteral(rawData[i])) {
      data.push(rawData[i]);
    } else {
      let node = {
        child: rawData[i][0],
        parent: rawData[i][1],
      };
      data.push(node);
    }
  }
  return data;
}

export const generateBinaryTreeData = (rawData: any) => {
  let data = [];
  const root = { child: rawData[0][0], parent: '' };
  data.push(root);
  let leftChild: { val: any };
  let rightChild: { val: any };
  let leftNode: { child: any; parent: any; hide?: boolean };
  let rightNode: { child: any; parent: any; hide?: boolean };
  let parent: any;
  for (let i = 0; i < rawData.length; i++) {
    parent = rawData[i][0];
    leftChild = rawData[i][1][0];
    rightChild = rawData[i][1][1];
    if (IsNull(leftChild)) {
      leftNode = { child: '', parent, hide: true };
    } else {
      if (isObjectLiteral(leftChild)) {
        leftNode = { child: leftChild.val, parent, ...leftChild };
      } else {
        leftNode = { child: leftChild, parent };
      }
    }
    data.push(leftNode);
    if (IsNull(rightChild)) {
      rightNode = { child: '', parent, hide: true };
    } else {
      if (isObjectLiteral(rightChild)) {
        rightNode = { child: rightChild.val, parent, ...rightChild };
      } else {
        rightNode = { child: rightChild, parent };
      }
    }
    data.push(rightNode);
  }
  return data;
};
