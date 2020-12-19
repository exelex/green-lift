var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del         = require('del')
    rename      = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    svgSprite   = require('gulp-svg-sprite'),
    svgmin      = require('gulp-svgmin'),
    cheerio     = require('gulp-cheerio'),
    replace     = require('gulp-replace'),
    cssVersioner = require('gulp-css-url-versioner'),
    spritesmith = require('gulp.spritesmith');
    
    
    

// сборка sass
gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.s*ss')
       .pipe(sass().on('error', sass.logError))
       .pipe(sass({outputStyle: 'compressed'})) //минификация
       .pipe(autoprefixer([
            'last 15 versions', 
            'ie > 10', 
            'firefox > 25', 
            'safari >= 8', 
            'ios >= 7', 
            'android > 4.1'
        ], {cascade: true}))
       .pipe(rename(function (path) { //переименование в .min
            path.basename += ".min";
            path.extname = ".css"
        }))
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({stream: true}))
});


// добавление версии файла
gulp.task('css-version', function() {
    return gulp.src('app/dev/_sprite-svg.sass')
    .pipe(cssVersioner({
        version: Math.random()
    }))
    .pipe(gulp.dest('app/sass/'));
});


// sprite-svg

var basePaths = {
    src: 'app/dev/sprite-svg-build/',
    dest: '.',
};
var paths = {
    images: {
        src: basePaths.src + 'img/',
        dest: basePaths.dest + 'img/'
    },
    sprite: {
        src: basePaths.src + 'icons/*',
        svg: 'app/img/sprite.svg',
        css: 'app/sass/_sprite-svg.sass'
    },
    templates: {
        src: basePaths.src + 'tpl/'
    }
};


gulp.task('sprite-dev', function () {
    return gulp.src(paths.sprite.src)
        .pipe(svgmin({ //минификация иконок
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({ //редактирование/удаление лишних атрибутов из svg-файлов
            run: function ($) {
                // $('[fill]').attr('fill', '#545454');
                // $('[stroke]').removeAttr('stroke');
                // $('[opacity]').removeAttr('opacity');
                // $('[fill-opacity]').removeAttr('fill-opacity');
                // $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>')) //исправляем баг с заменой cheerio > на &gt;
        .pipe(svgSprite({
            shape: {
                spacing: {
                    padding: 0
                }
            },
            mode: {
                css: {
                    dest: "./",
                    layout: "diagonal",
                    sprite: paths.sprite.svg,
                    bust: false,
                    render: {
                        sass: {
                            dest: "app/sass/_sprite-svg.sass",
                            template: "app/dev/sprite-svg-build/sprite-template.sass"
                        }
                    }
                }
            },
            variables: {
                mapname: "icons"
            }
        }))
        .pipe(gulp.dest(basePaths.dest));
});

// end sprite


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
        
    })
});


gulp.task('sprite-dev-png', function() {
    var spriteData = 
        gulp.src('sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: '../img/sprite.png',
                cssName: '_sprite.sass',
                padding: 5,
                cssFormat: 'sass',
                cssTemplate: 'sprite-png.sass.handlebars'
            }));

    spriteData.img.pipe(gulp.dest('app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});


gulp.task('sprite-png', gulp.series('sprite-dev-png'));

gulp.task('sprite', gulp.series('sprite-dev'));


gulp.task('watch', gulp.parallel('browser-sync', 'sass', function(){
    gulp.watch('app/sass/**/*.s*ss', gulp.series('sass'));
    gulp.watch('app/*.html', browserSync.reload);
}));


gulp.task('default', gulp.series('watch'));


















