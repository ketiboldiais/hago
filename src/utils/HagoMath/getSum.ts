export function getSum(list: number[]) {
	const listLength = list.length;
	let sum = 0;
	for (let i = 0; i < listLength; i++) {
		sum += list[i];
	}
	return sum;
}

// const test = [1, 2, 3, 5, 1, 8, 2];
// const res = getSum(test);
// res