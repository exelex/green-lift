var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
	browserSync = require('browser-sync'),
    del         = require('del')
    rename      = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    svgSprite   = require('gulp-svg-sprite'),
    svgmin      = require('gulp-svgmin'),
    cheerio     = require('gulp-cheerio'),
    replace     = require('gulp-replace');
    
    
    

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



// sprite-svg

var basePaths = {
    src: 'app/sprite-svg-build/',
    dest: '',
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


gulp.task('sprite', function () {
    return gulp.src(paths.sprite.src)
        .pipe(svgmin({ //минификация иконок
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({ //редактирование/удаление лишних атрибутов из svg-файлов
            run: function ($) {
                $('[fill]').attr('fill', '#545454');
                $('[stroke]').removeAttr('stroke');
                $('[opacity]').removeAttr('opacity');
                $('[fill-opacity]').removeAttr('fill-opacity');
                $('[style]').removeAttr('style');
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
                            template: "app/sprite-svg-build/sprite-template.sass"
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





gulp.task('watch', ['browser-sync', 'sass'], function(){
    gulp.watch('app/sass/**/*.s*ss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('default', ['watch']);




















