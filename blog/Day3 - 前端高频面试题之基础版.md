#### 1、什么是变量提升？var、let 及 const 区别？什么是暂时性死区？

变量提升是将变量声明提升到作用域顶部，函数也可以被提升，并且优先于变量提升

```javascript
// var 存在提升，能在声明之前使用 
console.log(a)	// undefined
var a = 1
```

```javascript
// 函数提升是把整个函数提升到作用域顶部
console.log(a) // ƒ a() {}
function a() {}
var a = 1
```

---



在全局作用域下使用 let 和 const 声明变量，变量不会被挂载到 顶层对象window或者global的属性上

```javascript
console.log(b) // 报错
let b = 1
const c = 1
window.b // undefined
window.c // undefined

-------

// let 声明的变量仅在块级作用域内有效
{
  let a = 10;
}
a // ReferenceError: a is not defined.

// let 也不允许在相同作用域内，重复声明同一个变量
```

------



let 实际上为 JavaScript 新增了块级作用域

> 为什么需要块级作用域？
>
> ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景
>
> 1、内层变量可能会覆盖外层变量
>
> 2、用来计数的循环变量泄露为全局变量



在代码块内，使用let和const命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

```javascript
typeof undeclared_variable // "undefined"
typeof x; // ReferenceError
let x;

---

function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错  因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”
```

---



`const`声明一个只读的常量。一旦声明，常量的值就不能改变；

实际上，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

对于简单数据类型来说，就是常量；对于复合数据类型来说（主要是对象和数组），变量指向的内存地址，保存的是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

```javascript
const a = {
  name: 'xyz',
  age: 18
}

// 这里相当于修改指针指向的值
a.name = 'abc'
console.log(a)	// {name: 'abc', age: 18}

// 将 a 指向另一个对象，就会报错
a = {}	// Uncaught TypeError: Assignment to constant variable.

----

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```



#### 2、如何判断一个对象是否为空

```javascript
// 1.将json对象转化为json字符串，再判断该字符串是否为"{}"
var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//true


// 2.for in 循环判断
var obj = {};
var b = function() {
    for(var key in obj) {
        return false;
    }
    return true;
}
alert(b());//true


// 3、jquery的isEmptyObject方法
此方法是jquery将2方法(for in)进行封装，使用时需要依赖jquery
var data = {};
var b = $.isEmptyObject(data);
alert(b);//true


// 4.Object.getOwnPropertyNames()方法
此方法是使用Object对象的getOwnPropertyNames方法，
获取到对象中的属性名，存到一个数组中，返回数组对象，
我们可以通过判断数组的length来判断此对象是否为空
注意：此方法不兼容ie8，其余浏览器没有测试
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//true


// 5.使用ES6的Object.keys()方法
// 与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组
var data = {};
var arr = Object.keys(data);
alert(arr.length == 0);//true

```





#### 3、可以说一说call，apply，bind吗？

- 都是用来改变 this指向的；第一个参数都是 `this` 要指向的对象，也就是想指定的上下文；
- call和apply是直接执行函数。call的第二部分参数要一个一个传，apply要把这些参数放到数组中；
- bind 返回的是一个新的函数，你必须调用它才会被执行。



```javascript
//  call 和 apply 是为了动态改变 this 而出现的
function Fruits() {}
Fruits.prototype = {
  color: 'red',
  getColor: function() {
    return 'color is' + this.color
  }
}
var apple = new Fruits()
apple.getColor()	// color is red

var banana = {
  color: 'yellow'
}

apple.getColor.call(banana)	// color is yellow
apple.getColor.apply(banana)	// color is yellow

// 当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作

```

---

```javascript
// 实例：
var  numbers = [5, 458 , 120 , -215]
Math.max.apply(null, numbers)	// 458
Math.min.call(null, 5, 458 , 120 , -215)	// -215

```

---

```javascript
// 面试题：
// 定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：

function log(){
  console.log.apply(null, arguments)	// 第一个参数为null，代表指向全局对象window或者global
}
log(1, 'www', '&&&')	// 1 "www" "&&&"

// 进阶：开头加上（app）：
function log(){
  var args = Array.prototype.slice.call(arguments)	// 需要将伪数组转化为标准数组
	args.unshift('(app)')
	console.log.apply(null, args)
}
log(1, '***')	// (app) 1 ***


// 伪数组转化为标准数组
1、 Array.prototype.slice.call(arguments)

2、
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(slice)
slice(arguments)	// arguments转换成了标准数组

```



#### 4、能说一下`AMD、CMD、CommonJS`和`ES6`的区别吗？

