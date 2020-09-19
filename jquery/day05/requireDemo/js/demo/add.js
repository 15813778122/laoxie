//在这里，写一个模块，这个模块有些简单的方法

//实现一个求两个数之和的方法  遵从AMD规范进行模块化开发（固定写法）
define(function(){
    function add(x, y){
        return "两个数之和是：" + (x + y);
    }

    function show(){
        console.log("hello world");
    }

    //对外暴露
    return {
        //对外的名字: 自己封装的函数名
        addFunc: add,
        showFunc: show
    }
})