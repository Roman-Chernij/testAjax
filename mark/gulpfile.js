    const gulp            = require('gulp'), // Подключаем Gulp
          sass            = require('gulp-sass'),// компилатор с SCSS в CSS
          browserSync     = require('browser-sync'),
          concat          = require('gulp-concat'),// соединяет файлы
          uglify          = require('gulp-uglifyjs'),// минифицирует JAVASCRIPT
          rename          = require('gulp-rename'),//переименовывает файлы
          autoprefixer    = require('gulp-autoprefixer'),//добавлеет префиксы CSS
          del             = require('del'),
          imagemin        = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
          pngquant        = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
          cache           = require('gulp-cache'); // кеш для картинок, при сборке продакшена экономит время....вроди
          autopolyfiller  = require('gulp-autopolyfiller'),// добавляет поддрежку старых браузеров для JAVASCRIPT
          merge           = require('event-stream').merge,
          order           = require("gulp-order"),
          babel           = require('gulp-babel'),
          csso            = require('gulp-csso'),
          sourcemaps      = require('gulp-sourcemaps'),
          plumber         = require('gulp-plumber'),
          inject          = require('gulp-inject');


    //CSS files
gulp.task('sass:inject', () => {
    // gulp.src('./app/scss/style.scss')
    // .pipe(inject(gulp.src([
    //     './app/scss/basis/index.scss',
    //     './app/scss/layout/*.scss',
    //     './app/scss/modules/*.scss',
    //     './app/scss/state/*.scss',
    //     './app/scss/theme/*.scss'
    // ], {read: false}), { relative: true }))
    // .pipe(gulp.dest('./app/scss'));

    var url =  {
            basis: 'app/scss/basis/index.scss',
            layout: 'app/scss/layout/*.scss',
            modules: 'app/scss/modules/*.scss',
            state: 'app/scss/state/*.scss',
            theme: 'app/scss/theme/*.scss',
            style: 'app/scss/style.scss'
        },
    target = gulp.src(url.style),
    sources = gulp.src([
        url.basis,
        url.layout,
        url.modules,
        url.state,
        url.theme
    ], {
      read: false
    })

    return target
      .pipe(inject(sources, {
        relative: true
      }))
      .pipe(gulp.dest('app/scss'))
  });

gulp.task('sass', ['sass:inject'],  () => {
     gulp.src([
        'app/libs/libs.scss',
        'app/scss/style.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer([
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
    ]))
    .pipe(concat('style.css'))
    .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('scripts', () => {
   var all = gulp.src([
     "app/js/Helper.js",
     "app/js/App.js",
     "app/js/components/*.js"
  ])

   .pipe(plumber())
   .pipe(sourcemaps.init())
   .pipe(babel({
           presets: ['es2015']
       }));

  let polyfills = all.pipe(autopolyfiller('polyfills.js', {
     browsers: [ 'Android 2.3',
                 'Android 4',
                 'Chrome 20',
                 'Firefox 24',
                 'ie 8',
                 'ie 9',
                 'iOS 6',
                 'Opera 12',
                 'Safari 6']
 }));

   let libs = gulp.src([
    "app/libs/*.js"
  ])
  .pipe(concat('libs.js'));

  return merge(polyfills, all, libs)
    .pipe(order([
        'polyfills.js',
        'libs.js',
        'all.js'
    ]))

    .pipe(concat('build.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist'))

    .pipe(browserSync.reload({stream: true}))
});


gulp.task('browserSync', () => {
    browserSync({
        server:{
            baseDir: 'app'
    },
    notify: false
    });
});

gulp.task('img', () => {
        return gulp.src('app/images/**/*')
            .pipe(cache(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            })))
            .pipe(gulp.dest('app/images'));
    });

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('clean', function () {
    return del.sync('app/dist');
});

gulp.task('watch', ['browserSync', 'sass', 'scripts'], () => {
    gulp.watch('app/scss/**/*.+(scss|sass)' , ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/components/*.js', ['scripts']);
    gulp.watch('app/libs/libs.scss', browserSync.reload);
    gulp.watch('app/img/**/*', ['img']);
});

gulp.task('default', ['watch']);
