var config = require("../config");
var gulp = require("gulp");
var $ = require("gulp-load-plugins")(config.loadPluginsOptions);
var args = require("../args");

gulp.task("scripts", (cb) => {
	return $.runSequence(
		"copy:scripts", [
			"generate:umd",
			"generate:es2015"
		], cb);
});

gulp.task("generate:umd", (cb) => {
	compileTs({
		dest: config.artifact.umd,
		target: "es5",
		moduleType: "umd",
		deleteTypings: true
	}, cb);
});

gulp.task("generate:es2015", (cb) => {
	compileTs({
		useNgc: args.isRelease,
		dest: config.artifact.es2015,
		target: "es5",
		moduleType: "es2015"
	}, cb);
});

gulp.task("copy:scripts", () => {
	return gulp.src([config.src.ts, `!${config.test.files}`])
		.pipe(gulp.dest(config.artifact.umd))
		.pipe(gulp.dest(config.artifact.es2015));
});

function runNgc(configPath) {
	return $.crossSpawnPromise("node_modules/.bin/ngc", ["-p", configPath])
		.catch((error) => {
			console.error($.util.colors.red("NGC failed"));
			console.error($.util.colors.red(error.stderr.toString()));

			if (!args.continueOnError) {
				process.exit(1);
			}
		});
}

function runTsc(configPath) {
	return $.crossSpawnPromise("node_modules/.bin/tsc", ["-p", configPath], { stdio: "inherit" })
		.catch((error) => {
			if (!error) {
				return;
			}

			console.error($.util.colors.red("TSC failed"));
			console.error($.util.colors.red(error.stderr ? error.stderr.toString() : error));

			if (!args.continueOnError) {
				process.exit(1);
			}
		});
}

function compileTs(options, callback) {
	const dest = options.dest;
	createTempTsConfig(dest, options.target, options.moduleType);

	const tsConfig = `${dest}/tsconfig.json`;
	const promise = options.useNgc ? runNgc(tsConfig): runTsc(tsConfig);

	return promise
		.then(() => deleteFiles(options))
		.then(() => callback());
}

function deleteFiles(options) {
	const dest = options.dest;
	var filesToDelete = [
		`${dest}/**/*.json`,
		`${dest}/node_modules`,
		`${dest}/**/*.ts`
	];

	if (!options.deleteTypings) {
		filesToDelete = [
			...filesToDelete,
			`!${dest}/**/*.d.ts`,
			`!${dest}/**/*.metadata.json`
		];
	}

	return $.del(filesToDelete);
}

function createTempTsConfig(path, target, moduleType) {
	const fs = require("fs");
	const config = require("../../../tsconfig.json", "utf-8");

	config.compilerOptions = Object.assign(
		{},
		config.compilerOptions, {
			outDir: "",
			module: moduleType,
			target: target
		}
	);

	config.include = [
		"./index.ts",
		"../../typings/**/*.d.ts"
	];

	fs.writeFileSync(`${path}/tsconfig.json`, JSON.stringify(config, null, 2));
}