var tsconfig = require("../../../tsconfig.json");
var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("test", ["compile:test"], (cb) => {
	runTests(true, cb);
});

gulp.task("tdd", ["compile:test"], (cb) => {
	runTests(false, cb);
});

gulp.task("compile:test", () => {
	const tsProject = getTscOptions();
	return gulp.src([config.src.typings, config.test.files, config.test.setup])
		.pipe(tsProject())
		.on("error", () => {
			if (!args.continueOnError) {
				process.exit(1);
			}
		});
});

function runTests(singleRun, cb) {
	new $.karma.Server({
		configFile: $.path.join(__dirname, `../../${config.test.karmaConfig}`),
		singleRun: singleRun,
		autoWatch: !singleRun,
		reporters: args.reporter,
		browsers: args.browser
	}, (code) => {

		// make sure failed karma tests cause gulp to exit non-zero
		if (code === 1) {
			$.util.log($.util.colors.red("------- Error: unit test failed -------"));
			return process.exit(1);
		}
		cb();
	}).start();
}

/**
 * This is used to transform compilerOptions declared in tsconfig.json
 * so gulp-typescript does not complain about sourceRoot option.
 * 
 */
function transformCompilerOptionsGulpTypescript(compilerOptions) {
	const clonedCompilerOptions = Object.assign({}, compilerOptions);
	delete clonedCompilerOptions.sourceRoot;
	clonedCompilerOptions.inlineSources = false;
	return clonedCompilerOptions;
}

function getTscOptions() {
	const transformedCompilerOptions = transformCompilerOptionsGulpTypescript(tsconfig.compilerOptions);
	return $.typescript.createProject(transformedCompilerOptions);
}