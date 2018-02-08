'use strict';
//Plugins and modules

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Project constants

// Build --------------------------------------------------

gulp.task('build:html', () =>
    gulp.src('app/index.html')
    .pipe(gulp.dest('build'))
);

gulp.task('build:clean', ()=>
    del('build')
);

gulp.task('build:sass', ()=>
    gulp.src('app/blocks/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
);

gulp.task('build:assets', () => {
        gulp.src('app/img/**/*.*')
            .pipe(gulp.dest('build/img'));
        gulp.src('app/slides/**/*.*')
            .pipe(gulp.dest('build/img/slides'));
        gulp.src('app/fonts/**/*.*')
            .pipe(gulp.dest('build/fonts'));
});


gulp.task('build', ['build:html', 'build:sass', 'build:assets']); // Entry point for build

gulp.task('build:watch', ()=> {
        gulp.watch('app/index.html', ['build:html', browserSync.reload]);
        gulp.watch('app/blocks/**/*.sass', ['build:sass', browserSync.reload]);
        gulp.watch('app/{img,slides,fonts}/**/*.*', ['build:assets', browserSync.reload])
    }
);



// Prod ----------------------------------------------------

gulp.task('prod:sass', ()=>
    gulp.src('app/blocks/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('prod/css'))
);

gulp.task('prod:assets', () =>
    gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('prod/img'))
);

gulp.task('prod:clean', ()=>
    del('prod')
);

gulp.task('prod:html', ()=>
    gulp.src('app/index.html')
        .pipe(gulp.dest('prod'))
);

gulp.task('prod', ['prod:html', 'prod:assets', 'prod:sass']); // Entry point for prod


// Common tasks --------------------------------------------

gulp.task('clean', ['build:clean', 'prod:clean']);

gulp.task('serve',()=>
    browserSync.init({
        server: 'build'
    })
);

gulp.task('default', ['build', 'serve', 'build:watch']);