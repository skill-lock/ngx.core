import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "truncate"
})
export class TruncatePipe implements PipeTransform {

	transform(value: string, length?: number, suffix = ""): string {
		return _.chain(value)
			.truncate({
				length: length || 25,
				omission: suffix
			})
			.trim()
			.value();
	}

}