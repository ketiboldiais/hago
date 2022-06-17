import { isObjectLiteral } from './isObjectLiteral';
import { ArrayData, ElementArray, StackData } from './Types';

export function formatStackData(userInputDataArray: StackData) {
  let formattedData = [];
  console.log(userInputDataArray);
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
  userInputDataArray: StackData | ArrayData | ElementArray
) {
  let formattedData = [];
  console.log(userInputDataArray);
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
