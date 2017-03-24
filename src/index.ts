import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/from";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/bufferCount";
import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/groupBy";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/share";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

export { DocumentRef } from "./platform/document";
export { WINDOW, WindowRef } from "./platform/window";

export * from "./utils/index";

export { CoreModule, CORE_PIPES, CORE_PROVIDERS } from "./module";