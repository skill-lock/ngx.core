import { Injectable, Inject, OpaqueToken } from "@angular/core";

export const WINDOW = new OpaqueToken("WindowToken");

@Injectable()
export class WindowRef {

	constructor(
		@Inject(WINDOW) private window: any
	) {
	}

	/**
	 * Window underlying native object
	 * @type {Window}
	 */
	get native(): Window {
		return this.window;
	}

}