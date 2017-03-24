import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

import { Dictionary } from "../collections/dictionary";
import { KeyValuePair } from "../collections/key-value-pair";

@Pipe({
	name: "dictionaryToArray"
})
export class DictionaryToArrayPipe implements PipeTransform {

	transform<T>(dictionary: Dictionary<T>): KeyValuePair<T>[] {
		return _.map(dictionary, (values, key) => {
			return {
				key: key,
				value: values
			};
		});
	}

}