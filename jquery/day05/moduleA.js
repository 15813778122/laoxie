var moduleA = (function(mod){
    var _count = 10;   //私有变量

    function showA(){  //私有函数
        _count += 20;
        console.log(_count);
    }

    function showB(){
        _count *= 10;
        console.log(_count);
    }

    mod.aaa = showA;
    mod.bbb = showB;
    
    return mod;
})(moduleA || {});