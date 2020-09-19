# DOM（Document Object Model 文档对象模型）

DOM定义了表示和修改文档所需的对象、行为和属性，以及这些对象之间的关系。

## DOM操作
获取DOM节点

    1、 document.getElementById(id名)

    2、getElementsByTagName(标签名)
        得到的是一个集合（不止一个，是一堆）


    3、getElementsByName( ) 通过Name值获取元素，返回值是集合，通常用来获取有name的input的值；

        注：1*不是所有的标签都有name值；

            2*低版本的浏览器会有兼容问题；


    4、 children属性，获得DOM元素的所有子元素；返回值是集合

    5、parentNode属性，获得DOM元素的父级元素

    6、getElementsByClassName(class名称)
        但是：IE8以下不能用


    7、ES5选择器：

     document.querySelector ()  >  一旦匹配成功一个元素，就不往后匹配了
      document.querySelectorAll ()  >>>> 强大到超乎想象;匹配到所有满足的元素, 支持IE8+
    
## 属性获取和操作(自定义属性)

**getAttribute( )获取元素的属性值，他是节点的方法！所以前缀必须是节点！**

     document.getElementById( ID值 ).getAttribute( )

     什么是元素属性呢？ class就是元素属性，写在标签内的所有东西都是标签属性， 比如link的href比如img的src....都是元素属性。
    元素自带的属性可以直接用 . 语法获取，但是自定义属性需要 getAttribute() 和 setAttribute( ) 方法

**setAttribute( )设置元素的属性。同上；低版本IE不兼容**

**removeAttribute( )删除属性；同上；低版本IE不兼容**

```js
<ul>
        <li index="1">首页</li>
        <li index="2" class="ac">列表</li>
        <li index="3">详情</li>
        <li index="4">关于</li>
    </ul>
    <script>
        var ac = document.querySelector('.ac')
        // 这样是取不到的，因为index是自定义的而不是标准里得
        // console.log(ac.index)
        // getAttribute用来获取自定义属性
        var index = ac.getAttribute('index')
        console.log(index)

        // 设置自定义属性
        // 自定义属性的名称可以随便写，但是w3c推荐用 data- 
        // 自定义属性设置无论什么类型的值，最后获取统一都是字符串
        ac.setAttribute('data-id',34)

        // 删除自定义属性，属性名和属性值都没了
        ac.removeAttribute('index')
    </script>
```

### ID和class的操作

若想在标签里添加class类名使用(变量名.classList.add('类名'))就可以添加类名


变量名.classList.remove('类名')删除类名

```js
<button onclick="fn()">按钮</button>
    <div id="box" class="box section">box</div>
    <script>
        var div = document.querySelector('#box')
        function fn () {
            // div.id = 'box1'
            // div.className = 'box2' // 这种写法是box2把原来的box直接覆盖
            // div.className = 'box box2'

            // classList仅支持IE8+

            // 添加一个class
            // div.classList.add('ac')

            // 移除一个class，如果要移除多个，那就分两次写
            div.classList.remove('section')

            console.log(div.className) // box
            console.log(div.classList) // ["box", value: "box"]
            console.log(div.classList[0]) // box
            console.log(div.classList[1]) // undefined
        }
    </script>
```

### innerHTML知识点
innerHTML用于修改元素的样式与内容

```js
<button onclick="fn()">按钮</button>
    <div id="box" class="box section">box</div>
    <script>
        var div = document.querySelector('#box')
        function fn () {
            // div.innerHTML = 'box2'
            // 会解析标签
            // div.innerHTML = '<b>box3</b>' 
            // 就不会解析标签
            div.innerText = '<b>box3</b>' 
        }
    </script>
```

## 节点(DOM元素类型(元素、文本和属性))
若用(变量名.children)获取的是该元素下的子元素

若用(变量名.childNodes)获取的是该元素下的子节点包括注释，文本，标签全部都叫节点

当我们需要判断节点类型的时候可以用nodeName或者nodeType

    nodeObj.nodeName // 节点名称  
    /*
        元素节点：标签名（大写）
        属性节点：属性名称
        文本节点：#text
    */

    nodeObj.nodeType // 1 ==> 元素节点  2 ==> 属性节点  3 ==> 文本节点 

**使用nodeType判断节点类型的值所代表的节点类型**

    常见的节点类型：

    nodeType值&含义
    1   元素（DIV、BODY、LI、SPAN....... ） 
    2   属性代表属性节点 （class，src，href）
    3   文本节点（text节点）
    8   代表注释节点
    9   代表document节点；

