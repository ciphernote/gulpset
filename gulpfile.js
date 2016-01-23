// package import
var gulp = require('gulp');
var browser = require("browser-sync");
var jade = require("gulp-jade");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');

/*  Config for your environment */

var paths = {
  "jadeSrc": "assets/template/*.jade",
  "scssSrc": "assets/sass/*.scss",
  "jsSrc": "assets/js/*.js",
  "rootDir": "build/static/",
}

gulp.task('server', function() {
    browser({
        server: {
            baseDir: paths.rootDir
        }
    });
});

gulp.task('jade', function () {
  return gulp.src(paths.jadeSrc)
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest(paths.rootDir))
  .pipe(browser.reload({stream:true}))
});

gulp.task('sass', function() {
  return gulp.src(paths.scssSrc)
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.rootDir + 'css'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('js', function() {
  return gulp.src(paths.jsSrc)
  .pipe(jshint())
  .pipe(uglify())
  .pipe(gulp.dest(paths.rootDir + 'js'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('image', function() {
  return gulp.src('assets/img/*.{png,jpg,jpeg}')
  .pipe(imagemin())
  .pipe(gulp.dest(paths.rootDir + 'img'))
  .pipe(browser.reload({stream:true}))
});

gulp.task("default",['server','jade','sass','js','image'], function() {
  gulp.watch("assets/js/**/*.js",["js"]);
  gulp.watch("assets/sass/*.scss",["sass"]);
  gulp.watch(["assets/template/*.jade","assets/template/**/_*.jade"],["jade"]);
  gulp.watch("assets/img/*.{png,jpg,jpeg}",["image"]);
});
