var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    watchify = require('watchify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'), //Convert streaming vinyl to buffer for uglify 
    bundler = watchify(browserify('./app/app.js'), {debug: true}),
    mocha = require('gulp-mocha');

bundler.on('update', bundle);

function bundle() {
    gutil.log('Compiling JS...');
    return bundler.bundle().on('error', function(err) {
            gutil.log(err.message);
            browserSync.notify('Browserify Error!');
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream({
            once: true
        }));
}

gulp.task('bundle', function() {
    return bundle();
});

gulp.task('styles', function() {
    return gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['styles', 'bundle'], function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('./app/views/templates/*.hbs').on('change', browserSync.reload);
});

gulp.task('test', function() {
    return gulp.src('./test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});


// gulp.task('browserify', function() {
//     return browserify('js/app.js').bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('./build/'));
// });

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
// });


// gulp.task('default', ['styles', 'browser-sync'], function() {
//     gulp.watch('scss/*.scss', ['styles']);
//     gulp.watch('js/*.js', ['scripts']);
//     gulp.watch('*.html').on('change', browserSync.reload);
// });