```js
<div>
        <!-- 注释 -->
        <p>一段文字</p>
        <p>一段文字</p>
    </div>
    <script>
        var div = document.querySelector('div')
        // 元素都有一个children属性：获取当前元素的子元素
        // console.log(div.children) // 2个p标签

        // childNodes获取的是子节点:注释，文本，标签全部都叫节点
        console.log(div.childNodes) // 7 [text, comment, text, p, text, p, text]

        // 我们可以获取某个节点以后通过nodeName属性来判断节点类型
        console.log(div.childNodes[0].nodeName) // #text 换行的文本节点
        console.log(div.childNodes[1].nodeName) // #comment 注释节点
        console.log(div.childNodes[3].nodeName) // P 大写的标签名

        // 如果我们确切的知道这是一个标签节点，还可以使用tagName直接获取标签名
        console.log(div.tagName) // DIV
    </script>
```

## 操作DOM

增、删、克隆节点(parentNode代表父容器)

    创建节点
    var oDiv = document.createElement("div");

    克隆节点
    clonedNode = Node.cloneNode(boolean) // 只有一个参数，传入一个布尔值，true表示深客隆，复制该节点下的所有子节点；false表示浅克隆，只复制该节点

    插入节点
    parentNode.appendChild(childNode);  // 将新节点追加到子节点列表的末尾
    parentNode.insertBefore(newNode, targetNode);  //将newNode插入targetNode之前

```js
<ul>
        <li>首页</li>
        <li>列表</li>

        <li id="about">关于</li>
    </ul>
    <script>
        var ul = document.querySelector('ul')
        var li = document.createElement('li')
        var about = document.querySelector('#about')
        li.innerHTML = '联系'
        // ul.appendChild(li) // 放在ul的最后一个子元素
        ul.insertBefore(li,about) // 把li放在ul里面，about前面
    </script>
```
 
替换节点
parentNode.replaceChild(newNode, targetNode);    //使用newNode替换targetNode

```js
    <ul>
        <li>首页</li>
        <li>列表</li>
        <li id="about">关于</li>
    </ul>
    <script>
        var ul = document.querySelector('ul')
        var about = document.querySelector('#about')
        var li = document.createElement('li')
        li.innerHTML = '联系我们'

        // 在ul里面把about替换成li(节点替换)
        ul.replaceChild(li,about)
    </script>
```

移除节点
parentNode.removeChild(childNode);  // 移除目标节点
node.parentNode.removeChild(node);    //在不清楚父节点的情况下使用

childNode.remove()  //IE不支持

```js
<ul>
        <li>首页</li>
        <li>列表</li>
        <li id="about">关于</li>
    </ul>
    <script>
        var ul = document.querySelector('ul')
        var about = document.querySelector('#about')

        // 父元素.removeChild删除子元素
        // ul.removeChild(about)

        // 补充:parentNode找到自己的父级
        // about.parentNode.removeChild(about)

        // 可以自己删除，但是IE8以下不能使用
        about.remove()

    </script>
```

创建+克隆+插入
```js
<script>
        // 创建一个div元素，用box变量来接收
        var box = document.createElement('div')
        box.innerHTML = 'box4'
        // 通过js style属性设置的样式统一都在行内
        // box.style.width = '200px'
        // box.style.height = '200px'
        // box.style.background = 'red'

        // 我们可以在css里先把样式预设好，这里只需要修改对应的class就行了
        box.classList.add('box')

        console.log(document.body) // body元素是唯一的，可以直接document.body来获取

        // appendChild方法来往body的结束去追加box作为body的最后一个子元素
        document.body.appendChild(box)

        // 如果反复append同一个box，那么最终也会只有一个
        // document.body.appendChild(box)

        // 先克隆(复制),在append
        // var box1 = box.cloneNode()
        // 克隆分为深克隆和浅克隆，浅克隆只会克隆元素本身，不会克隆子元素和内容，默认是浅克隆
        // cloneNode方法有一个参数，默认值是false，代表浅克隆，true代表深克隆，就会连着内容一起克隆
        var box1 = box.cloneNode(true)
        document.body.appendChild(box1)

        // 注意点:如果元素有id属性，最好不要直接克隆，否则会出现两个id相同的元素
    </script>
```

### node节点

    根节点：root>>>>HTML没有父节点；

    节点操作：（通过父子系关系）

    childNodes     获取当前元素的所有子节点；

    nodeType       节点种类，返回值是数字；

    nodeValue      获取（文字）节点的文本内容；

    nodeName     返回node节点名称（#text，注释， 标签....）；


### 关于节点的一些操作

写法:父容器.xxx

    firstElementChild   获取当前元素节点的第一个元素子节点

    lastElementChild  获取当前元素节点的最后一个元素子节点

    ownerDocument 获取该节点的文档根节点，相当与 document

    parentNode 获取当前节点的父元素

```js
<div>div1</div>
    <ul>
        <li>红烧鲤鱼</li>
        <li>麻辣香锅</li>
        <li>回锅肉</li>
    </ul>
    <script>

        // 在DOM树里，可以从一个元素触发找到其他任意一个元素，虽然一般也不用这么麻烦，但是这个道理要明白

        var ul = document.querySelector('ul')
        // 从ul出发找div，应该是上一个兄弟元素
        console.log(ul.previousElementSibling)

        // 红烧鲤鱼
        console.log(ul.firstElementChild)
        // 回锅肉
        console.log(ul.lastElementChild)
        // 如果要获取中间的，那么找到所有子元素再通过下标来取
    </script>
```

