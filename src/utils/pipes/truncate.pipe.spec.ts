import { TruncatePipe } from "./truncate.pipe";

describe("TruncatePipeSpecs", () => {
	let pipe: TruncatePipe;

	beforeEach(() => {
		pipe = new TruncatePipe();
	});

	describe("given that string is passed", () => {

		describe("when no pipe parameters provided", () => {
			describe("and string is less than 25 characters long including spaces", () => {
				it("then should leave 'Hello World' unchanged", () => {
					expect(pipe.transform("Hello World")).toEqual("Hello World");
				});
			});

			describe("when string is more than 25 characters long including spaces", () => {
				it("then should transform 'Lorem ipsum dolor sit amet' to 'Lorem ipsum dolor sit ame'", () => {
					expect(pipe.transform("Lorem ipsum dolor sit amet")).toEqual("Lorem ipsum dolor sit ame");
				});
			});
		});

		describe("when length (5) parameter is provided", () => {
			describe("and string is less than 5 characters long including spaces", () => {
				it("Should leave 'Hi' unchanged", () => {
					expect(pipe.transform("Hi", 5)).toEqual("Hi");
				});
			});

			describe("and string is more than 5 characters long including spaces", () => {
				it("then should transform 'Hello World' to 'Hello'", () => {
					expect(pipe.transform("Hello World", 5)).toEqual("Hello");
				});
			});
		});

		describe("when length (6) parameter is provided", () => {
			describe("and string is more than 6 characters long including spaces", () => {
				it("then should transform 'Hello World' to 'Hello' and remove trailing spaces", () => {
					expect(pipe.transform("Hello World", 6)).toEqual("Hello");
				});
			});
		});

		describe("when length (8) and suffix ('...') parameters are provided", () => {
			describe("and string is less than 8 characters long including spaces", () => {
				it("should leave 'Hello!' unchanged", () => {
					expect(pipe.transform("Hello!", 8, "...")).toEqual("Hello!");
				});
			});

			describe("and string is more than 8 characters long including spaces", () => {
				it("should transform 'Hello World' to 'Hello...'", () => {
					expect(pipe.transform("Hello World", 8, "...")).toEqual("Hello...");
				});
			});
		});

	});
});