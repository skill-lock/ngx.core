import { KebabCasePipe } from "./kebab-case.pipe";

describe("KebabCasePipeSpecs", () => {
	let pipe: KebabCasePipe;

	beforeEach(() => {
		pipe = new KebabCasePipe();
	});

	describe("given that we pass some non kebab case string to use kebabcase pipe", () => {
		it("then the result should be shown as kebab case", () => {
			expect(pipe.transform("ThisIsATest")).toBe("this-is-a-test");
		});
	});

});