#####  （1）对于`AMD`（异步模块定义）

是 `RequireJS `在推广过程中对模块定义的规范化产出

特点 ：提前执行，推崇依赖前置；异步加载，不阻塞页面加载，能并行加载多个模块，但是不能按需加载



重要的API：

`define(id?,[]?,callbakc)`  // 定义声明模块  （模块id标识(可选)，数组 依赖的其他模块（可选），回调函数）

`require([module],callback) `   // 加载模块    （数组 指定加载的模块，回调函数）

还有一个配置属性API `require.config()`



简单的用法：AMD规范使用define方法定义模块

```javascript
// 主入口 index.js
require.config({
    baseUrl: '',
    map: {},
    paths: {
        "jquery": "../js/jquery-1.11.1.min",
        "validate": "../js/jquery.validate.min",
        "moduleTest":"test" //自定义AMD 模式的模块
    },   // 对外加载的模块名称
    shim: {
        'jquery.validate': ['jquery'],  // 配置 jquery 依赖
        'validate.form': ['jquery', 'validate']
    }  // 配置非AMD模式的文件
})


// 单个模块 test.js 
define([
    'jquery',
    'validate'
], function(_, _validate) {
    console.log(_)
    return {
        add: function (x, y) {
            return x + y
        }
    }
})


// 加载test模块 
require(['moduleTest'], function(test) {
    // 依赖前置 就是依赖必须一开始就写好，即使在最后用到
    // …… doSomething()
    test.add(1, 2)
})

```



##### （2）对于CMD

是 `Sea.js `在推广过程中对模块定义的规范化产出

特点：延迟执行，推崇依赖就近；按需加载，不需要开始就加载所有的模块，一个模块就是一个JS文件

```javascript
define(function(require, exports, module) {
    let a = require('../a')
    a.doSomething()

    // 依赖就近 就是在使用前一步引入就可以
    let b = require('../b')
    b.doSomething()
})
```



>由于Node.js主要用于服务器编程，文件在本地，加载都比较快，一般不用考虑非同步的情况，所以CommonJS规范比较适合
>
>而在浏览器端，要从服务器加载模块，就需要采用非同步方式，因此一般使用AMD/CMD规范



##### （3）对于CommonIS规范

`CommonIS`模块就是对象，每个文件就是一个模块，有自己的作用域；

特点：

“运行时加载”，所有代码都运行在模块作用域，不会污染全局作用域

模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存

模块加载的顺序，按照其在代码中出现的顺序



- 模块导出（`module、module.exports`）

每个模块内部，`module`代表当前模块，是一个对象，它的`exports`属性（即`module.exports`）是对外的接口，其他文件加载该模块，实际上就是读取` module.exports` 变量；



为了方便，`Node`为每个模块提供一个`exports`变量，指向`module.exports`，即`let exports = module.exports`

所以在对外输出模块接口时，可以向`exports`对象添加方法；

注意：不能直接将`exports`变量指向一个值，因为这样等于切断了`exports`与`module.exports`的联系

```javascript
// lib.js

var counter = 3;
function incCounter() {}

// 单个导出
module.exports.counter = counter
module.exports.incCounter = incCounter


// 或者导出一个对象
module.exports = {
  counter: counter,
  incCounter: incCounter,
}
```



- 模块导入

`require`命令用于加载模块文件，脚本代码在`require`的时候，就会全部执行；

使用`require`多次加载同一个模块时，只会在加载第一次时执行一次，后面再加载，都是直接取第一次运行的结果，除非手动清除系统缓存；

`CommonJS`模块的加载机制是，输入的是被输出的值的拷贝。也就是一旦输出一个值，模块内部的变化就影响不到这个值。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
// 输出内部变量counter和改写这个变量的内部方法incCounter
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

```



##### （4）对于ES6

可以取代 `CommonJS `和` AMD`规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入

特点：

它是编译时加载”或者静态加载；

`import` 会自动提升到代码的顶层；

输出的是值的引用，即原始值变化，import加载的值也会发生变化；

`export` 和 `import` 只能出现在模块的顶层；

ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this



模块功能主要由两个命令构成：`export` 用于规定模块的对外接口 和 ` import `用于引入其他模块提供的功能



- export 命令

```javascript
// export.js  可以对外输出常量、方法和类

// 变量
export let a = 'xyz'
// 函数
export function fn () {}
// 类
export class class1 {}


// 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
export 1;	// 报错

var m = 1;
export m;	// 报错

// 正确写法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

