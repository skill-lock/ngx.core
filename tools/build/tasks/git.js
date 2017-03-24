var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("pre-commit", () => {
	return $.gitGuppy(gulp)
		.stream("pre-commit")
		.pipe($.filter(config.src.ts))
		.pipe($.tslint())
		.pipe($.tslint.report($.tslintStylish, {
			emitError: true,
			sort: true,
			bell: false
		}));
});