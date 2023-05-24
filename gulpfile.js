const {src, dest, watch, parallel, series, task} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const browserSync  = require('browser-sync').create();
const del          = require('del');
const cleanCss     = require('gulp-clean-css');
const sass         = require('gulp-sass')(require('sass'));
const rename       = require('gulp-rename');

function sassToCss() {
  return src('app/scss/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/css/*.css')
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(cleanCss())
    .pipe(dest('public/css/'))
    .pipe(browserSync.stream());
};

function html() {
  return src('app/*.html')
    .pipe(dest('public/'))
    .pipe(browserSync.stream());
};

function copyAll() {
  return src([
    'app/*html',
    'app/css/*.css',
    'app/js/*.js',
    'app/img/*.*'
  ], {base: 'app'})
    .pipe(dest('public/'))
}

function cleanPublic() {
  return del('public')
}

function browser_sync() {
  browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function watchFiles() {
  watch('app/scss/*.scss', sassToCss);
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/js/*.js').on('change', browserSync.reload);

}

function images() {
  return src('app/img/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
         plugins: [
             {removeViewBox: true},
             {cleanupIDs: false}
         ]
      })
    ]))
}
task(html);
task(images);
task(watchFiles);
task(styles);
task(browser_sync);
task(sassToCss);
task(copyAll);
task(cleanPublic);
task('default', parallel(browser_sync, watchFiles, sassToCss));
task('build', series(cleanPublic, images, copyAll));
