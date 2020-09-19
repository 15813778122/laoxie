# ES6

进入严格模式 "use strict"

```js
<script>
    "use strict" // 进入严格模式
</script>
```

使用严格模式的目的:

    消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;

    - 消除代码运行的一些不安全之处，保证代码运行的安全；

    - 提高编译器效率，增加运行速度；

    - 为未来新版本的Javascript做好铺垫。

### 严格模式带来的行为变更:

1、全局变量声明时 必须加var

```js
<script>
    "use strict"
    a = 10
    console.log(a) // 报错 因为a没有被var声明
    //Uncaught ReferenceError: a is not defined; 引用错误： a 没有被声明
</script>
```

2、this无法指向全局对象

```js
<script>
    "use strict"
    function a(){
        this.b = 10; //报错 ， 因为this指向了window对象;

        //Uncaught TypeError: Cannot set property 'b' of undefined; 类型错误 ： 不能给undefined设置属性b；

    }
    window.a()；
</script>
```

3、函数参数名不允许重复

```js
<script>
    "use strict";
    function a(b,b,c){ //报错
        console.log(b,b,c); // 正常模式下 2,2,3

        // Uncaught SyntaxError: Duplicate parameter name not allowed in this context   ;语法错误：在此上下文中不允许重复的参数名称

    }
    a(1,2,3)
</script>
```

4、arguments对象;

> 4.1 arguments对象不允许被动态改变;
```js
<script>
    "use strict"
    function fn (a,b,c) {
        c = 9
        console.log(a,b,c) // 3,2,9
        console.log(arguments) // 3,2,5
    }
    fn(3,2,5)
</script>
```

> 4.2 arguments对象不允许被自调用;

```js
<script>
    "use strict";
    var f = function() { return arguments.callee; };
    f(); // 报错

    //Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

    //类型错误：“caller ”，“arguments.callee ”，不能在严格模式中使用;

    //caller返回调用当前函数的函数的引用  （正在执行的函数的属性）
    // callee返回正在执行的函数本身的引用 （arguments的属性）
</script>
```

5、新增保留字；implements, interface, let, package, private, protected, public, static, yield。

```js
<script>
    "use strict";
    function package(protected) { // 语法错误

        var implements; // 语法错误
    }
    package();
</script>
```

## ES5新增常见方法

数组:

    2个索引方法：indexOf() 和 lastIndexOf()；
    (返回目标的索引)
    5个迭代方法：forEach()、map()、filter()、some()、every()；
    2个归并方法：reduce()、reduceRight()；

字符串:

    trim();// 去掉字符串前后空格
    trimLeft()
    trimRIght()
```
    JSON.parse(str);  //json序列化，将符合json格式的字符串转换为json
    JSON.stringify();  //json转换为字符串
```
```js
<script>
    // 一般在前后端交互的时候用的比较多
    var list = [
        {id:1,title:'笔',price:20,num:2},
        {id:2,title:'本',price:20,num:7},
        {id:3,title:'书',price:30,num:3},
        {id:4,title:'尺子',price:40,num:4},
        {id:5,title:'涂改液',price:60,num:5}
    ]

    var str = JSON.stringify(list)
    console.log(str) // 满足json格式的字符串

    var list2 = JSON.parse(str)
    console.log(list2)
</script>
```

    Date.now();  //日期对象得到当前日期的毫秒数
```
    Object.defineProperties(obj, props); //给obj设置属性
    Object.keys(obj);  //获取obj的所有属性名称，返回数组
    Object.values(obj);  // 获取obj的所有属性值，返回数组
```
```js
<script>
    var obj = {
        id:1,
        title:'笔',
        price:20,
        num:2
    }
    // 得到的是obj所有属性名构成的数组
    var arr1 = Object.keys(obj)
    console.log(arr1)

    // 得到的是obj所有属性值构成的数组
    var arr2 = Object.values(obj)
    console.log(arr2)
</script>
```

### defineProperty用法

