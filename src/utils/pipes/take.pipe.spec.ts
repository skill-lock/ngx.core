import { TakePipe } from "./take.pipe";

describe("TruncatePipeSpecs", () => {
	let pipe: TakePipe;

	beforeEach(() => {
		pipe = new TakePipe();
	});

	describe("given that an array has items", () => {
		describe(`when the array has more items than the "count" to take`, () => {
			it(`then the total items should match the "count" parameter`, () => {
				expect(pipe.transform([1, 2, 4, 5, 6], 4).length).toBe(4);
			});
		});

		describe(`when the array has less items than the "count" to take`, () => {
			it(`then the total items should match the "count" parameter`, () => {
				expect(pipe.transform([1], 2).length).toBe(1);
			});
		});
	});

});