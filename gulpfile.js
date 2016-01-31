var gulp = require('gulp');
var $ = require("gulp-load-plugins")();
var browser = require("browser-sync");
var bower = require('main-bower-files');

/*  Config for your environment */

var paths = {
  "jadeSrc": "assets/template/*.jade",
  "scssSrc": "assets/sass/*.scss",
  "jsSrc": "assets/js/*.js",
  "rootDir": "build/static/",
  "cssDir": "build/static/css/", // cssを出力するディレクトリ
  "jsDir": "build/static/js/", // jsを出力するディレクトリ
}

var cssLibDir = paths.cssDir + '/lib/'; // CSSのライブラリを出力するディレクトリ

var cssFileName = '_bundle.css'; // concat & generated CSS file name
var jsFileName = '_bundle.js'; // concat & generated js file name

gulp.task('server', function() {
  browser({
    server: {
      baseDir: paths.rootDir
    }
  });
});

// bowerで導入したパッケージのCSSを取ってくるタスク
gulp.task('bowerCSS', function() {
  var cssFilter  = $.filter('**/*.css', {restore: true}),
      lessFilter = $.filter('**/*.less', {restore: true}); // Bootstrapのコアがlessなのでlessをファイルを抽出するフィルター
  return gulp.src(bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }))
    .pipe(cssFilter)
    .pipe($.rename({
      prefix: '_',
      extname: '.css'
    }) )
    .pipe(gulp.dest(cssLibDir))
    // LESSファイルを抽出
    .pipe(cssFilter.restore )
    .pipe(lessFilter)
    // LESSをコンパイル
    .pipe($.less())
    .pipe($.rename({
      prefix: '_',
      extname: '.css'
    }))
    // filter.restoreする前にgulp.destで出力しないとフィルター外のファイルも出力されてしまう
    .pipe(gulp.dest(cssLibDir))
    .pipe(lessFilter.restore);
});

// パッケージのCSSを1つに結合してmin化するタスク
gulp.task('bowerCSS.concat', ['bowerCSS'] ,function() {
  return gulp.src(cssLibDir + '_*.css')
    .pipe($.concat(cssFileName))
    // CSSを1つにしたものを出力
    .pipe(gulp.dest(paths.cssDir))
    .pipe($.minifyCss())
    .pipe($.rename({
      extname: '.min.css'
    }))
    // CSSを1つにしてmin化したものを出力
    .pipe( gulp.dest(paths.cssDir));
});

// bowerで導入したパッケージのjsを取ってきて1つにまとめるタスク
gulp.task('bowerJS', function() {
  var jsFilter = $.filter('**/*.js', {restore: true}); // jsファイルを抽出するフィルター
  return gulp.src(bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }) )
    .pipe(jsFilter)
    .pipe($.concat(jsFileName))
    // jsを1つにしたものを出力
    .pipe(gulp.dest(paths.jsDir))
    .pipe($.uglify({
      // !から始まるコメントを残す
      preserveComments: 'some'
    }))
    .pipe($.rename({
      extname: '.min.js'
    }))
    // jsを1つにしてmin化したものを出力
    .pipe( gulp.dest(paths.jsDir))
    .pipe( jsFilter.restore );
});

gulp.task('jade', function () {
  return gulp.src(paths.jadeSrc)
  .pipe($.jade({pretty: true}))
  .pipe(gulp.dest(paths.rootDir))
  .pipe(browser.reload({stream:true}))
});

gulp.task('sass', function() {
  return gulp.src(paths.scssSrc)
  .pipe($.sass())
  .pipe($.autoprefixer())
  .pipe(gulp.dest(paths.rootDir + 'css'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('js', function() {
  return gulp.src(paths.jsSrc)
  .pipe($.jshint())
  .pipe($.uglify())
  .pipe(gulp.dest(paths.rootDir + 'js'))
  .pipe(browser.reload({stream:true}))
});

gulp.task('image', function() {
  return gulp.src('assets/img/*.{png,jpg,jpeg}')
  .pipe($.imagemin())
  .pipe(gulp.dest(paths.rootDir + 'img'))
  .pipe(browser.reload({stream:true}))
});

gulp.task("default",['server','jade','sass','js','image'], function() {
  gulp.watch("assets/js/**/*.js",["js"]);
  gulp.watch("assets/sass/*.scss",["sass"]);
  gulp.watch(["assets/template/*.jade","assets/template/**/_*.jade"],["jade"]);
  gulp.watch("assets/img/*.{png,jpg,jpeg}",["image"]);
});

// bowerのCSSとJSを取ってくるタスク
gulp.task('bower', ['bowerCSS', 'bowerCSS.concat','bowerJS']);
