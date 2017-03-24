var conf = require("./tools/build/config");

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],

		files: [
			// systemjs
			"node_modules/systemjs/dist/system.src.js",

			// polyfills
			"node_modules/core-js/client/shim.js",
			"node_modules/reflect-metadata/Reflect.js",
			"node_modules/zone.js/dist/zone.js",
			"node_modules/zone.js/dist/long-stack-trace-zone.js",
			"node_modules/zone.js/dist/proxy.js",
			"node_modules/zone.js/dist/sync-test.js",
			"node_modules/zone.js/dist/jasmine-patch.js",
			"node_modules/zone.js/dist/async-test.js",
			"node_modules/zone.js/dist/fake-async-test.js",
			"node_modules/intl/dist/intl.min.js",
			"node_modules/intl/locale-data/jsonp/en.js",
			// phantomJS2 (and possibly others) might require it
			{ pattern: "node_modules/systemjs/dist/system-polyfills.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/reflect-metadata/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/intl/**/*.js.map", included: false, watched: false, served: true },

			// skeleton vendors - DO NOT TOUCH UNLESS FROM SKELETON.
			{ pattern: "node_modules/rxjs/**/*.js", included: false, watched: false },
			{ pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false },
			{ pattern: "node_modules/@angular/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/@angular/**/*.js.map", included: false, watched: false, served: true },
			{ pattern: "node_modules/ngrx-store-freeze/**/*.js", included: false, watched: false, served: true },
			{ pattern: "node_modules/deep-freeze-strict/**/*.js", included: false, watched: false, served: true },

			// vendors - package vendors here...
			{ pattern: "node_modules/lodash/**/*.js", included: false, watched: false, served: true },

			// source
			{ pattern: conf.src.ts, included: false, watched: true },
			{ pattern: conf.test.setup, included: false, watched: false },
			"karma-test-shim.js"
		],

		exclude: [
			"node_modules/**/*_spec.js",
			"node_modules/**/*.spec.js",
		],

		preprocessors: {
			[conf.test.setup]: ["typescript"],
			[conf.src.ts]: ["typescript"]
		},

		typescriptPreprocessor: {
			options: {
				inlineSourceMap: true,
				inlineSources: true,
				emitDecoratorMetadata: true,
				experimentalDecorators: true,
			}
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		browserNoActivityTimeout: 60000
	})
}
