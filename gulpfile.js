'use strict';

var runSequence = require('run-sequence');

var gulp = require('./gulp')([
    'less'
]);


gulp.task('watch', [ 'less' ]);

gulp.task('build', function (callback) {

});
