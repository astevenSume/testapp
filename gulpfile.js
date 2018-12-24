var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');
var pkg  =require(__dirname + "/package.json");

//这个ok
// gulp.task('bundle-js-other', function(){
//   var b = browserify({entries: './temp/source/js/main.js', debug: true});
//   return b.bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/source/js/'));
// });

gulp.task('bundle-test', function(){
  var b = browserify({standalone:'test', entries: __dirname + '/build/test/bdd.test.js', debug: true});
  return b.bundle()
    .pipe(source("bdd.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + '/bundled/test/'));
});

gulp.task("bundle-e2e-test", function(){
  var b = browserify({standalone:'test', entries: __dirname + '/build/test/e2e.test.js', debug: true});
  return b.bundle()
    .pipe(source("e2e.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + '/bundled/e2e-test/'));
})

gulp.task('lint', function() {
  return gulp.src(['./test/**/**.test.ts'])
          .pipe(tslint({formatter: 'verbose'}))
          .pipe(tslint.report());
})
var tsProject = tsc.createProject('./tsconfig.json');
var tsTestProject = tsc.createProject('./tsconfig-test.json');

gulp.task('build-source',function(){
  return gulp.src(__dirname + '/source/*.ts')
          .pipe(tsProject())
          .pipe(gulp.dest(__dirname + '/build/source/'));
});
gulp.task('build-test',function(){
  return gulp.src(__dirname + '/test/*.test.ts')
          .pipe(tsTestProject())
          .pipe(gulp.dest(__dirname + '/build/test/'));
});


function tscTest(done){
  gulp.src('./test/**/**.test.ts').pipe(tsTestProject()).js.pipe(gulp.dest('./temp/test/'));
  done();
}
gulp.task('default', gulp.series('build-test','build-source','bundle-test', 'bundle-e2e-test'));