> 第一种写法，如果规定一个属性名和值的情况下可以这样写
```js
var obj = new Object();

Object.defineProperty(obj, 'name', {
configurable: false, // 表示能否通过delete删除此属性
writable: true, // 能否修改属性的值
enumerable: true, // 表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性
value: '张三'
})

console.log(obj.name)
```

> 第二种写法，如果写多个属性名和值的时候
```js
var obj = new Object();
Object.defineProperties(obj, { 
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    }, 
    age: {
        value: 18,
        configurable: true
    }
})

console.log(obj.name, obj.age) // 张三, 18
```

### Object.assign  合并对象

```js
var obj1 = {
        name: 'zhangsan'
    }
    var obj2 = {
        age: 18
    }
    var obj3 = {
        age: 20
    }
    // 合并对象，在合并的时候如果遇到重复的属性是后面的覆盖前面的
    // Object.assign(obj1,obj2,obj3)
    // console.log(obj1) // 将obj2和obj3一起合并到obj1里
    // console.log(obj2) // 还是原本的

    // 一般这种写法，把三个对象都合并到一个空对象里，最终得到obj4
    var obj4 = Object.assign({},obj1,obj2,obj3)
    console.log(obj4)
    // 三个对象都不会被修改
    console.log(obj1)
    console.log(obj2)
    console.log(obj3)
```

## ES6

> let

块级作用域:一种普遍存在于各个语言中的作用域范围；

我们可以发现，在一个大括号中用let声明的变量在外部不可访问了，每个大括号都是独立的作用域

```js
// 块级：if、for、switch、while、function都叫块(含有大括号)
    if (true) {
        var a = 10
        // b是一个块级的变量，只有在当前的块里才能使用
        let b = 20
    }
    console.log(a) // 10
    // console.log(b) // 报错

    // if不写大括号只有一句在if里，仍然是一个块，console.log(c)就在块外面了，所有这里也会报错
    // if (true)
    // let c = 20
    // console.log(c) // 报错
```

**let的特点**

1、let没有变量提升

```js
    console.log(a) // 如果是var就undefined let就报错
    let a = 10
    var a = 10
```

2、暂时性死区

```js
let a = 10
    if (true) {
        // 在预编译的时候发现局部有一个a，所以并不会去找全局
        // 但是执行的时候一看，局部的a的声明的在后面，而且let又不会提升，那就会报错
        console.log(a) //ReferenceError(引用错误): a is not defined;
        let a = 20
    }
```

ES6规定在某个区块中， 一旦用let或const声明一个变量，那么这个区块就变成块级作用域，用let 或者const声明的变量即为该区块绑定， 该变量不受任何变量影响。 在该变量使用let声明前不可以用。在语法上，我们叫这种情况为：暂时性死区 (temporal dead zone，简称 TDZ)

> const(声明常量)

```js
    // const声明常量，不能被重新赋值
    const a = 20
    a++
    console.log(a) //Uncaught TypeError: Assignment to constant variable.

    // const定义应用类型的数据的时候，可以修改数据内部结构，但是不能修改地址
    const arr = [3,4,6,7]
    arr.push(10)
    console.log(arr)
    // arr = [3,4,6,7]
```

### 扩展运算符 ...(可以运用于数组或对象)

三个点号，功能是把数组或类数组对象展开成一系列用逗号隔开的值

```js
function fn (a,b,c) {
        console.log(a+b+c)
    }
    var arr = [3,2,5]
    fn(arr[0],arr[1],arr[2])
    // ...运算符可以把数组展开
    fn(...arr)

    var arr1 = arr // 这种写法赋值的是引用
    var arr1 = [...arr,40] // 这种写法arr1和arr是两个值相同的数组

    var obj = {
        name: '张安',
        age: 99
    }
    // obj1具有obj的所有属性，并且还新增了一个gender，他们是两个不同的对象
    var obj1 = {...obj,gender:'male'}
    console.log(obj1)
    console.log(obj)
```

### rest运算符 ...

rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组

```js
// rest运算符也是 ...可以把一系列逗号隔开的值合并到一个数组里，用来合并数组
    function fn (...arr) {
        // 可以把所有传进来的参数合并到arr
        console.log(arr)
    }

    fn(3,6,2,5,6)

    // 口头叫法...也被称为省略运算符
```

## 字符串扩展
1、字符串的 Unicode 表示;

2、字符串的新增方法:

> repeat()重复功能(不常用)

```js
var str = 'hello string'
    var str1 = str.repeat(3)
    console.log(str1) // 重复str3次
```

> includes()  startsWith() endsWith()  ;判定字符串中是否存在某个字符串;

```js
var str = 'hello string'
    
    console.log(str.includes('s')) // 存在就返回true

    console.log(str.startsWith('he')) // true

    console.log(str.startsWith('l',2)) // 判断str[2]是否以he开头

    console.log(str.endsWith('o'),5) // 判断str[5]前面的字符串是否以o结尾
```

3、for of (遍历方式)

    for of 可以用于遍历字符串：
          
        var s = "abc";

        for(let  b of s){
            
            console.log(b) // "a"  "b"  "c"
            
        }

### 字符串模板扩展

```js
var num = 10
    console.log('我要打' + num + '个')
    // 字符串模板可以把表达式放在${}里面，他就可以解析
    console.log(`我要打${num}个`)
    // 字符串模板可以直接换行
    var str = `<p>我要打
    <b>${num}</b>
    个</p>`
    console.log(str)
    // ${}里面可以写表达式
    var str1 = `我要打${num > 10 ? '很多' : '0'}个`
    console.log(str1)

    function fn () {
        return 20
    }
    // ${}里面可以写函数调用，会被解析成函数的返回值
    var str2 = `我要打${fn()}个`
    console.log(str2)

    // 如果字符串本身就有一个`，那么要写成\`
    var str3 = `hello \` world`
    console.log(str3)
```

## 箭头函数

以前的写法

```js
function test1 (x) {
    return x + 4
}
var test2 = function (x) {
    return x + 4
}
```

使用箭头函数

```js
// ES6里可以用箭头来定义函数 
const test3 = (x) => {
    return x + 4
}
// 如果箭头函数只有一个参数，那么小括号可以不写，多个参数就必须写小括号
const test4 = x => {
    return x + 4
}
// 当{}只有一句代码，而且这句话就是return，可以省去retran
const test5 = x => x + 4
// 如果返回值是一个对象，那么要加一堆小括号避免歧义
const test6 = num => ({
    price:num
})
```

#### 使用箭头函数的影响

> 自动绑定this

    1、如果你希望this指当前对象，那么就用普通函数
    2、如果你希望this指向外层对象，用箭头函数
    3、如果内层外层都要，用普通函数，this指向外层,在外层声明一个变量把外层this存下来，比如 const _this = this   _this指外层

没使用箭头函数案例

```js
const obj = {
    name: '张三',
    say: function () {
        // 一秒钟之后打印张三
        // 这里的this指向obj，所以我可以在这里把this存下来,这样我的常量_this永远都指向obj了
        const _this = this
        setTimeout(function () {
            // 像这种没有明确指向的匿名函数this统一指向window
            console.log(this) // window
            console.log(_this) // obj
            console.log(this.name) // 空字符串
            console.log(_this.name) // 张三
        },1000);
    }
}
obj.say()
```

使用了箭头函数案例

```js
const obj = {
    name: '张三',
    say: function () {
        setTimeout(() => {
            // 箭头函数没有自己的this
            console.log(this) // obj
            console.log(this.name) // 张三
        },1000);
    }
}
obj.say()
```

箭头函数this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this,导致内部的this就是外层代码块的this。正是因为这个，所以箭头函数也不能做构造函数。

> 箭头函数的缺陷

    第一： 箭头函数是不能new的，它的设计初衷就跟构造函数不太一样

    第二： 箭头函数如果要返回一个JSON对象，必须用小括号包起来 var test = ()=>({id:3, val=20})

## 解构赋值

```js
// 把数组里的元素按顺序赋值给四个变量
var arr = [4,3,6,9]
var [a,b,c,d] = arr
console.log(a) // 4
console.log(b) // 3
console.log(c) // 6
console.log(d) // 9
// 如果解构的变量是少于数组元素，那么就只解构前几个元素
var [a,b,c] = arr
console.log(a) // 4
console.log(b) // 3
console.log(c) // 6
// 如果解构的变量是多于数组元素，那么多余的变量就算undefined
var [a,b,c,d,e] = arr
console.log(a) // 4
console.log(b) // 3
console.log(c) // 6
console.log(d) // 9
console.log(e) // undefined
```


```js
// 对象
// 对象是无序的，没有length属性
 var obj = {
    username: 'lisi',
    age: 20,
    gender: 'male',
    say: function () {
        console.log(this.age)
    }
}

