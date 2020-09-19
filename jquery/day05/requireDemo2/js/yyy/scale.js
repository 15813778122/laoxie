//小D上线
define(function(){

    //node1 按着的节点    node2放大的节点
    function scale(node1, node2){
        node1.onmousedown = function(ev){
            var e = ev || window.event;
            var w = node2.offsetWidth;
            var h = node2.offsetHeight;
            var l = e.clientX;
            var t = e.clientY;

            document.onmousemove = function(ev){
                var e = ev || window.event;
                var W = range(e.clientX - l + w, 100, 500);
                var H = range(e.clientY - t + h, 100, 500);
                node2.style.width = W + 'px';
                node2.style.height = H + 'px';
            }
        }

        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }


    //实现一个限制出界的函数
    function range(iCur, iMin, iMax){
        if(iCur <= iMin){
            return iMin;
        }else if(iCur >= iMax){
            return iMax;
        }else{
            return iCur;
        }
    }

    return {
        scale: scale,
        range: range
    }
})