import * as _ from "lodash";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "take"
})
export class TakePipe implements PipeTransform {

	transform<T>(value: T[], count: number): T[] {
		return _.take<T>(value, count);
	}

}
