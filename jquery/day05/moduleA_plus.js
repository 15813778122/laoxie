var moduleA = (function(mod){
    function showC(){
        console.log("我是新增的函数showC");
    }
    mod.ccc = showC;
    return mod;
})(moduleA || {});