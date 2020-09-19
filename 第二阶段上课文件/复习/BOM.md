# BOM（Browser Object Model  浏览器对象模型）

![BOM结构](../Image.png)

**window是全局浏览器内置顶级对象**

**window对象表示一个浏览器窗口或一个框架**

我们可以只写document，而不必写window.document

### 全局变量默认是挂在window下的

    var  a = 123;

    alert(window.a) // 123

    function fn () {
        // 这里的b是全局变量
        b = 30
    }
    fn()
    console.log(b) // 30
    console.log(window.b) // 30

## window上的各种属性

    name    window的名称
    origin  当前地址源
    innerWidth  浏览器宽度
    innerHeight 浏览器高度
    length  frames的数量
    scrollTop   纵向滚动条滚动高度
    scrollLeft  横向滚动条滚动高度

如果忘记了属性名，可以console.log(window)查看

**注意：window下的各种属性或方法名都不要直接用来作为全局变量命，会冲突**

## window下的子对象
A、location

* window.location.href                当前页面的 URL，可以获取，可以修改（页面跳转）。
* window.location.hostname      web 主机的域名
* window.location.pathname      当前页面的路径和文件名
* window.location.port               web 主机的端口 （80 或 443）
* window.location.protocol         所使用的 web 协议（http:// 或 https://）
* window.location.search           请求参数（？后面的内容）

如果忘了方法名可以console.log(window.location)查看

    window.location.reload();

    刷新页面的方法。一般情况下给reload()传递一个true，让他刷新，并不使用缓存。

    缓存的东西一般为js文件，css文件等。

    用这个方法可以让自己不能动的页面动起来了。刷新当前页面。

    window.location.replace();
    这个方法用于页面跳转，括号里面放网址

    这两个方法通常用函数封装来使用

B、window.navigator

    navigator.appName      返回获取当前浏览器的名称。

    navigator.appVersion    返回 获取当前浏览器的版本号。

    navigator.platform        返回 当前计算机的操作系统。

    以上属性已经在逐渐被抛弃了。

    一个新的属性将替代这些属性。

    navigator.userAgent   返回浏览器信息（可用此属性判断当前浏览器）

    可作为了解

## 以下代码是用于判断当前浏览器类型的代码:

```js
function isBrowser() {
    var userAgent = navigator.userAgent;
    //微信内置浏览器
    if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
        return "MicroMessenger";
    }
    //QQ内置浏览器
    else if(userAgent.match(/QQ/i) == 'QQ') {
        return "QQ";
    }
    //Chrome
    else if(userAgent.match(/Chrome/i) == 'Chrome') {
        return "Chrome";
    }
    //Opera
    else if(userAgent.match(/Opera/i) == 'Opera') {
        return "Opera";
    }
    //Firefox
    else if(userAgent.match(/Firefox/i) == 'Firefox') {
        return "Firefox";
    }
    //Safari
    else if(userAgent.match(/Safari/i) == 'Safari') {
        return "Safari";
    }
    //IE
    else if(!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }
    else {
        return "未定义:"+userAgent;
    }
}
```

C、history

    history.go(1)    参数可写任意整数，正数前进，负数后退
    history.back()   后退
    history.forward() 前进


D、screen: 屏幕

    window.screen.width 返回当前屏幕宽度(分辨率值)
    window.screen.height 返回当前屏幕高度(分辨率值)

### window下的弹框方法

    alert()   prompt()  confirm()

    (confirm有一个返回值，点了确定返回true，点了取消返回false)


### 定时器

    超时定时器        间隔定时器
    setTimeout       setInterval
    clearTimeout    clearInterval

### window.onload
     // window的load事件，页面加载完成以后才会执行的代码
     ```js

     window.onload = function () {
            // window的load事件，页面加载完成以后才会执行的代码
            var box = document.getElementById('box')
            console.log(box)
        }
``` ```

### window.onscroll(滚动条滚轮事件)

var scrolltop=document.documentElement.scrollTop||document.body.scrollTop; //兼容

```js
 window.onscroll = function () {
            // window.scrollTop有兼容性，直接取取不到
            // 下面这句话就是获取滚动条高度的一个兼容写法
            var top = document.documentElement.scrollTop || document.body.scrollTop
            console.log(top)

            var left = document.documentElement.scrollLeft || document.body.scrollLeft
            console.log(left)
        }
```
    



### window.onresize (窗口缩放事件)
```js
 window.onresize = function () {
            // 当窗口大小发生改变的时候触发的事件
            console.log(window.innerHeight,window.innerWidth)
        }
```