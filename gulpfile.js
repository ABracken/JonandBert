const gulp = require('gulp');
const inject = require('gulp-inject');
const wiredep = require('wiredep').stream;

/* injects the files that you create */
gulp.task('inject', ['inject:bower'], function() {
    let sources = gulp.src([
        './public/js/**/*.js',
        './public/css/**/*.css'
    ]);

    return gulp.src('./public/index.html')
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest('./public/'));
});

/* injects your bower dependencies */
gulp.task('inject:bower', function() {
    return gulp.src('./public/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./public/'));
});
