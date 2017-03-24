var gulp = require("gulp");
var gutil = require("gulp-util");
var config = require("./config")

require("require-dir")("./tasks");

gulp.task("default", () => {

	console.log(gutil.colors.green(`\n======== ${config.packageName} ========\n`));

	console.log("tasks");
	console.log(" - build :: cleans and build. Use --rel or --release to execute tasks as if for a release.");
	console.log(" - rebuild :: cleans and build. Use --rel or --release to execute tasks as if for a release.");
	console.log(" - ci :: rebuild and test. Use --rel or --release to execute tasks as if for a release.");
	console.log(" - clean :: cleans everything.");
	console.log(" - prepare-release --bump minor :: bump major|minor|patch|prerelease version, clean and build.");
	console.log(" - test :: run the tests once.");
	console.log(" - tdd :: run the tests and keep watching.");
	console.log(" - watch :: watches for changes and compile on save.");
	console.log(" - lint :: gives you a delicious chocolate.");
	console.log(" - doc :: generates the api doc.");

	console.log("\n");
});