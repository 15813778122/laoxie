//C同学

//如果一个模块中，我们要引入另外的模块
define(["scale"], function(scale){
    function drag(node){
        node.onmousedown = function(ev){
            var e = ev || window.event;
            var offsetX = e.clientX - this.offsetLeft;
            var offsetY = e.clientY - this.offsetTop;

            document.onmousemove = function(ev){
                var e = ev || window.event;
                var l = scale.range(e.clientX - offsetX, 0, document.documentElement.clientWidth - node.offsetWidth);
                var t = scale.range(e.clientY - offsetY, 0, document.documentElement.clientHeight - node.offsetHeight);
                node.style.left = l + 'px';
                node.style.top = t + 'px';
            }
        }

        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }

    //对外暴露
    return {
        drag: drag
    }
})