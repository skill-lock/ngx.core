var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("doc", () => {
	return gulp.src([config.src.typings, config.src.ts, `!${config.test.files}`])
		.pipe($.typedoc({
			module: "umd",
			target: "es5",
			includeDeclarations: true,
			excludeExternals: true,

			out: `${config.doc}/api`,
			mode: "modules",

			name: config.packageName,
			version: true
		}));
});