var gulp = require('gulp');
var tinypng_nokey = require('gulp-tinypng-nokey');
var javascriptObfuscator = require("gulp-javascript-obfuscator");
//var gulpcache = require("gulp-cache");


//压缩图片
gulp.task('default', function (cb) {
    //gulp.src(["./build/fb-instant-games/Dragon/res/raw-assets/**/*.{png,jpg,jpeg}"])
    //gulp.src(["./build/fb-instant-games/Dragon/res/raw-assets/[0-9][0-9]/*.{png,jpg,jpeg}"])
    //gulp.src(["./build/fb-instant-games/Dragon/res/raw-assets/[0-9][a-f]/*.{png,jpg,jpeg}"])
    //gulp.src(["./build/fb-instant-games/Dragon/res/raw-assets/[a-f][0-9]/*.{png,jpg,jpeg}"])
    gulp.src(["./build/fb-instant-games/Dragon/res/raw-assets/[a-f][a-f]/*.{png,jpg,jpeg}"])
        .pipe(tinypng_nokey())
        .pipe(gulp.dest("./build/fb-instant-games/Dragon/res/raw-assets/"))
        .on("end", cb);
});

// 混淆方法一：
// gulp.task("default", function (cb) {
//     gulp.src(["./build/fb-instant-games/Dragon/src/project.js"])// 参数含义  地址  https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
//         .pipe(javascriptObfuscator({
//             // compact: true,//类型：boolean默认：true
//             mangle: true,//短标识符的名称，如a，b，c
//             stringArray: true,
//             target: "browser",
//         }))
//         .pipe(gulp.dest("./build/fb-instant-games/Dragon/src/")
//             .on("end", cb));
// });

// 混淆方法二：
var javascriptObfuscator = require("gulp-javascriptobfuscator");
gulp.task("default", function (cb) {
    gulp.src(["./build/fb-instant-games/Dragon/src/project.js"])
        .pipe(javascriptObfuscator({
            exclusions: ["^NumberUtil"]
        }))
        .pipe(gulp.dest("./build/fb-instant-games/Dragon/src/")
            .on("end", cb));
});
