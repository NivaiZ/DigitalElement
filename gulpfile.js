"use strict";
const gulp = require("gulp");
var plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore")
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const terser = require("gulp-terser");
const less = require("gulp-less");

gulp.task("scripts:index", function () {
  return gulp.src(["source/js/module/*.js", "source/js/*.js"])
    .pipe(plumber())
    .pipe(concat("index.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("scripts-min:index", function () {
  return gulp.src(["source/js/module/*.js", "source/js/*.js"])
    .pipe(terser())
    .pipe(plumber())
    .pipe(concat("index.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(postcss([autoprefixer({
      browsers: [
        "last 2 versions",
        "not dead",
        "not ie <= 11"
      ]
    })]))
    .pipe(less())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {

  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.{less}", gulp.series("css", "refresh"));
  gulp.watch("source/img/logo.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("scripts:index", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [{
          cleanupIDs: false
        },
        {
          removeViewBox: false
        },
        {
          convertPathData: false
        },
        {
          mergePaths: false
        },
        ],
      })
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});


gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source//*.ico",
    "source/js/*.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", 'scripts:index', "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
gulp.task("prod", gulp.series("clean", "copy", 'scripts-min:index', "css", "sprite", "html"));
