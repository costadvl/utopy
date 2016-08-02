var gulp = require('gulp');
var browserSync = require('browser-sync');
var karma = require('karma').Server;

/* serve the app */
gulp.task('serve',function(){
  browserSync.init({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['app/***.*'])
    .on('change', browserSync.reload)
});

gulp.task('test-browser',function(){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  })
});

gulp.task('serve-test',function(){
  browserSync.init({
    notify: false,
    port: 8081 ,
    server: {
      baseDir: ['test','app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  })
});
