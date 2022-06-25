export class HagoError extends Error {
	errorMesage: string;
	constructor(message: string) {
		super(message);
		this.errorMesage = message;
	}
}