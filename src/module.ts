import { NgModule, Provider } from "@angular/core";
import { HttpModule } from "@angular/http";

import { DocumentRef } from "./platform/document";
import { WindowRef, WINDOW } from "./platform/window";

import { UTIL_PIPES } from "./utils/index";

export const CORE_PIPES = [
	...UTIL_PIPES
];

export const CORE_PROVIDERS: Provider[] = [
	DocumentRef,
	WindowRef,
	{ provide: WINDOW, useFactory: _window }
];

@NgModule({
	imports: [
		HttpModule
	],
	declarations: [
		CORE_PIPES
	],
	exports: [
		CORE_PIPES,
		HttpModule
	],
	providers: CORE_PROVIDERS
})
export class CoreModule {
}

/**
 * @internal
 */
export function _window(): any {
	return window;
}