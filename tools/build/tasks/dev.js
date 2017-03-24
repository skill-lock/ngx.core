var config = require("../config");
var args = require("../args");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("watch", () => {
	args.continueOnError = true;

	gulp.watch([config.src.ts, `!${config.test.files}`], compileScripts)
		.on("change", reportChange)
		.on("error", swallowError);

	compileScripts();
});

function compileScripts() {
	return $.runSequence(
		"scripts",
		"build:copy-dist"
	);
}

function reportChange(event) {
	$.util.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	$.util.log($.util.colors.red(`Error occurred while running watched task. Error details: ${error}`));
}