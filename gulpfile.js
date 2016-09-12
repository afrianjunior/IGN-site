var gulp         = require('gulp');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var minify       = require('gulp-minify-css');
var merge        = require('merge-stream');
var autoprefixer = require('gulp-autoprefixer');
var order        = require('gulp-order');
var cssimport     = require('css-import');


var PATHS = {
  scripts: [
    'node_modules/vue/dist/vue.js'
  ]
};

gulp.task('styles', function () {
  var bootstrapSassStream = gulp.src(['node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'])
        .pipe(concat('bs.css'))
        .pipe(sass({
            errLogToConsole: true
        }));

  var cssStream = gulp.src([
          'node_modules/cd-font-awesome/index.css',
          'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
          'node_modules/flickity/css/flickity.css',
          'themes/default/frontend/dist/css/star-rating.css',
          'node_modules/imageviewer/dist/viewer.css',
          'themes/default/frontend/dist/css/sb-admin-2.css'
        ])
        .pipe(concat('all.css'));

  var customSassStream = gulp.src(['themes/default/frontend/assets/css/style1.scss'])
        .pipe(concat('custom.css'))
        .pipe(sass());

  var mergedStream = merge(customSassStream, cssStream, bootstrapSassStream)
        .pipe(order(['bs.css', 'all.css', 'custom.css']))
        .pipe(concat('style-final.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(rename({
          suffix: ".min",
          extname: ".css"
        }))
        .pipe(gulp.dest('themes/default/frontend/assets/css/'));

  return mergedStream;
});


gulp.task('styles-user', function () {
  var bootstrapSassStream = gulp.src(['node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'])
        .pipe(concat('bs.css'))
        .pipe(sass({
            errLogToConsole: true
        }));


  var cssStream = gulp.src([
          'node_modules/cd-font-awesome/index.css',
          'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
          'node_modules/flickity/css/flickity.css',
          'themes/default/frontend/dist/css/bootstrap-datetimepicker.min.css',
          'themes/default/frontend/dist/css/sb-admin-2.css',
          'themes/default/frontend/dist/css/AdminLTE.css',
          // 'node_modules/icheck/skins/all.css',
          'themes/default/frontend/assets/css/style-user.css'
        ])
        .pipe(concat('all.css'));


  var customSassStream = gulp.src(['themes/default/frontend/assets/css/style1.scss'])
        .pipe(concat('custom.css'))
        .pipe(sass());

  var mergedStream = merge(customSassStream, cssStream, bootstrapSassStream)
        .pipe(order(['datetime.css', 'bs.css', 'all.css', 'custom.css']))
        .pipe(concat('style-final-user.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(rename({
          suffix: ".min",
          extname: ".css"
        }))
        .pipe(gulp.dest('themes/default/frontend/assets/css/'));

  return mergedStream;
});

gulp.task('awesome-fonts', function () {
  return gulp.src(['node_modules/cd-font-awesome/fonts/fontawesome-webfont.eot', 'node_modules/cd-font-awesome/fonts/fontawesome-webfont.ttf', 'node_modules/cd-font-awesome/fonts/fontawesome-webfont.woff'])
           .pipe(gulp.dest('themes/default/frontend/assets/css/fonts'));
});

gulp.task('glyphicons-fonts', function () {
  return gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2'])
           .pipe(gulp.dest('themes/default/frontend/assets/fonts/bootstrap/'));
});

gulp.task('watch', function () {
    gulp.watch('themes/default/frontend/assets/css/sass/*.scss', function() {
        gulp.run('styles');
    });
});

gulp.task('scripts', function () {
  return gulp.src(PATHS.scripts)
          .pipe(concat('script-final.js'))
          .pipe(gulp.dest('themes/default/frontend/assets/js/'));
});

gulp.task('fonts', ['awesome-fonts', 'glyphicons-fonts']);

gulp.task('default', ['styles', 'styles-user', 'fonts', 'scripts', 'watch']);
