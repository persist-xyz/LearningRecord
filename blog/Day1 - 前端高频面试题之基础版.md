#### 1、js的基本类型有哪些？引用类型有哪些？ null 和 undefined 区别是什么？

基本类型：`null、undefined、number、string、boolean、Symbol`

引用类型：`Object、Array、Date、RegExp、Function`

原始类型存储的都是值，是没有函数可以调用的，比如 `undefined.toString()`会报TypeError的错



`null`用来表示尚未存在的对象；当声明的变量还未被初始化时，变量的默认值为`undefined`

注意的是`typeof null`返回为`object`，因为特殊值null被认为是一个空的对象引用

null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN

`undefined == null    // true`



> 从内存来看 null 和 undefined 本质的区别是什么？

给一个全局变量赋值为null，相当于将这个变量的指针对象以及值清空，如果是给对象的属性 赋值为null，或者局部变量赋值为null，相当于给这个属性分配了一块空的内存，然后值为null， JS会回收全局变量为null的对象。

给一个全局变量赋值为undefined，相当于将这个对象的值清空，但是这个对象依旧存在,如果是给对象的属性赋值 为undefined，说明这个值为空值



#### 2、typeof 和 instanceof 区别，instanceof原理？

typeof 返回值：` number、 boolean、string、undefined、object、function`

typeof是一元运算符，返回值为字符串，该字符串用来说明运算数的数据类型 (数组、正则、日期、对象的typeof返回值都是object)

instanceof用于判断某个变量是否是某个对象的实例，返回值为true或false



#### 3、=== 和 ==

```javascript
[] === []   //false

undefined === undefined //true

[] == []    //false

undefined == undefined  //true
```



#### 4、如何判断一个变量是Array类型？如何判断一个变量是Number类型？

```javascript
let arr = []
typeof arr === 'object'

arr instanceof Array === true
arr.constructor === Array
Array.isArray(arr) === true
Object.protoType.toString.call(arr) === "[Object Array]"
Object.protoType.toString.apply(arr) === "[Object Array]"

let num = 1
typeof num === 'number'
a.constructor === Number
Object.protoType.toString.call(num) === "[Object Number]"
Object.protoType.toString.apply(num) === "[Object Number]"

```



#### 5、如何正确判断 this？箭头函数的 this 是什么？

```javascript
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```

我们一个个分析上面几个场景

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`



下面看看箭头函数中的 `this`

```javascript
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```

首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。

在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind` 这类函数是无效的。



最后就是`bind call apply`这些改变上下文的API了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`。



如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```javascript
let a = {}
let fn = function () { 
	console.log(this) 
}
fn.bind().bind(a)() // => ?

// 可以把上述代码转换成另一种形式
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()

// 可以从上述代码中发现，不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window。
```



以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。











