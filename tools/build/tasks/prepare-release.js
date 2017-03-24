var args = require("../args");
var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);

gulp.task("prepare-release", (cb) => {
	args.isRelease = true;

	return $.runSequence(
		"clean",
		"build",
		"test",
		"bump-version",
		// todo: find a solution for the docs
		// "doc",
		"changelog",
		"tag-release",
		cb);
});

gulp.task("bump-version", () => {
	return gulp.src(["./package.json"])
		.pipe($.bump({ type: args.bump, preid: args.versionSuffix })) //major|minor|patch|prerelease
		.pipe(gulp.dest("./"));
});

gulp.task("changelog", () => {
	return gulp.src(`${config.doc}/CHANGELOG.md`)
		.pipe($.conventionalChangelog({
			preset: "angular",
			releaseCount: 0
		}))
		.pipe(gulp.dest(config.doc));
});

gulp.task("tag-release", ["tag-release:create"], () => {
	return $.git.push("origin", "HEAD", { args: " --follow-tags -u develop" });
});

gulp.task("tag-release:create", () => {
	const fs = require("fs");
	const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

	return $.git.tag(pkg.version, "", (err) => {
		if (err) {
			$.util.log($.util.colors.red(err));
			return process.exit(1);
		}
	});
});