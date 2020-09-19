//封装函数，commonJS对外暴露
function show(){
    console.log("hello world");
}
function add(x, y){
    return x + y;
}

//对外暴露
module.exports = {
    show: show,
    add: add
}