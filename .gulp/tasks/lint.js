const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});

gulp.task('lint-source', () => gulp.src('lib/**').pipe(g.eslint())
  .pipe(g.eslint.format())
  .pipe(g.eslint.failOnError()));

gulp.task('lint-test', () => gulp.src('test/**').pipe(g.eslint({
  extends: 'airbnb',
  plugins: [
    'mocha',
  ],
  rules: {
    'mocha/no-exclusive-tests': 'error',
  },
}))
  .pipe(g.eslint.format())
  .pipe(g.eslint.failOnError()));

gulp.task('lint-gulp-tasks', () => gulp.src('.gulp/tasks/**').pipe(g.eslint())
  .pipe(g.eslint.format())
  .pipe(g.eslint.failOnError()));

gulp.task('lint', ['lint-source', 'lint-test', 'lint-gulp-tasks']);

