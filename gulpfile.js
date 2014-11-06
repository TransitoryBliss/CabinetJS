var gulp = require("gulp");
var webpack = require("gulp-webpack");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var format = require("util").format;

/**
 * Load Package.JSON
 **/
var pkg = require("./package");

var webpackConfig = {
	output: {
		//
	 	// Export it as a global library	 
	 	//
		libraryTarget: "var",
		library: "Cabinet",
		// 
		// Example format: cabinetjs-0.0.2-alpha.js
		//
		filename: format("%s-%s.js", pkg.name, pkg.version).toLowerCase()
	}
}

gulp.task("dist", function () {
	var config = Object.create(webpackConfig);
	return gulp.src("lib/cabinet.js")
		.pipe(webpack(config))
		.pipe(gulp.dest("dist/"))
		.pipe(rename(format("%s-%s.min.js", pkg.name, pkg.version).toLowerCase()))
		.pipe(uglify())
		.pipe(gulp.dest("dist/"))
});

gulp.task("test", function (cb) {
	gulp.src(["lib/**/*.js"])
		.pipe(istanbul())
		.on("finish", function () {
			gulp.src(["test/*.js"])
				.pipe(mocha({ 
					reporter: "spec"					
				}))
				.pipe(istanbul.writeReports())	
				.on("end", cb)							
		})
});