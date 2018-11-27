const gulp = require('gulp');
const babel = require('gulp-babel');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src('./src/*.jsx')
    .pipe(sourceMaps.init())
    // .pipe(babel())
    .pipe(concat('application.js'))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('public/js'));
});