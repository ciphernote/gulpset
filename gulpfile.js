// package import
var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

/*  Config for your environment */

gulp.task("sass", function() {
        gulp.src("assets/**/*scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("static/css"));
});