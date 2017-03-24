var yargs = require("yargs");
var config = require("./config");

var argv = yargs
	.alias("rel", "release")
	.default("rel", false)

	.choices("bump", ["major", "minor", "patch", "prerelease"])
	.default("bump", "patch")

	.default("versionSuffix", "rc")
	.default("reporter", config.test.reporters)

	.default("browser", config.test.browsers)
	.array("browser")

	.default("continueOnError", false)

	.argv;

module.exports = {
	bump: argv.bump,
	versionSuffix: argv.versionSuffix.toLowerCase(),
	isRelease: argv.rel,
	reporter: argv.reporter,
	browser: argv.browser,
	continueOnError: argv.continueOnError
};