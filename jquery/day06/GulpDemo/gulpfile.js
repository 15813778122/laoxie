//gulp遵从commonJS规范
//【注】gulp就相当于我们给当前项目请了一个保姆，gulpfile.js这个文档，是给gulp编写任务。

const gulp = require("gulp");

/*
    第一个参数任务名
    第二个参数回调函数
*/
gulp.task("hello", function(){
    console.log("hello world");
})

//拷贝.html页面
gulp.task("copy-html", function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})


gulp.task("images", function(){
    // return gulp.src("images/*.jpg").pipe(gulp.dest("dist/images"));
    // return gulp.src("images/*.{jpg,png}").pipe(gulp.dest("dist/images"));
    //想要拷贝外面和文件夹内的所有图片
    // return gulp.src("images/*/*").pipe(gulp.dest("dist/images"));
    return gulp.src("images/**/*").pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//数据源文件，我们可以放在一个目录下就ok
//拷贝多个文件，到一个目录下
gulp.task("data", function(){
    return gulp.src(["json/*.json", "xml/*.xml", "!xml/3.xml"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})


/*
    一次性执行多个任务
*/
gulp.task("build", ["copy-html", "images", "data"], function(){
    console.log("编译成功");
})




//gulp本身的功能呢是没有太多吸引力的，gulp真正强大的是可以添加插件。
//www.gulpjs.com/plugins/   有将近4000个插件，给大家提供额外拓展的功能。
/*
    gulp-scss（在飞哥电脑上有点问题）
    gulp-sass  这两个大家都去试一下，哪个好用用哪个。
    用来处理咋们的scss文件，scss文件批量生成css代码。【注】可以通过编程的方式编写css。

    gulp插件是第三方模块
        <1>下载插件到本地
            cnpm install 插件名字 --save-dev
            cnpm i 插件名字 -D
        <2>查文档、抄代码
*/

//gulp-minify-css  压缩css代码   .css未压缩版(开发版)   .min.css压缩版(上线版本)
//gulp-rename  重命名文件

const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function(){
    gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})


//将多个.js文件，合并成一个
//类似于jquery.js这样的框架类代码，或者通过jquery框架编写代码，不要合并。
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function(){
    return gulp.src(["javascript1/show.js", "javascript2/hello.js"])
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})


/*
    gulp的监听操作  只要代码发生变化，就可以自动执行任务，完成更新。
*/
gulp.task("watch", function(){
    /*
        第一个参数， 监听的文件的路径
        第二个参数， 监听到文件发生变化以后，执行的任务
    */
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("images/**/*", ["images"]);
    gulp.watch(["json/*.json", "xml/*.xml", "!xml/3.xml"], ["data"]);
    gulp.watch("stylesheet/index.scss", ['scss']);
    gulp.watch(["javascript1/show.js", "javascript2/hello.js"], ['scripts']);
})


//想在当前目录下启动一个临时的服务器 gulp-connect
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",  //指定服务器根目录
        port: 7777,    //设置端口号
        livereload: true
    })
})

//同时启动监听和服务器，并且能够实现实时刷新
//设置默认任务  默认任务  直接通过 gulp 去执行
gulp.task("default", ["watch", "server"]);

/*
    【注】一定不要去修改dist中的任何代码，dist中的代码是gulp自动生成的。
    【注】通过修改外面的文件，触发任务，任务自动整理到dist中。
    【注】路径要以，dist下路径为准。

    任何一个项目，都必须从头搭建gulp。
*/