var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rjs = require('gulp-requirejs');

gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('requirejsBuild', function() {
    return rjs({
        baseUrl: 'path/to/your/base/file.js',
        out: 'FILENAME_TO_BE_OUTPUTTED',
        shim: {

        }
    }).pipe(gulp.dest('./deploy/'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browserSync'], function (){
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('scripts/**/*.js', browserSync.reload);
});