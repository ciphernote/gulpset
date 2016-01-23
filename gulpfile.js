// package import
var gulp = require('gulp');
var browser = require("browser-sync");
var jade = require("gulp-jade");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var plumber = require("gulp-plumber");

/*  Config for your environment */

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "build/static"
        }
    });
});

gulp.task('jade', function () {
  gulp.src('assets/template/*.jade')
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest('./build/static/'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('sass', function() {
  gulp.src('assets/sass/*scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./build/static/css'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('js', function() {
  gulp.src('assets/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/static/js'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('image', function() {
  gulp.src('assets/img/*.{png,jpg,jpeg}')
  .pipe(imagemin())
  .pipe(gulp.dest('./build/static/img'))
  .pipe(browser.reload({stream:true}))
});

gulp.task("default",['server','jade','sass','js','image'], function() {
  gulp.watch("assets/js/**/*.js",["js"]);
  gulp.watch("assets/sass/*.scss",["sass"]);
  gulp.watch(["assets/template/*.jade","assets/template/**/_*.jade"],["jade"]);
  gulp.watch("assets/img/*.{png,jpg,jpeg}",["image"]);
});
