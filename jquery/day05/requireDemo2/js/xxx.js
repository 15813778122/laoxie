console.log("加载成功");

//设置引入模块路径
require.config({
    paths: {
        "drag": "yyy/drag",
        "scale": "yyy/scale",
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie"
    },
    shim: {
        //设置依赖关系  先引入jquery以后，再去加载jquery-cookie
        "jquery-cookie": ["jquery"],
    }
})

require(["drag", "scale", "jquery", "jquery-cookie"], function(drag, scale, $){
    $(function(){
        $(document).click(function(){
            alert("我是JQ添加的点击");
        })
    })

    var oDiv1 = document.getElementById("div1");
    var oDiv2 = document.getElementById("div2");
    var oDiv3 = document.getElementById("div3");
    var oBtn = document.getElementById("btn1");

    scale.scale(oDiv2, oDiv1);

    //给div3实现拖拽
    drag.drag(oDiv3);

    oBtn.onclick = function(){
        oDiv1.style.display = 'block';
    }
})