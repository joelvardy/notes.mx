// Load plugins
var del = require('del'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


// Styles
gulp.task('styles', function () {

    return sass('./public/assets/scss/design.scss')
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .on('error', function (error) {
            console.error('Error!', error);
        })
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./public/assets/minified'));

});


// JavaScript
gulp.task('scripts', function () {

    return gulp.src([
        './public/assets/js/vendor/angular.min.js',
        './public/assets/js/vendor/angular.resource.min.js',
        './public/assets/js/vendor/angular.storage.min.js',
        './public/assets/js/vendor/angular.ui-router.min.js',
        './public/assets/js/vendor/sjcl.js',
        './public/assets/js/app.js',
        './public/assets/js/factories/api.js',
        './public/assets/js/factories/note.js',
        './public/assets/js/factories/user.js',
        './public/assets/js/factories/http-interceptor-note-encryption.js',
        './public/assets/js/controllers/authentication.js',
        './public/assets/js/controllers/account.js',
        './public/assets/js/controllers/note-list.js',
        './public/assets/js/controllers/note-edit.js',
        './public/assets/js/config.js',
        './public/assets/js/run.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(gulp.dest('./public/assets/minified'));

});


// Clean
gulp.task('clean', function () {
    del(['./public/assets/minified/*']);
});


// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function () {
    gulp.watch('./public/assets/scss/**/*.scss', ['styles']);
    gulp.watch('./public/assets/js/**/*.js', ['scripts']);
});
