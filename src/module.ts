import { NgModule, Provider } from "@angular/core";
import { HttpModule } from "@angular/http";

import { DocumentRef } from "./platform/document";
import { WindowRef, WINDOW } from "./platform/window";

import { UTIL_PIPES } from "./utils/index";

export const GLOBAL_PIPES = [
	...UTIL_PIPES
];

export const GLOBAL_PROVIDERS: Provider[] = [
	DocumentRef,
	WindowRef,
	{ provide: WINDOW, useFactory: _window }
];

@NgModule({
	imports: [
		HttpModule
	],
	declarations: [
		GLOBAL_PIPES
	],
	exports: [
		GLOBAL_PIPES,
		HttpModule
	],
	providers: GLOBAL_PROVIDERS
})
export class GlobalModule {
}

/**
 * @internal
 */
export function _window(): any {
	return window;
}