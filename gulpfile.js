const gulp = require("gulp");
const gulpts = require("gulp-typescript");

gulp.task('build:app', function(){
  const tsProject = gulpts.createProject('tsconfig.json');
  const tsResult = gulp.src('app/**/*.ts')
    .pipe(gulpts(tsProject));

  return tsResult
    .pipe(gulp.dest('build'))
});
