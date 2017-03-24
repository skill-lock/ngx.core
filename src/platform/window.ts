import { Injectable, Inject, InjectionToken } from "@angular/core";

export const WINDOW = new InjectionToken("WindowToken");

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