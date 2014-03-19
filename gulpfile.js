var gulp = require('gulp'),
    compress = require('gulp-uglify'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload'),
    bower = require('gulp-bower'),
    clean = require('gulp-clean'),
    cluster = require('cluster')
    path = require('path');

var liveReloadServer = livereload();

var worker;

gulp.task('styles', function() {
    gulp.src('./app/client/styles/index.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload())
});

gulp.task('scripts', function() {

    gulp.src(['./app/client/scripts/index.js'])
        .pipe(browserify({
            debug : true
        }))
        //.pipe(compress())
        .pipe(concat('../public/app.js'))
        .pipe(gulp.dest('./public/'))
        .pipe(livereload())
});

gulp.task('markup', function() {

    gulp.src(['./app/client/markup/**/*.*'])
        .pipe(gulp.dest('./public/'))
        .pipe(livereload())
});

gulp.task('server', function() {

    cluster.setupMaster({
        exec : "./server.js"
    });

    if (worker) {
        worker.kill();
    }
    worker = cluster.fork();

});

gulp.task('bower', function() {
    bower()
        .pipe(gulp.dest('bower_components/'))
});

gulp.task('clean', function() {
    gulp.src(['./node_modules', './bower_components', './public'], {read: false})
        .pipe(clean());
});

//Works well with this https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

gulp.task('watch', function() {
    gulp.watch(['./app/client/styles/**/*.less'], ['styles']);
    gulp.watch(['./app/client/scripts/**/*'], ['scripts']);
    gulp.watch(['././app/client/markup/**/*.html'], ['markup']);
    gulp.watch(['./server.js'], ['server']);
});

gulp.task('default', ['bower', 'styles', 'scripts', 'markup', 'server', 'watch']);

