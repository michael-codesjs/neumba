export class EstateNotFound extends Error {

	constructor() {
		super();
		this.name = "Estate Not Found.";
		this.message = "The requested estate does not exist.";
	}

}