```



- import命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块

大括号里面的变量名，必须与被导入模块（`export.js`）对外接口的名称相同。

`import`命令是编译阶段执行的，在代码运行之前，所以会被提升到模块的头部，首先执行

```javascript
// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口

// 静态加载,只加载export.js 文件中两个变量，其他不加载
import {a, fn} from './export.js'

a=22 // Syntax Error : 'a' is read-only
a.name = 'xyz'	// 如果a是一个对象，改写a的属性是允许的


//import命令要使用as关键字，将输入的变量重命名
import {fn as fn1} from './export.js'

// 整体加载
import * as all from './export.js'

```



> 目前阶段，通过 Babel 转码，CommonJS 模块的`require`命令和 ES6 模块的`import`命令，可以写在同一个模块里面，但是最好不要这样做。因为`import`在静态解析阶段执行，所以它是一个模块之中最早执行的。



- export default 命令	模块指定默认输出

本质上，export default就是输出一个叫做default的变量或方法

```javascript
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入

// 第一组是使用export default时，对应的import语句不需要使用大括号；
// 第二组是不使用export default时，对应的import语句需要使用大括号。

```



正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;	// 将变量a的值赋给变量default

// 错误
export default var a = 1;	
// export default命令是输出一个叫做default的变量，所以它后面不能跟变量声明语句

// 正确
export default 42;	// 指定了对外接口为default

// 报错
export 42;	// 没有指定对外的接口
```



#####（5）ES6 模块与 CommonJS 模块的差异

有两个重大差异。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- ES6 中 import/export 最终都是编译为 CommonJS 中  require/exports 来执行的。



```javascript
// CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值

// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};


// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3

// lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter是一个原始类型的值，会被缓存。
```

---

```javascript
// ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4

//ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。

```



#### 5、了解es6模块的循环依赖吗？它和CommonJs模块的循环加载有什么不同？它是如何支持模块循环依赖的？

##### （1）CommonJs模块的循环加载

CommonJS模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。**CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。**

[官方文档](https://nodejs.org/api/modules.html#modules_cycles)里面的例子如下：脚本文件`a.js`

```javascript
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中，`a.js`脚本先输出一个`done`变量，然后加载另一个脚本文件`b.js`。注意，此时`a.js`代码就停在这里，等待`b.js`执行完毕，再往下执行。

再看`b.js`的代码

```javascript
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

上面代码之中，`b.js`执行到第二行，就会去加载`a.js`，这时，就发生了"循环加载"。系统会去`a.js`模块对应对象的`exports`属性取值，可是因为`a.js`还没有执行完，从`exports`属性只能取回已经执行的部分，而不是最后的值。

`a.js`已经执行的部分，只有一行。

`exports.done = false;`

因此，对于`b.js`来说，它从`a.js`只输入一个变量`done`，值为`false`。

然后，`b.js`接着往下执行，等到全部执行完毕，再把执行权交还给`a.js`。于是，`a.js`接着往下执行，直到执行完毕。我们写一个脚本`main.js`，验证这个过程。

```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行`main.js`，运行结果如下。

```javascript
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事。一是，在`b.js`之中，`a.js`没有执行完毕，只执行了第一行。二是，`main.js`执行到第二行时，不会再次执行`b.js`，而是输出缓存的`b.js`的执行结果，即它的第四行。

`exports.done = true;`



#####（2）es6模块的循环依赖

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令`import`时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。

因此，ES6模块是动态引用，不存在缓存值的问题，而且模块里面的变量，绑定其所在的模块。



```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);


$ babel-node m2.js
bar
baz
// 表明，ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，以及变量总是绑定其所在的模块
```



**ES6根本不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。**



```javascript
// a.js
import {bar} from './b.js';
export function foo() {
  bar();  
  console.log('执行完毕');
}
foo();

// b.js
import {foo} from './a.js';
export function bar() {  
  if (Math.random() > 0.5) {
    foo();
  }
}

```

按照CommonJS规范，上面的代码是没法执行的。`a`先加载`b`，然后`b`又加载`a`，这时`a`还没有任何执行结果，所以输出结果为`null`，即对于`b.js`来说，变量`foo`的值等于`null`，后面的`foo()`就会报错。

但是，ES6可以执行上面的代码。

```$ babel-node a.js
$ babel-node a.js
执行完毕
```

`a.js`之所以能够执行，原因就在于ES6加载的变量，都是动态引用其所在的模块。只要引用是存在的，代码就能执行。







引用文章：

[Module 的加载实现]: (http://es6.ruanyifeng.com/#docs/module-loader)
[JavaScript 模块的循环加载]: (http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)







以上



