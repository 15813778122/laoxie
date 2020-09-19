//引入自定义模块
/*
    引入自定义模块，前面加./再加引入路径
    .js后缀可以省略

    require("hello");
    1、优先去查找内置模块
    2、如果查找不到，去查找node_modules 第三方模块
    3、如果查找不到，再去查找自定义模块。

    前面路径加 ./，直接从当前目录，查找 ./hello.js这个文件，加载效率会提高。

*/
const hello = require("./demo/hello");

hello.show();
console.log(hello.add(10, 20));