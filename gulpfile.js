var del = require('del');
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var url = require('url');

var PHASER_PATH = './node_modules/phaser/build/';
var PUBLIC_FOLDER_PATH = './public';
var SCRIPTS_PATH = PUBLIC_FOLDER_PATH + '/scripts';
var STATIC_PATH = './static';
var SOURCE_PATH = './src';
var ENTRY_FILE = SOURCE_PATH + '/game.js';
var OUTPUT_FILE = 'game.js';


function cleanBuild() {
    del([PUBLIC_FOLDER_PATH + '**/*.*']);
}

function copyStatic() {
    return gulp.src(STATIC_PATH + '/**/*.*')
        .pipe(gulp.dest(PUBLIC_FOLDER_PATH));
}

function copyPhaser() {
    var srcList = ['phaser.min.js', 'phaser.map', 'phaser.js'];
    srcList = srcList.map(function(file) {
        return PHASER_PATH + file;
    });
    return gulp.src(srcList)
            .pipe(gulp.dest(SCRIPTS_PATH));
}

function compileES6() {
    return browserify({
        paths: [path.join(__dirname, 'src')],
        entries: ENTRY_FILE,
        debug: true,
        transform: [
            [babelify, {presets:['es2015']}]
        ]
    })
    .transform(babelify)
    .bundle().on('error', function(error){
            gutil.log(gutil.colors.red('[BUILD ERROR]', error.message));
            this.emit('end');
        })
    .pipe(source(OUTPUT_FILE))
    .pipe(buffer())
    .pipe(gulp.dest(SCRIPTS_PATH));
}

function serve() {
    browserSync.init({
        ui: {port: 8081},
        port: 8080,
        server: {
            baseDir: PUBLIC_FOLDER_PATH
        },
        browser: 'chrome'
    })
}

function reloadBrowserOnFileChanges() {
    gulp.watch(SOURCE_PATH + '/**/*.js', ["build-dev"]);
    gulp.watch(STATIC_PATH + '/**/*', ["build-dev"]);
    gulp.watch(PUBLIC_FOLDER_PATH + '/**/*.*').on('change', browserSync.reload);
}

gulp.task('copy-static', copyStatic);
gulp.task('copy-phaser', ['copy-static'], copyPhaser);
gulp.task('clean-build', cleanBuild);
gulp.task('serve', ['build-dev'], serve);
gulp.task('browser-sync', ['serve'], reloadBrowserOnFileChanges);
gulp.task('build-dev', ['copy-phaser'], compileES6);
gulp.task('build', ['clean-build', 'copy-phaser'], compileES6);
gulp.task('start', ['browser-sync']);



