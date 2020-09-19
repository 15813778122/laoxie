//遵从commonJS规范  代码同步执行
//内置模块早就下载好了，直接从磁盘读取就行。
const os = require("os");

console.log(os.hostname());
console.log(os.homedir());


const fs = require("fs");

//如果这个文件路径不存在，自动创建
fs.writeFile("hello.json", "他好~", (err) => {
    console.log("写入成功");
})