var gulp = require('gulp'),
    debug = require('gulp-debug'),
    del    = require('del'),
    gCat = require('../index');

gulp.task('clean', function() {
    del(['build']);
});

gulp.task('lang', function() {
    gulp.src('lang.csv')
        .pipe(debug({title: "read"}))
        .pipe(gCat())
        .pipe(debug({title: "result"}))
        .pipe(gulp.dest('build'));
});