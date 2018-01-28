const gulp = require('gulp');
const g = require('gulp-load-plugins')({lazy: true});
const path = require('path');

const SETTINGS = require('../settings.json');


gulp.task('docs', () => {
  return gulp.src(path.join(SETTINGS.sources.path, SETTINGS.sources.pattern))
    //.pipe(g.jsdocToMarkdown({ template: fs.readFileSync('./readme.hbs', 'utf8') }))
    .pipe(g.jsdocToMarkdown())
    .on('error', (err) => {
      g.util.log(g.util.colors.red('jsdoc2md failed'), err.message);
    })
    .pipe(g.rename((p) => {
      p.extname = '.md'; // eslint-disable-next-line no-param-reassign
    }))
    .pipe(gulp.dest('doc'));
});
