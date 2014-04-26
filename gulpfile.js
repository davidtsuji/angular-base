var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	cluster = require('cluster'),
	compress = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	jshintReporter = require("jshint-stylish"),
	less = require('gulp-less'),
	path = require('path'),
	rename = require('gulp-rename'),
	shell = require('gulp-shell');

var worker, livereloadServer;

var livereload = function (_file) {
	return function (_path) {
		if (livereloadServer) livereloadServer.changed(_file);
	}
}

gulp.task("jshint", function () {
	return gulp.src(["./app/client/scripts/**/*.js", "./app/server/**/*.js", "test/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('styles', function () {

	gulp.src(['bower_components/bootstrap/fonts/*'], {
		base: 'bower_components/bootstrap/fonts'
	})
		.pipe(gulp.dest('./public/fonts'));

	return gulp.src('./app/client/styles/index.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(rename('app.css'))
		.pipe(gulp.dest('./public/styles'))
		.on('end', livereload('.css'));
});

gulp.task('scriptsApp', ['jshint'], function () {
	return gulp.src(['./app/client/scripts/index.js'])
		.pipe(browserify({
			standalone: 'app',
			debug: true
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./public/scripts'))
		.on('end', livereload('.js'));
});

gulp.task('scriptsLib', ['jshint'], function () {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-route/angular-route.js',
		'./bower_components/bootstrap/dist/js/bootstrap.js'
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('markup', function () {
	gulp.src(['./app/client/markup/**/*.*'])
		.pipe(gulp.dest('./public/'))
		.on('end', livereload('.html'));
});

gulp.task('minifyAppScripts', ['scriptsApp'], function () {
	return gulp.src(['./public/scripts/app.js'])
		.pipe(compress())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('minifyLibsScripts', ['scriptsLib'], function () {
	return gulp.src('./public/scripts/libs.js')
		.pipe(compress())
		.pipe(rename('libs.min.js'))
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('test', ['build'], shell.task([
	'npm test'
], {
	ignoreErrors: true
}));

gulp.task('server', function () {
	cluster.setupMaster({
		exec: "./app/server/index.js"
	});

	if (worker) {
		worker.kill();
	}
	worker = cluster.fork();
});

gulp.task('watch', function () {

	livereloadServer = require('gulp-livereload')();

	gulp.watch(['./app/client/styles/**/*.less'], ['styles']);
	gulp.watch(['./system/client/scripts/**/*', './app/client/scripts/**/*'], ['scriptsApp']);
	gulp.watch(['./app/client/markup/**/*.html'], ['markup']);
	gulp.watch(['./test/**/*', './testClient/**/*'], ['test']);
	gulp.watch(['./app/server/**/*'], ['server']);
	gulp.watch(['./gulpfile.js'], ['default']);
});

gulp.task('default', ['build', 'minify', 'test']);
gulp.task('scripts', ['scriptsApp', 'scriptsLib']);
gulp.task('build', ['styles', 'scripts', 'markup']);
gulp.task('run', ['default', 'server', 'watch']);
gulp.task('minify', ['minifyAppScripts', 'minifyLibsScripts']);
