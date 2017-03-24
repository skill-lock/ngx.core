var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("lint", () => {
	return gulp.src(config.src.ts)
		.pipe($.tslint())
		.pipe($.tslint.report($.tslintStylish, {
			emitError: true,
			sort: true,
			bell: false
		}));
});