// 简单来说就是根据属性名取值

// 对象的解构是按照属性名来解构的，也就是说声明的变量要对应对象的属性名才能拿到属性值
// 如果去解构一个对象里不存在的属性，就得到undefined
var {age,gender,aaa,say} = obj // var age = obj.age
console.log(age) // 20
console.log(gender) // male
console.log(aaa) // undefined
// say是解构出来的全局函数了，可以直接调用了,相当于var say = obj.say
say()

// 解构赋值的逆运用
var age = 20
var username = 'lisi'
var gender = 'male'

// var obj = {
//     age: age,
//     username: username,
//     gender: gender
// }

// ES6里面可以简写
var obj = {
    age,
    username,
    gender
}

console.log(obj)
```

### Symbol类型(第六种基本数据类型)

Symbol函数会生成一个唯一的值可以理解为Symbol类型跟字符串是接近的 但每次生成唯一的值，也就是每次都不相等，至于它等于多少，并不重要 这对于一些字典变量，比较有用

Symbol的案例

```js
var oBox = document.querySelector('#box')
// 定义四种状态，分别是四个Symbol，每个Symbol的值都不一样
const color = {
    red: Symbol(),
    green: Symbol(),
    pink: Symbol(),
    blue: Symbol()
}
var flag = color.red
oBox.onclick = function () {
    switch (flag) {
        case color.red:
        oBox.style.background = 'green'
        flag = color.green
        break
        case color.green:
        oBox.style.background = 'pink'
        flag = color.pink
        break
        case color.pink:
        oBox.style.background = 'blue'
        flag = color.blue
        break
        case color.blue:
        oBox.style.background = 'red'
        flag = color.red
        break
    }
}
```

### Set和Map结构

set集合默认是去除重复的，但前提是两个添加的元素严格相等

```js
 var arr = [3,4,2,4,2,5,2,4]
var arr1 = Array.from(new Set(arr))
console.log(arr1)

var arr2 = [...new Set(arr)]
console.log(arr2)
```

由于Set集合本质上还是一个map，因此会有几个遍历方法(不常用)

```js
var imgs = new Set(['a','b','c']); 

 //根据KEY遍历
for(let item of imgs.keys()){
    console.log(item);
} //a //b //c

//根据VALUE遍历
for(let item of imgs.values()){
    console.log(item);
} //a //b //c

//根据KEY-VALUE遍历
for(let item of imgs.entries()){
    console.log(item);
 } //['a','a'] //['b','b'] //['c','c']

//普通for...of循环(for...of跟for-in的区别很明显，就是直接取值，而不再取下标了)
for(let item of imgs){  
  console.log(item);
} //a //b //c
```

### map集合(作为了解)

Map集合,即映射

```js
let map = new Map();
 
map.set("S230", "张三");
map.set("S231", "李四");
map.set("S232", "王五");

获取某一个元素 map.get("s232"); //王五

//循环遍历，配合解构赋值 for(let [key,value] of map){    console.log(key,value);  }
```
