var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("clean", (cb) => {
	return $.runSequence(
		["clean:dist", "clean:artifact"],
		cb);
});

gulp.task("clean:dist", () => {
	return $.del([
		`${config.output.root}/**`,
		`!${config.output.root}`,
	])
});

gulp.task("clean:artifact", () => {
	return $.del(config.artifact.root)
});