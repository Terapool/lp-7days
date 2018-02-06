'use strict';
//Plugins and modules

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

// Project constants

// Build --------------------------------------------------

gulp.task('build:html', () =>
    gulp.src('app/index.html')
    .pipe(gulp.dest('build'))
);

gulp.task('build:clean', ()=>
    del('build')
);

gulp.task('build', ['build:html']); // Entry point for build

gulp.task('build:watch', ()=>
    gulp.watch('app/index.html', ['build:html', browserSync.reload])
);



// Prod ----------------------------------------------------

gulp.task('prod:clean', ()=>
    del('prod')
);

gulp.task('prod:html', ()=>
    gulp.src('app/index.html')
        .pipe(gulp.dest('prod'))
);

gulp.task('prod', ['prod:html']); // Entry point for prod


// Common tasks --------------------------------------------

gulp.task('clean', ['build:clean', 'prod:clean']);

gulp.task('serve',()=>
    browserSync.init({
        server: 'build'
    })
);

gulp.task('default', ['build', 'serve', 'build:watch']);