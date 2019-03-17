const { src, dest  } = require('gulp');
const { watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


const SCSS_SRC = './scss/**/*.scss';
const SCSS_DEST = './css';

function compile_sass(){
		return src(SCSS_SRC)
		.pipe(sass())
		.pipe(minifyCss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(SCSS_DEST))
		// .pipe(browserSync.reload({stream:true}));
		.pipe(browserSync.stream());
}

function serve() {
		browserSync.init({
				server:{
						baseDir:"./"
				},
				port:3000
		});
}
function reloadServer() {
		return src("*.html")
		.pipe(browserSync.reload());
}

// All events will be watched
watch(SCSS_SRC,compile_sass,serve, reloadServer)

exports.default = serve;
