#### 1、谈一谈 promise
promise是为解决异步处理回调金字塔问题而产生的;
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
  	resolve(value);
  } else {
  	reject(error);
  }
});
```



#### 3、es6的继承和es5的继承有什么区别
- ES5的继承 是通过原型或构造函数机制来实现，实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）

```javascript
function Teacher(name){  
    this.name = name;  
}  
Teacher.prototype.sayName = function(){  
    console.log("name is "+this.name);
}  
var teacher = new Teacher("xiaoming");  
teacher.sayName();  
  
function Student(name){  
    this.name = name;  
}  
Student.prototype = new Teacher()  
Student.prototype.contructor = Student

var student = new Student("xiaolan");  
student.sayName();  

//  name is xiaoming  
//  name is xiaolan  

Student.__proto__ === Function.prototype	// true
// ES5的方式实现继承

```

- ES6封装了class，extends关键字来实现继承，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

```javascript
class A {
  static hello() {
    console.log('hello world');
  }
}
class B extends A { }
B.hello()  // hello world

B.__proto__ === A	// true
// 子类可以通过内部指针找到父类

```





#### 4、promise封装ajax

```javascript
function postJSON(url, data) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }
        xhr.send(JSON.stringify(data))
    })
}
```
#### 5、let const的优点

都是块作用域

- let的优点是严格了变量声明，如果在变量声明之前就访问变量的话，会直接提示 ReferenceError

- const 声明的变量本身可变，只是说它不可被再次赋值

#### 6、generator 、Iterator分别是什么？async/await 实现原理

- Generator 函数是 ES6 提供的一种异步编程解决方案
  * Generator 函数与传统函数相比有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态。
- async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```javascript
async function fn(args) {
  // ...
}
 
// 等同于
 
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

#### 7、CommonJS 中的 require/exports 和 ES6 中的 import/export 区别？

node的commonjs，它有四个重要的环境变量为模块化的实现提供支持：module.exports、require、global。

- CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。


ES6 其模块功能主要由两个命令构成：import 和 export  

- ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

- import/export 最终都是编译为 require/exports 来执行的。

- CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

- export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。


#### 8、箭头函数，以及它的this
- ES6的箭头函数的this指向是，在哪里定义的箭头函数那么它的this就指向哪里；
- ES5普通函数的this指向是，在哪里调用的函数，那么this就指向哪里

####  9、es6模块管理是支持模块的循环依赖吗？如果支持，那么是如何支持模块循环依赖的，并请举例说明

支持！

```javascript

// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}
 
// odd.js
import { even } from './even';
export function odd(n) {
  return n !== 0 && even(n - 1);
}
--------------------- 

// 运行这段代码
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6

// 在执行evev.js的时候，发现加载了odd.js，所以在es6中，会优先执行odd.js，然后再来执行 even.js。所以在运行的时候，m.even(10);参数先会经过odd.js，此时n就等于9，进入even.js；然后counter+1；n在减一.直到n等于0的时候，此时counter的值为6。
```





#### 10、Set、Map、WeakSet、WeakMap

Set 是一种叫做**集合**的数据结构，主要用于 **数据重组**

Map 是一种叫做**字典**的数据结构，主要用于 **数据储存**

- Set

  - new Set([iterable])

  - 成员唯一、无序且不重复（精确相等），但是在Set内部，认为两个NaN是相等的，两个对象总是不相等
  - [value, value]，键值与键名是一致的（或者说只有键值，没有键名），类似数组
  - 可以遍历，方法有：add、delete、has

- WeakSet

  - new WeakSet([[1, 2], [3, 4]]) 是一个构造函数，只接收数组或者类数组作为参数，且成员必须是个对象

  - 成员都是对象
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
  - 不能遍历，方法只有add、delete、has

- Map

  -  本质上是键值对的集合，类似集合，键可以是任意类型的值（包括字符串），键值取得是引用地址
  -  可以遍历，方法有get、set、has、delete、size，可以跟各种数据格式转换

- WeakMap

  - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  - 不能遍历，方法只有get、set、has、delete





#### 11、异步笔试题

```javascript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

// output
/* script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout */

```



#### 12、Object.prototype.toString.call() 、 instanceof 、Array.isArray()的区别



`Object.prototype.toString.call()`

`toString`是Object的原型方法，如果`toString`没有重写的话，直接调用会返回`[object type]`，`type`是该对象的类型

除了Object类型以为的对象调用，会直接返回该值内容的字符串

可判断所有数据类型，包括NULL和undefined



 A `instanceof` B

用来判断A是否是B的实例，但是判断不了实例A具体是哪种类型

只能用来判断对象类型，并且所以的 instanceof Object 都返回true

```javascript
[].__proto__ === Array.prototype
Array.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
// 形成一条原型链
```



`Array.isArray()`

用来判断某个变量是否是数组类型

在不支持的浏览器中，可以用`Object.prototype.toString.call()`	实现

```javascript
if (!Array.isArray) {
  Array.isArray = function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}

```

和instanceof相比，Array.isArray()可以检测出iframes

```javascript
i = document.createElement('iframe')
document.body.appendChild(i)
iArray = window.frames.Array
arr = new iArray(1,2)

arr instanceof Array	// false
Object.prototype.toString.call(arr)	// '[object Array]'

```

































