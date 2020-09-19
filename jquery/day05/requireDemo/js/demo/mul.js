//求两数的积
//有一位叫做B的同学，也写好了模块
define(function(){
    function mul(x, y){
        return "两个数的积是：" + x * y;
    }
    function show(){
        console.log("我是B同学开发的show方法")
    }

    //一般情况下我们将同一类的函数放在一个模块下

    return {
        mul: mul,
        show: show
    }
})