import { TruncatePipe } from "./pipes/truncate.pipe";
import { DictionaryToArrayPipe } from "./pipes/dictionary-to-array.pipe";
import { TakePipe } from "./pipes/take.pipe";
import { KebabCasePipe } from "./pipes/kebab-case.pipe";

export { Dictionary } from "./collections/dictionary";
export { KeyValuePair } from "./collections/key-value-pair";

export { NonArray, PartialObject } from "./object/object";

export { TruncatePipe } from "./pipes/truncate.pipe";
export { DictionaryToArrayPipe } from "./pipes/dictionary-to-array.pipe";
export { TakePipe } from "./pipes/take.pipe";
export { KebabCasePipe } from "./pipes/kebab-case.pipe";

export {
	updateAllMapState,
	updateMapState,
	updateState,
	updateStateItem
} from "./redux/reducer.util";

export { statusCodes } from "./http-status-codes";
export { KeyCode } from "./key-code";

export const UTIL_PIPES: any[] = [
	TruncatePipe,
	TakePipe,
	DictionaryToArrayPipe,
	KebabCasePipe
];
