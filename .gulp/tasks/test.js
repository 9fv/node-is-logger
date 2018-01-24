const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});
const isparta = require('isparta');

gulp.task('pre-test', () => {
  return gulp.src(['./lib/*.js'])
  // Covering files
    .pipe(g.istanbul())
    // Force `require` to return covered files
    .pipe(g.istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () =>
  gulp.src('test/**', {read: false})
    .pipe(g.mocha({reporter: 'nyan'}))
    .pipe(g.istanbul.writeReports())
    .pipe(g.istanbul.enforceThresholds({thresholds: {global: 90}})));


gulp.task('istanbul', () => {
  return gulp.src(['./lib/**/*.js'])
    .pipe(g.istanbul({
      includeUntested: true,
      // supports es6
      instrumenter: isparta.Instrumenter,
    }))
    .on('end', () => {
      gulp.src('test/**/*.js', {read: false})
        .pipe(g.mocha())
        .pipe(g.istanbul.writeReports({reporters: ['text']}))
        .pipe(g.istanbul.enforceThresholds({thresholds: {global: 80}}));
    });
})
