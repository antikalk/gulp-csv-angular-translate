var gulp = require('gulp'),
    debug = require('gulp-debug'),
    del    = require('del'),
    gsat = require('../index');

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('lang', function() {
    gulp.src('lang.csv')
        .pipe(debug({title: "read"}))
        .pipe(gsat())
        .pipe(debug({title: "result"}))
        .pipe(gulp.dest('build'));
});