var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	cluster = require('cluster'),
	compress = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	jshintReporter = require("jshint-stylish"),
	less = require('gulp-less'),
	mochaPhantomJS = require('gulp-mocha-phantomjs'),
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
	return gulp.src(["./app/**/*.js", "test/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('styles', function () {

	gulp.src(['bower_components/bootstrap/fonts/*'], {
		base: 'bower_components/bootstrap/fonts'
	}).pipe(gulp.dest('./public/fonts'));

	return gulp.src('./app/client/styles/index.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(rename('app.css'))
		.pipe(gulp.dest('./public/styles'))
		.on('end', livereload('.css'));
});

gulp.task('scriptsApp', function () {
	return gulp.src('')
		.pipe(shell([
			'./node_modules/.bin/browserify ./app/client/scripts/index.js -d -s app -o ./public/scripts/app.js'
		]))
		.on('end', livereload('.js'));
});

gulp.task('scriptsLib', ['jshint'], function () {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-route/angular-route.js',
		'./node_modules/underscore/underscore.js',
		'./node_modules/async/lib/async.js',
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

gulp.task("tests", function () {
	// [
	// 	'http://localhost:3000/testClient/angular.html',
	// ].forEach(function (_html) {
	// 	gulp.src(_html).pipe(mochaPhantomJS());
	// });
	// gulp.src('')
	// 	.pipe(shell([
	// 		'./node_modules/.bin/mocha-phantomjs -p ./node_modules/.bin/phantomjs http://localhost:3000/testClient/angular.html'
	// 	]));
	gulp.src('')
		.pipe(shell([
			'./node_modules/.bin/mocha'
		]));
});

gulp.task('server', function () {
	cluster.setupMaster({
		exec: "./app/server/scripts/index.js"
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
gulp.task('minify', [ /*'minifyAppScripts', 'minifyLibsScripts'*/ ]);