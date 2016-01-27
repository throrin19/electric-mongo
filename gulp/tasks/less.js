'use strict';

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber');

module.exports = function () {
    return gulp.src('./less/bootstrap.less')
        .pipe(plumber())
        .pipe(less({
            filename    : 'bootstrap.less',
            paths       : [ './less' ],
            compress    : true
        }))
        .pipe(sourcemaps.init({ loadMaps : true })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./css/'));
};
