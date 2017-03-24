import { isExternalUrl } from "./url.util";

describe("UrlUtilSpecs", () => {

	describe("isExternalUrl", () => {

		describe("given an external url", () => {
			describe("when url starts with 'http'", () => {
				it("should return true", () => {
					expect(isExternalUrl("https://google.com")).toEqual(true);
				});
			});
			describe("when url starts with 'https'", () => {
				it("should return true", () => {
					expect(isExternalUrl("https://google.com")).toEqual(true);
				});
			});
			describe("when url starts with '//'", () => {
				it("should return true", () => {
					expect(isExternalUrl("//google.com")).toEqual(true);
				});
			});
		});

		describe("given an internal url", () => {
			describe("when url starts with '/'", () => {
				it("should return false", () => {
					expect(isExternalUrl("/en/heroes")).toEqual(false);
				});
			});
			describe("when url starts without '/'", () => {
				it("should return false", () => {
					expect(isExternalUrl("en/heroes")).toEqual(false);
				});
			});
		});

	});
});