var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var srcRoot = "src";
var artifactRoot = "_artifact";
const typings = "./typings/index.d.ts";

module.exports = {
	output: {
		root: "dist"
	},
	src: {
		root: srcRoot,
		ts: `${srcRoot}/**/*.ts`,
		typings: typings
	},
	artifact: {
		root: artifactRoot,
		umd: `${artifactRoot}/umd`,
		es2015: `${artifactRoot}/es2015`
	},
	test: {
		files: `${srcRoot}/**/*.spec.{ts,d.ts}`,
		setup: "test/test-setup.ts",
		karmaConfig: "../karma.conf.js",
		reporters: ["nyan"],
		browsers: ["Chrome"]
	},
	doc: "./doc",
	packageName: pkg.name,
	loadPluginsOptions: {
		pattern: [
			"gulp-*",
			"gulp.*",
			"git-guppy",
			"cross-spawn-promise",
			"run-sequence",
			"del",
			"merge2",
			"karma",
			"path",
			"stylelint",
			"postcss-*"
		]
	}
};