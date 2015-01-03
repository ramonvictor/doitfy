/* jshint node:true */

'use strict';

var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var docco = require('gulp-docco');
// var mocha = require('gulp-mocha');
// var jsdoc = require('gulp-jsdoc');

var JS_SOURCE = 'js/**/*.js';

// JSDOC
// ----
// gulp.src(JS_SOURCE)
//   .pipe(jsdoc('./js-docs'))

var jsFiles = ['gulpfile.js', JS_SOURCE];

// Test
// ----

gulp.task('jscs', function() {
  return gulp.src(jsFiles)
    .pipe(jscs());
});

gulp.task('jshint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// gulp.task('mocha', function() {
//   return gulp.src(['test/**/*.js'], {read: false})
//     .pipe(mocha({
//       reporter: 'dot'
//     }));
// });

gulp.task('test', gulpsync.sync(['jshint', 'jscs']));

gulp.task('default', function() {
  gulp.src(JS_SOURCE)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

