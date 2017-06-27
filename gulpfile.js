"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var newer = require("gulp-newer");
var image = require("gulp-image");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions"]}),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png.jpg.gif}")
    .pipe(newer("build/img"))
    .pipe(image({
      mozjpeg: false,
      jpegoptim: false,
      jpegRecompress: true
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("build/img/**/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});


gulp.task("build", function(fn){
  run(
    "clean",
    "copy",
    "style",
    "images",
    "sprite",
    fn
  );
});

gulp.task("copy", function(){
  return gulp.src([
    "fonts/**/*.{woff,woff2,ttf}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
  return del("build");
});

gulp.task("html:copy", function() {
  return gulp.src("*html")
  .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done){
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});
