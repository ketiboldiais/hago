export function makeId(HagoClassName: string = "hago"): string {
	const currentTime = Date.now();
	const timeStamp = `${HagoClassName}_${currentTime}`;
	return timeStamp;
}
