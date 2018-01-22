const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});

gulp.task('lint', function() {
  return gulp.src('lib/**').pipe(g.eslint({
    'rules':{
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    }
  }))
  .pipe(g.eslint.format())
  // Brick on failure to be super strict
  .pipe(g.eslint.failOnError());
});

