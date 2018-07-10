const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglifycss = require('gulp-uglifycss');
const webserver = require('gulp-webserver');
// const htmlmin = require('gulp-htmlmin');
const removeEmptyLines = require('gulp-remove-empty-lines');

gulp.task('js', () => {
    return gulp.src('src/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['env', {modules: false}]
            ],
            minified: true
        }))
        .pipe(uglify({
            output: {
                comments: true
            }
        }))
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('/', {addComment: false}))
        .pipe(gulp.dest('src/js'))
});
gulp.task('css',() => {
    return gulp.src('src/css/style.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(removeEmptyLines())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('/', {addComment: false}))
        .pipe(gulp.dest('src/css'));
});
// gulp.task('html',() => {
//     return gulp.src('src/index.html')
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeComments: true
//         }))
//         .pipe(gulp.dest('dist'));
// });
gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', gulp.series('js','css','webserver'));