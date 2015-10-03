// package import
var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');

/*  Config for your environment */

gulp.task("sass", function() {
	gulp.src('assets/**/*scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('./build/static/css'));
});

gulp.task('jade', function () {
	gulp.src('assets/**/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./build/static/'));
});

gulp.task('js', function() {
	gulp.src(['assets/js/**/*.js','!assets/js/min/**/*.js'])
	.pipe(uglify())
	.pipe(gulp.dest('./build/static/js'));
});

gulp.task('default', ['jade','sass','js']);