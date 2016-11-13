const path = require('path');
const os = require('os');
const gulp = require('gulp');
const gutil = require('gulp-util');
const open = require('gulp-open');
const clean = require('gulp-clean');
const ngConstant = require('gulp-ng-constant');
const gls = require('gulp-live-server');
const copy = require('gulp-copy');
const inject = require('gulp-inject');
const webpack = require('webpack');
let config;
let webpackConfig;

var defaultStatsOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

gulp.task('set-dev', function () {
  process.env.NODE_ENV = 'development';
  config = require('./server/config/environment');
});

gulp.task('set-prod', function () {
  process.env.NODE_ENV = 'production';
  config = require('./server/config/environment');
});

gulp.task('ngConstant', function () {
  return ngConstant({
    name: 'pickngoApp.constants',
    deps: [],
    stream: true,
    wrap : 'commonjs',
    constants : {
      appConfig : require('./server/config/environment/shared')
    }
  }).pipe(gulp.dest('./client/app/'));
});

gulp.task('inject:js', function () {
  return gulp.src('./client/index.js')
    .pipe(inject(gulp.src(['./client/{app,components}/**/!(*.spec|*.mock).js', '!./clint/app/app.js'], {read: false}), {
      starttag: '// injector',
      relative: true,
      endtag: '// endinjector',
      transform: function(filePath) {
        return 'require(\'./' + filePath + '\');';
      }
    }))
    .pipe(gulp.dest('./client'));
});

gulp.task('inject:style', function () {
  return gulp.src('./client/app/app.styl')
    .pipe(inject(gulp.src(['./client/{app,components}/**/*.{css,styl}','!./client/app/app.styl'], {read: false}), {
      starttag: '// injector',
      relative: true,
      endtag: '// endinjector',
      transform: function(filePath) {
        return '@import \'./' + filePath + '\';';
      }
    }))
    .pipe(gulp.dest('./client/app/'));
});

let callingDone = false;
let firstCompile = true; 
gulp.task('webpack', ['ngConstant','inject:js', 'inject:style', 'clean'], function (cb) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw err; // hard error
    }
    console.log(stats.toString(defaultStatsOptions));
    if (!cb.called) {
      cb.called = true;
      cb();
    }
  });
});

gulp.task('server', ['webpack'], function () {
  const server = gls.new('./server/index.js');

  server.start();
  console.log('add public watch');
  gulp.watch([path.join(webpackConfig.output.path, '/*.{html,css,js}')], function (file) {
    console.log('public file changed');
    server.notify.apply(server, [file]);
  });
  console.log('add server watch');
  gulp.watch(['./server/**/*.js'] , function() {
    console.log('server file changed');
    server.start.bind(server)();
  });
});



gulp.task('watch:inject', function () {
  gulp.watch(['client/{app,components}/**/*.{css,styl}'], function (event) {
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.run('inject:style');
    }
  });
  gulp.watch(['client/{app,components}/**/!(*.spec|*.mock).js'], function (event) {
    if (event.type === 'added' || event.type === 'deleted') {
      gulp.run('inject:js');
    }
  });
});


gulp.task('clean:dist', function (cb) {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('clean', function (cb) {
  webpackConfig = require('./webpack.config.js');
  return gulp.src(webpackConfig.output.path, {read: false})
    .pipe(clean());
});

gulp.task('default', ['set-dev', 'server', 'watch:inject'], function () {
  var browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : 'chrome');
  var options = {
    uri: 'http://localhost:' + config.port,
    app: browser
  };
  return gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('build', ['clean:dist', 'set-prod', 'webpack'], function () {
  return gulp.src(['./package.json','./server/**'])
    .pipe(copy('./dist/'));
});