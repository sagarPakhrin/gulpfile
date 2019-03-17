const { src, dest  } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const minifyCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


const SCSS_SRC = './scss/**/*.scss';
const SCSS_DEST = './css';

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


function css() {
  return gulp
    .src(SCSS_SRC)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest(SCSS_DEST))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(SCSS_DEST))
    .pipe(browsersync.stream());
}


function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch("./**/*.html", browserSyncReload);
}


// define complex tasks
const build = gulp.parallel(css);
const watch = gulp.parallel(watchFiles, browserSync);


watch(SCSS_SRC,css,browserSyncReload,watchFiles)
// export tasks
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
