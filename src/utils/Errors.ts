export class HagoError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, HagoError.prototype);
	}
	InvalidArgument() {
		return "Invalid argument.";
	}
}