### 创建文档碎片

创建文档碎片可以把需要操作的对象收集起来，最后再放入目标元素内，能减少DOM操作，提高性能

    var cache = document.createDocumentFragment();
    for( var i = 0 ; i < 1000; i ++ ){
        var opt = document.createElement("input");
        opt.type="button";
        opt.value = "删除";
        cache.appendChild(opt);
    }
    document.body.appendChild(cache);

例子：

这个例子我需要在ul里插入10个li，就可以使用创建文档碎片

```js
<ul></ul>
    <script>
        var ul = document.querySelector('ul')
        // 往ul里加入10个li
        // 1、这种写法创建10个li，append 10次，进行了10次DOM操作
        // for (var i = 0; i < 10 ; i++) {
        //     var li = document.createElement('li')
        //     li.innerHTML = i + 1
        //     ul.appendChild(li)
        // }

        // 2、可以用一个文档碎片先把10个li放入碎片里
        // 然后只需要一次把碎片插入ul就行了,这样就只有一次DOM操作了
        // 这种写法虽然看起来更麻烦，但是减少了DOM操作的次数，性能更优

        // 创建一个文档碎片
        var cache = document.createDocumentFragment()
        for (var i = 0; i < 10; i++) {
            var li = document.createElement('li')
            li.innerHTML = i + 1
            // li放到文档碎片(cache)里
            // 这里的append是在计算机里操作的，不是在页面上操作的
            cache.appendChild(li)
        }
        // 当for结束以后把cache插入到ul里
        ul.appendChild(cache)
    </script>
```

例子:

```js
<style>
        .box{
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
</head>
<body>
    <div class="box"></div>
    <script>
        var box = document.querySelector('.box')

        // box.style 这种方式只能获取或者设置行内样式
        console.log(box.style.width)

        // 获取内部或者外部的样式(false不获取伪类)
        // 非IE浏览器的写法
        var width = getComputedStyle(box,false).width
        console.log(width)

        // 根据兼容性封装一个获取的是最终生效的样式，无论是行内还是外部或者外部
        // 根据兼容性封装一个获取外部样式的方法
        // obj:要获取样式的对象
        // attr:属性名
        function getStyle (obj,attr) {
            if (obj.currentStyle) {
                // 判断obj有currentStyle这个属性，说明使用的是IE浏览器
                return obj.currentStyle[attr]
            } else {
                // obj没有currentStyle这个属性，说明用的不是IE
                return getComputedStyle(obj,false)[attr]
            }
        }

        var height = getStyle(box,'height')
        console.log(height)
    </script>
</body>
```

## DOM尺寸和位置(元素尺寸)

    - 获取非行内样式（兼容问题）

    function getStyle(obj,attr){    //获取非行间样式，obj是对象，attr是值
        if(obj.currentStyle){   //针对ie获取非行间样式
                return obj.currentStyle[attr];
        }else{
                return getComputedStyle(obj,false)[attr];   //针对非ie
        };
    };

    box.style.width
    box.style.height
    只能获取到内联style属性的CSS样式中的宽和高，如果有，获取;如果没有，则返回空
    getStyle(box,"width")
    getStyle(box,"width")
    //如下getStyle方法的封装
    通过计算获取元素的大小，无关你是否是行内、内联或者链接，它经过计算后得到的结果返回出来。如果本身设置大小，它会返回元素的大小，如果本身没有设置，非IE浏览器会返回默认的大小，IE浏览器返回auto。
    box.clientWidth(不包含边框)
    box.clientHeight
    返回了元素大小，但没有单位，默认单位是px，如果设置了其他的单位，比如100em之类，返回出来的结果还会转换为px像素（不含边框）
    box.scrollWidth(内容宽高)
    box.scrollHeight
    获取滚动内容的元素大小（当元素出现滚动条时，此属性指全部滚动内容的宽高）
    返回了元素大小，默认单位是px。如果没有设置任何CSS的宽和高度，它会得到计算后的宽度和高度
    box.offsetWidth(包含边框)
    box.offsetHeight

返回了元素大小，默认单位是px。如果没有设置任何CSS的宽和高度，他会得到计算后的宽度和高度
包含盒模型中除margin以外的宽高（包含边框）
最稳定，使用最频繁

位置坐标

    box.clientLeft
    box.clientTop   获取左边框和上边框的宽度
    box.offsetLeft(相对于html或者设置定位不为static的父元素)
    box.offsetTop   获取元素当前相对于offsetParent父元素的位置
    box.scrollTop
    box.scrollLeft  获取滚动内容上方的位置(就是隐藏的内容的高度)
    获取滚动内容左方的位置

    box.scrollTop = box.scrollHeight - box.clientHeight // 让滚动条在最底部的公式

