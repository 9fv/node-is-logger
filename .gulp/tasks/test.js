const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});

gulp.task('test', () =>
  gulp.src('test/**', {read: false})
    .pipe(g.mocha({reporter: 'nyan'})));

