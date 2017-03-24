import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class DocumentRef {

	constructor(
		@Inject(DOCUMENT) private document: any
	) {
	}

	/**
	 * Document underlying native object
	 * @type {Document}
	 */
	get native(): Document {
		return this.document;
	}

}