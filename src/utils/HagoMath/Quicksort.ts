function partition(list: number[], start: number, end: number) {
  let pivotValue = list[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (list[i] < pivotValue) {
      [list[i], list[pivotIndex]] = [list[pivotIndex], list[i]];
      pivotIndex++;
    }
  }
  [list[pivotIndex], list[end]] = [list[end], list[pivotIndex]];
  return pivotIndex;
}

export function Quicksort(list: number[]) {
  let stack = [];
  let listLength = list.length;
  stack.push(0);
  stack.push(listLength - 1);
  while (stack[stack.length - 1] >= 0) {
    let end = stack.pop();
    let start = stack.pop();
    let pivotIndex = partition(list, start, end);
    if (pivotIndex - 1 > start) {
      stack.push(start);
      stack.push(pivotIndex - 1);
    }
    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1);
      stack.push(end);
    }
  }
  return list;
}
