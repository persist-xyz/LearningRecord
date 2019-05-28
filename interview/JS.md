
#### 1、js的基本类型有哪些？引用类型有哪些？null和undefined的区别。
- 基本类型：Number,String,Boolean,Null,undefined
- 引用类型：Object,Array,Date,RegExp,Function


- null用来表示尚未存在的对象；当声明的变量还未被初始化时，变量的默认值为undefined
- 注意的是typeof null返回为object,因为特殊值null被认为是一个空的对象引用
-  null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN
-  undefined == null    // true

> 从内存来看 null 和 undefined 本质的区别是什么？

给一个全局变量赋值为null，相当于将这个变量的指针对象以及值清空，如果是给对象的属性 赋值为null，或者局部变量赋值为null,相当于给这个属性分配了一块空的内存，然后值为null， JS会回收全局变量为null的对象。

给一个全局变量赋值为undefined，相当于将这个对象的值清空，但是这个对象依旧存在,如果是给对象的属性赋值 为undefined，说明这个值为空值

#### 2、如何判断一个变量是Array类型？如何判断一个变量是Number类型？
```javascript
 typeof []； // object
 [] instanceof Array; // true
 [].constructor === Array; // true
 Array.isArray([]); // true
 Object.protoType.toString.call([]) === "[Object Array]"
 Object.protoType.toString.apply([]) === "[Object Array]"
```

#### 3、Object是引用类型嘛？引用类型和基本类型有什么区别？哪个是存在堆哪一个是存在栈上面的？
- 是
- 基本类型值：指的是保存在栈内存中的简单数据段，栈区包括了 变量的标识符和变量的值
- 引用类型值：指的是那些保存在堆内存中的对象，意思是，变量中保存的实际上只是一个指针，这个指针指向内存堆中实际的值
- 引用类型的存储需要内存的栈区和堆区（堆区是指内存里的堆内存）共同完成，栈区内存保存变量标识符和指向堆内存中该对象的指针，也可以说是该对象在堆内存的地址

> 对象变量它里面的值是这个对象在堆内存中的内存地址。

JavaScript有两种类型的数据，值类型和引用类型，一般的数字，字符串，布尔值都是值类型，存放在栈中，而对象，函数，数组等是引用类型，存放在堆中，对引用类型的复制其实是引用复制，相当于复制着地址，对象并没有真正的复制。
```javascript
var a=5;
var b=a;
a=null;    //那么b是5

var a={},var b=a;
b.name="mbj";
console.log(a.name);   //mbj，因为a，b指向同一个对象
a=null;
console.log(typeof b);  
//object，a=null，只是a不再指向该对象，
//但是这个对象还是在堆中确确实实的存在，b依然指向它。
```

#### 4、JS常见的dom操作api
```javascript
createElement
createTextNode
getElementById
getElementsByClassName
appendChild
insertBefore
setAttribute
getAttribute
```

#### 5、解释一下事件冒泡和事件捕获
1、一个完整的JS事件流是从window开始，最后回到window的一个过程
2、事件流被分为三个阶段(1 ~ 5)捕获过程、(5 ~ 6)目标过程、(6 ~ 10)冒泡过程

事件冒泡就是事件从最深的节点开始，然后逐步向上传播事件的过程

事件捕获就是从window开始，逐步向最深的节点传播事件的过程

#### 6、事件委托（手写例子），事件冒泡和捕获，如何阻止冒泡？如何阻止默认事件？
事件委托指的是，不再事件的发生地设立监听函数，而是在事件发生地的父元素或者祖先元素设置监听器函数，这样可以大大提高性能，因为可以减少绑定事件的元素。

适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress

```javascript
var ul = document.getElementByTagName('ul)[0]
ul.onclick = function(e) {
  e = e || window.event
  alert(e.target.innerHtml)
}

// 阻止冒泡: window.event? window.event.cancelBubble = true(IE) : e.stopPropagation()
// 阻止默认事件: e.preventDefault() || window.event.returnValue = false(IE)
```

#### 7、对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？
- 闭包：闭包就是能够读取其他函数内部变量的函数 
-  闭包的作用及好处：
  * 一个是前面提到的可以读取函数内部的变量
  * 一个就是让这些变量的值始终保持在内存中，不会在外部函数调用后被自动清除

- 使用闭包的注意点：
  * 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。 
  * 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

```javascript
// 声明一个函数表达式
var add = function(x){
    var sum = x;
    // 在函数表达式内部有一个求和的内部函数
    var tmp = function(y){
        sum += y;// 求和
        return tmp;
    }
    // 构建一个函数体的toString()函数
    tmp.toString = function(){
        return sum;
    }
    return tmp; // JavaScript中，打印和相加计算，会分别调用toString或valueOf函数，所以我们重写tmp的toString和valueOf方法，返回sum的值
}

add(1)(2)(3)(4)   // function 10
var a = add(1)(2)(3)(4).toString();  //10

1、函数add(1)第一次调用，其实是只声明了var sum 这个变量，然后返回了tmp函数体，用于后面调用tmp函数

2、函数add(1)(2)第二次调用才真正的把参数传进来使用了，即第一次传的　1　是没地方用的，没意义，第二次传的　2　是给第一次返回的tmp函数体传的参、即用在 sum=sum+x上 ---- sum=1+2

3、函数add(1)(2)(3)第三次调用和第二次一样，由于tmp函数体内部　return tmp  返回了本身，所以后面可以继续调用tmp函数，也就是除第一次调用传参无效外，后面可以调用无数次，sum值会不断累加

4、toString是tmp函数体附带的属性方法函数，会随着主体函数toString执行一次调用一次
```

#### 8、this有哪些使用场景？跟C,Java中的this有什么区别？如何改变this的值？
可以是全局对象、当前对象或者任意对象，这完全取决于函数的调用方式 
作为对象方法调用
作为函数调用
作为构造函数调用

Java中 this 的含义是一样的，均指当前对象

apply / call / bind

- input点击，获取值

```javascript
<input type=”button” onclick=”showInfo(this);” value=”点击一下”/>

function showInfo(_this) {
	let value = _this.value;
	let type  = _this.type;
  console.log(value);
  console.log(type);
}
```

- 构造函数

```javascript
function animal(name,color) {
	this.name12 = name;
	this.color12 = color;
	console.log(name12);
	console.log(color12);
};
animal('tiger','yellow')
```

- 在html元素事件属性中使用

```javascript
var btn = document.getElementById("text");
btn.onclick = function() {
  alert(this.value);    //此处的this是按钮元素
}
```

- apply()/call()求数组最值

```javascript
var  numbers = [5, 458 , 120 , -215 ];
var  maxInNumbers = Math.max.apply(this, numbers);
// var  maxInNumbers = Math.max.apply(null, numbers);
// let  maxInNumbers = Math.max(...numbers);
console.log(maxInNumbers);  // 458
```

#### 9、call，apply，bind
- 都是用来改变 this指向的；第一个参数都是 `this` 要指向的对象，也就是想指定的上下文；
- call和apply是直接执行函数。call的第二部分参数要一个一个传，apply要把这些参数放到数组中；
- bind 返回的是一个新的函数，你必须调用它才会被执行。

```javascript
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
apply.getColor.call(banana)	// color is yellow
apply.getColor.apply(banana)	// color is yellow
//  所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作

实例：
var  numbers = [5, 458 , 120 , -215]
Math.max.apply(null, numbers)	// 458
Math.min.call(null, 5, 458 , 120 , -215)	// -215

面试题：
定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：
function log(){
  console.log.apply(null, arguments)
}
log(1, 'www', '&&&')	// 1 "www" "&&&"

进阶：开头加上（app）：
function log(){
  var args = Array.prototype.slice.call(arguments)	// 需要将伪数组转化为标准数组
	args.unshift('(app)')
	console.log.apply(null, args)
}
log(1, '***')	// (app) 1 ***

--- bind:
var a = document.write
// this指向global或window对象
a('test')	// Uncaught TypeError: Illegal invocation	
a.bind(document)('test')	// success

// 伪数组转化为标准数组
1、 Array.prototype.slice.call(arguments)
2、
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(slice)
slice(arguments)	// arguments转换成了标准数组

// 多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

```

#### 10、prototype、proto和constructor

```javascript
面试题1:
var F = function () {}
Object.prototype.a = function () {}
Function.prototype.b = function () {}

var f = new F()
// 请问f有方法a  方法b吗
f.a()	// success	
// because:	f.__proto__ === F.prototype  F.prototype.__proto__ === Object.prototype  

f.b()	// f.b is not a function
// 	而f的原型链上没经过Function.prototype

面试题2:
function Foo () {}	// 构造函数
let foo1 = new Foo()	// 实例对象
let foo2 = new Foo()	// 实例对象
let obj = {}
// 写出 foo1  foo2  Foo  Function   obj   Object的原型链 ???

foo1.__proto__ === Foo.prototype
foo2.__proto__ === Foo.prototype

Foo.__proto__ === Object.prototype
Foo.prototype === Object.prototype

Foo.prototype.__proto__ === Object.prototype
Foo.prototype.constructor === Foo

//  Function.prototype是引擎创造出来的对象，一开始就有了，又因为其他的构造函数都可以通过原型链找到Function.prototype，Function本身也是一个构造函数，为了不产生混乱，就将这两个联系到一起了
Function.__proto__ === Function.prototype
Function.prototype === Function.prototype

Function.prototype.__proto__ === Object.prototype
Function.prototype.constructor === Function

obj.__proto__ === Object.prototype

// Object是对象的构造函数，那么它也是一个函数，当然它的__proto__也是指向Function.prototype
Object.__proto__ === Function.prototype	
Object.prototype === Object.prototype

Object.prototype.__proto__ === null
Object.prototype.constructor === Object

// 构造函数有一个prototype属性，指向实例对象的原型对象
Foo.prototype === foo1.__proto__

// 通过同一个构造函数实例化的多个对象具有相同的原型对象
foo1.__proto__ === foo2.__proto__

// 原型对象上默认有一个属性constructor，指向该原型对象对应的构造函数
Foo.prototype.constructor === Foo

foo1.__proto__.constructor === Foo

// 由于实例对象可以继承原型对象的属性，所以实例对象也拥有constructor属性，同样指向原型对象对应的构造函数
foo1.constructor === Foo

// isPrototypeOf用来判断实例对象与原型对象的关系
Foo.prototype.isPrototypeOf(f1)	// true 

// Object.getPrototypeOf() 返回该实例对象对应的原型对象，和proto是一样的，都返回原型对象
Object.getPrototypeOf(foo1)	// Foo.prototype
Object.getPrototypeOf(foo1) === foo1.__proto__

// in操作符可以判断某个属性在不在对象上，但无法区分是自有属性还是继承属性
// hasOwnPrototype可以判断该属性是自有属性还是继承属性

```

1. 每个函数在定义时都会自动带一个prototype属性，该属性是一个指针，指向一个对象，该对象称之为原型对象（通过prototype实现js的继承）。

2. 原型对象上默认有一个属性constructor，指向该原型对象对应的构造函数。

3. 通过调用构造函数创建的实例对象，都有一个内部属性__proto__，指向该构造函数的原型对象。其实例对象可以访问该原型对象上的所有属性和方法。

4. 总结:

  每个构造函数都有一个原型对象，原型对象上包含一个指向构造函数的指针，而实例对象都包含一个指向原型对象的内部指针。

  通俗的说，实例对象通过内部指针__proto__访问到原型对象，原型对象通过constructor找到构造函数。

  Foo.prototype只是一个指针，指向Foo的原型对象，利用这个指针可以实现JS的继承。

作用：
1. 肯定是为了继承！
2. prototype用来实现基于原型的继承与属性的共享。
3. __proto__就构成了我们常说的原型链访问构造方法中的显示原型，同样用于实现基于原型的继承。


#### 11、创建对象的多种方式
1. 对象字面量方式

   ```javascript
   var person = {
       name: 'Jack',
       age: 18,
       sayName: function () {
       	alert(this.name); 
   		}
    }
   // 大量重复代码
   ```

2. 工厂模式

   ```javascript
   function a (name, age) {
     var obj = new Object()
     obj.name = name
     obj.age = age
     obj.alert = function () {
       alert(this.name)
     }
     return obj
   }
   var a1 = a('name', 'age')
   // 工厂模式就是批量化生产, 由于是工厂暗箱操作的，所以你不能识别这个对象到底是什么类型
   ```

3. 构造函数（用来初始化新创建的对象的函数就是构造函数）

   ```javascript
   function Person (name, age) {
     this.name = name
     this.age = age
     this.say = function () {
       alert(this.name + this.age)
     }
   }
   var p1 = new Person('xxx', 22)
   var p1 = new Person('yyy', 18)
   
   // 拥有相同的功能的两个实例，却分配了不同的内存，浪费了内存空间
   p1.say === p2.say	// false
   
   ----------
   
   // 构造函数拓展模式
   // 把方法转移到构造函数外部，可以解决方法被重复创建的问题。
   function Person (name, age) {
     this.name = name
     this.age = age
     this.say = say
   }
   function say () {
     alert(this.name + this.age)
   }
   var p1 = new Person('xxx', 22)
   var p1 = new Person('yyy', 18)
   p1.say === p2.say	// true
   
   // 但是这是在全局作用域中定义，而且只供一个对象调用，不符合全局作用域的定义规范；并且如果有多个方法时，就要多个全局函数，严重污染全局空间。
   
   -------------
   // 寄生构造函数模式(是工厂模式和构造函数模式的结合)
   function A (name, age) {
     var obj = new Object()
     obj.name = name
     obj.age = age
     obj.alert = function () {
       alert(this.name)
     }
     return obj
   }
   var a1 = new A('name', 'age')
   var a2 = new A('name', 'age')
   
   // 寄生构造函数模式与构造函数模式有相同的问题，每个方法都要在每个实例上重新创建一遍，创建多个完成相同任务的方法完全没有必要，浪费内存空间
   a1.alert === a2.alert	// false
   
   // 使用该模式返回的对象与构造函数之间没有关系。因此，使用instanceof运算符和prototype属性都没有意义
   a1.__proto === A.prototype	// false
   ```

4. 原型模式

   ```javascript
   function Person () {}
   Person.prototype = {
     constructor: Person,	// 显示设置原型对象的constructor属性
     name: 'xxx',
     age: 20,
     favoraties: [],
     say: function () {
       alert(this.name + this.age)
     }
   }
   
   var p1 = new Person()
   var p2 = new Person()
   
   p1.favoraties.push('sing')
   p2.favoraties.push('song')
   p1.favoraties	// ["sing", "song"]
   p2.favoraties	// ["sing", "song"]
   
   // 引用类型的值在原型对象上会被共享，修改一个实例的值，也会改变其他实例的变化
   
   ```

5. 组合使用构造模式和原型模式

   ```javascript
   function Person (name, age) {
     this.name = name
     this.age = age
     this.say = function () {
       alert(this.age)
     }
   }
   Person.prototype = {
     constructor: Person,
     totalHobby: 'running',
     sing: function () {
       alert(this.name)
     }
   }
   
   var p1 = new Person('xxx', 20)
   var p1 = new Person('yyy', 18)
   
   // 将独立的属性和方法放在构造函数中，需要共享的属性和方法放在原型对象中，还支持向构造函数传递参数，这样可以最大限度的节省内存而又保留实例对象的独立性
   
   ----------
   // 动态原型模式
   // 动态原型模式将组合模式中分开使用的构造函数和原型对象都封装到了构造函数中，然后通过检查方法是否被创建，来决定是否初始化原型对象，也减少了全局空间的污染
   
   function Person (name, age) {
     this.name = name
     this.age = age
     if (typeof this.say != 'function') {
       this.prototype.say = function () {
         alert(this.age)
       }
     }
   }
   var p1 = new Person('name', 'age')
   p1.say()	
   ```

#### 12、实现继承的多种方式和优缺点
1. 原型继承
2. 构造函数实现继承
3. 组合式继承
4. 寄生组合式继承
5. es6中的class

```javascript
// 原型继承	(本质就是重写原型对象，代之以一个新类型的实例)

function Super () {
  this.value = true
  this.colors = ['red']
}
Super.prototype.getValue = function () {
  return this.value
}
function Sub () {}
Sub.prototype = new Super()	// here
Sub.prototype.constructor = Sub

var instance = new Sub()
instance.getValue()	// true

var instance2 = new Sub()
instance.colors.push('green')

instance.colors	// ["red", "green"]
instance2.colors	// ["red", "green"]


// 第一个缺点是所有子类共享父类的实例，其中一个子类修改了父类中引用对象的值，其他子类的属性值也会被修改
// 第二个缺点是在构造子类实例的时候，不能给父类传递参数。实际上，是没有办法在不影响所有对象实例的情况下，给父类传递参数。
```
```javascript
// 构造函数继承，也叫做 伪类继承 或 经典继承 （本质就是在子类构造函数内部借用call/apply方法调用父类的构造函数）

function Super (name, colors) {
  this.name = name
  this.colors = colors
}
function Sub () {
  // 继承了Super
  Super.call(this, 'xyz', ['red'])
}
var instance1 = new Sub()
instance1.name	// xyz

instance1.colors.push('white')
instance1.colors	// ['red', 'white']

var instance2 = new Sub()
instance2.colors	// ['red']
// 相对于原型继承来说，有一个很大的优势就是可以传递参数给父类，并且也可以解决引用类型实例属性共享的问题。
// 缺点是方法都定义在构造函数内部，无法复用
```
```javascript
// 组合继承（原型继承+构造函数继承）

function Super (name) {
  this.name = name
  this.colors = ['red']
}
Super.prototype.getName = function () {
	return this.name
}

function Sub (name, age) {
  // 继承属性
  // 第二次调用父类构造函数，Sub.prototype得到了name和colors，并覆盖了第一次得到的属性
  Super.call(this, name)
  this.age = age
}
// 继承方法
// 第一次调用父类构造函数，Sub.prototype得到了内部属性name，colors
Sub.prototype = new Super('xyz')
Sub.prototype.constructor = Sub
// 子类自己的方法
Sub.prototype.getAge = function () {
  return this.age
}

var instance1 = new Sub('xyz', 22)
instance1.getName()	// xyz
instance1.getAge()	// 22
instance1.colors.push('white')
instance1.colors	// ['red', 'white']

var instance2 = new Sub('zzz', 18)
instance2.colors	// ['red']

// 缺点是无论什么情况下，总会调用两次父类构造函数。第一次是在创建子类原型的时候，第二次是在子类构造函数内部
// 占用的空间更大了
```

```javascript
// 寄生组合式继承，解决了调用两次父类构造函数的问题
// 也是借用构造函数来继承不可共享的属性，通过原型链的混成形式来继承方法和可共享的属性。只不过把原型继承改成了寄生式继承。
// 使用寄生组合继承可以不必为了指定子类的原型而调用父类的构造函数，所以只继承了父类的原型属性，而父类的实例属性是借用构造函数的方式来得到的。

function Super (name) {
  this.name = name
  this.colors = ['red']
}
Super.prototype.getName = function () {
  return this.name
}

function Sub (name, age) {
  Super.call(this, name)
  this.age = age
}

// 本质上，是对传入的对象进行了一次浅复制
if (!Object.create){
  Object.create = function (proto) {
    function F() {}	// 临时的构造函数
    F.prototype = proto	// 将传进来的参数作为这个构造函数的原型
    return new F()	// 返回这个构造函数的新实例
  }
}

Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub

var instance1 = new Sub('xyz', 18)
instance1.getName()	// xyz
instance1.colors.push('white')
instance1.colors	// ['red', 'white']

var instance2 = new Sub('xyz2', 22)
instance2.colors	// ['red']

// 高效率体现在只调用了一次Super构造函数，并且因此避免了在Sub.prototype上创建不必要的、多余的属性。而且原型链不变

```

```javascript
// class

class Super {
  constructor (name) {
    this.name = name
    this.colors = ['red']
  }
	
  getName () {
    return this.name
  }
}

class Sub extends Super {
  constructor (name, age) {
    super(name)
    this.age = age
  }
  getAge () {
    return this.age
  }
}

var instance1 = new Sub('xyz', 18)
instance1.colors.push('white')
instance1.colors	// ['red', 'white']
instance1.getName()	// xyz

var instance2 = new Sub('xyz2', 22)
instance2.colors	// ['red']
instance2.getAge()	// 22

```

#### 13、new 一个对象具体做了什么

1. 创建一个空对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

```javascript
var obj = {}
obj.__proto = ClassA.prototype
ClassA.call(obj)
obj
```

#### 14、手写Ajax，XMLHttpRequest
1. 创建XMLHttpRequest对象
2. 指定响应函数
3. 打开连接（指定请求）
4. 发送请求
5. 创建响应函数
```javascript
var xmlhttp=null;//声明一个变量，用来实例化XMLHttpRequest对象
if (window.XMLHttpRequest){
// 新版本的浏览器可以直接创建XMLHttpRequest对象
  xmlhttp=new XMLHttpRequest();   
} else if (window.ActiveXObject) {
// IE5或IE6没有XMLHttpRequest对象，而是用的ActiveXObject对象
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
if (xmlhttp!=null) {
  xmlhttp.onreadystatechange=state_Change;//指定响应函数为state_Change
  xmlhttp.open("GET","/example/xdom/note.xml",true);//指定请求，这里要访问在/example/xdom路径下的note.xml文件，true代表的使用的是异步请求
  xmlhttp.send(null); //发送请求
} else {
  alert("Your browser does not support XMLHTTP.");
}

//创建具体的响应函数state_Change
function state_Change() {
  if (xmlhttp.readyState==4) {
    if (xmlhttp.status==200) {
      // 这里应该是函数具体的逻辑
    } else {
      alert("Problem retrieving XML data");
    }
  }
}

```
#### 15、变量提升
在函数体内，同名的局部变量或者参数的优先级会高于全局变量
JavaScript函数里的所有声明（只是声明，但不涉及赋值）都被提前到函数体的顶部，而变量赋值操作留在原来的位置

```javascript
var bar=1;
function test(){
  console.log(bar);     //undeifned
  var bar=2; 
  console.log(bar);  //2
}
test();


var foo=function(){  console.log(1); }
function foo(){  console.log(2); }
foo();  //结果为1
// 同样的，函数的定义也会到提升到最前面，上面的代码相当于
function foo(){  console.log(2); }
var foo;
foo=funciton(){ console.log(1); }
foo();   //1

```

#### 16、JavaScript的作用域和作用域链
函数的作用域是在定义函数时候就已经确定；

作用域简单来说，就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期；

JavaScript的作用域指的是变量的作用范围，内部作用域由函数的形参，实参，局部变量，函数构成；
内部作用域和外部的作用域一层层的链接起来形成作用域链；

当在在函数内部要访问一个变量的时候，首先查找自己的内部作用域有没有这个变量，如果没有就到这个对象的原型对象中去查找，还是没有的话，就到该作用域所在的作用域中找，直到window所在的作用域，每个函数在声明的时候就默认有一个外部作用域的存在了。

#### 17、函数的作用域是什么？js 的作用域有几种？
指在函数内声明的所有变量在函数体内始终是可见的，也就是说在函数体内变量声明之前就已经可用了。  

1. 全局变量：声明在函数外部的变量（所有没有var直接赋值的变量都属于全局变量）
2. 局部变量：声明在函数内部的变量

#### 18、指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？
本地对象就是 ECMA-262 定义的类（引用类型）
宿主对象是我们网页的运行环境，即“操作系统”和“浏览器”;所有非本地对象都是宿主对象

#### 19、document load和document DOMContentLoaded两个事件的区别

#### 20、=== 和 == , [] === [], undefined === undefined,[] == [], undefined == undefined
- [] === []   //false
- undefined === undefined //true
- [] == []    //false
- undefined == undefined  //true

#### 21、typeof能够得到哪些值
number, boolean, string, undefined, object, function.

> typeof 和 instanceof 区别，instanceof原理？

- typeof是一元运算符，返回值为字符串，该字符串用来说明运算数的数据类型 (数组、正则、日期、对象的typeof返回值都是object)
- typeof 返回： number, boolean, string, undefined, object, function
- instanceof用于判断某个变量是否是某个对象的实例，返回值为true或false

#### 22、什么是“use strict”,好处和坏处
严格模式        
1. 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的Javascript做好铺垫。

#### 23、举例说明一个匿名函数的典型用例

```javascript
$.("input").each(function(e){
    this.val('OK') 
});  
```

#### 24、JS如何实现重载和多态
重载:   
1. 根据arguments个数实现重载
2. 检测数据类型实现重载
3. jquery中的重载   

多态: 
实现形式包括：接口，抽象类，重载，重写。

#### 25、常用的数组api，字符串api
```javascript
// 数组: （一个对象，没有 push方法，只要有 length 和 splice 就会变为类数组）

1. 连接：arr.join("连接符")

> join不改变原数组，返回一个字符串

2. 拼接：arr.concat("a","b",arr1)

> concat不改变原数组，返回一个新数组

3. 截取：arr.slice(start[,end])

> slice不改变原数组，返回一个新数组

4. 删除、插入、替换：arr.splice(start,n[,value1,value2...])

> a=[0,1,2,3,4]   =>  a.splice(3,0,'b','c') =>  a = [0,1,2, 'b', 'c', 3,4]
> splice改变原数组，返回一个新数组

5. 翻转数组：arr.reverse()

> reverse改变原数组，返回翻转后的数组

6. 过滤数组：arr.filter(function(value,index,arr){return value > 7;})
7. 循环数组，无返回值：arr.forEach(function(value,index,arr){})
8. 循环数组，有返回值：arr.map(function(value,index,arr){})
9. pop() 删除并返回数组的最后一个元素，改变原数组
10. shift() 删除并返回数组的第一个元素，改变原数组
11. push() 向数组的末尾添加一个或更多元素，并返回新的长度，改变原数组
12. unshift()向数组的开头添加一个或更多元素，并返回新的长度，改变原数组

```

```javascript
// 字符串:

1. 截取：str.slice(from[,end])或str.substring(start[,end])或str.substr(start[,length])
2. 分割：str.split("分割符")
3. 查找：str.indexOf(value[,from])或str.lastIndexOf(value[,from])
4. 替换：str.replace("被替换字符","替换字符")
5. 拼接：str.concat(value)
6. 去掉字符串前后空格：str.trim()
7. str.match(reg)

```

#### 26、['1', '2', '3'].map(parseInt) what & why?

```javascript
// parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数
const intValue = parseInt(string[, radix]);

// string 要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用 ToString 抽象操作)。字符串开头的空白符将会被忽略。
// radix 一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。默认为10。
// 返回值 返回一个整数或NaN

parseInt(100); // 100
parseInt(100, 10); // 100
parseInt(100, 2); // 4 -> converts 100 in base 2 to base 10


['1', '2', '3'].map(parseInt) 
// 对于每个迭代map, parseInt()传递两个参数: 字符串和基数。所以实际执行的的代码是：< === >
['1', '2', '3'].map((item, index) => {
  return parseInt(item, index)
}) 

// >>>>
parseInt('1', 0) // 1
parseInt('2', 1) // NaN
parseInt('3', 2) // NaN, 3 不是二进制
//  1, NaN, NaN


['10','10','10','10','10'].map(parseInt);	// [10, NaN, 2, 3, 4]

```

#### 27、给定一个元素获取它相对于视图窗口的坐标

```javascript
div = document.getElementById('div')
div.offsetLeft	// 离左边距离
div.offsetTop		// 离上边距离
```

#### 28、如何实现图片滚动懒加载
到可视区域再加载。即先把真正的路径存在元素的“data-url”属性里，要用的时候就取出来，再设置

#### 29、原生事件绑定（跨浏览器），dom0和dom2的区别？

dom0级事件绑定: 把onclick写在标签内

dom2级事件绑定: 

```
btn.addEventListener('click',function(){
	alert('原生dom2级第一次click')
},false);
```

#### 30、浅拷贝、深拷贝
- 浅复制是只复制一层对象的属性，不会进行递归复制，而js存储对象都是存地址的，所以浅拷贝会导致对象中的子对象指向同一块内存地址；
- 深复制则是开辟新的栈，不仅将原对象的各个属性逐一复制出去，而且会将属性所包含的对象也依次采用浅拷贝的方式递归复制到新对象中，拷贝了所有层级。

```javascript
var obj = {
  a: 1,
  b: 2,
  c: [3, 4, 5]
}

// 浅拷贝
// 1、通过for-in方式实现
function simpleCopy (obj) {
  if (typeof obj != 'object') {
    return false
  }
  let copyObj = {}
  for(var i in obj) {
    copyObj[i] = obj[i]
  }
  return copyObj
}
simpleCopy(obj)	// {"a":1,"b":2,"c":[3,4,5]}

// 2、通过属性描述符
function simpleCopy2(obj) {
  if (typeof obj != 'object') {
    return
  }
  let copyObj = {}
  Object.entries(obj).forEach(item => {
    copyObj[item[0]] = item[1]
  })
  return copyObj
}
simpleCopy2(obj)

// 深拷贝 ------------------

// 1、JSON
function deepCopy1 (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 2、复制属性时，进行判断，如果是数组或者对象，则再次调用拷贝函数
function deepCopy2(obj, copyObj) {
  if (typeof obj != 'object') {
    return
  }
  var copyObj = copyObj || {}
  for(var i in obj) {
    // 过滤null
    if (typeof obj[i] === 'object' && Object.prototype.toString.call(obj[i]) !== '[object Null]') {
      copyObj[i] = Array.isArray(obj[i]) ? [] : {}
      deepCopy2(obj[i], copyObj[i])
    } else {
      copyObj[i] = obj[i]
    }
  }
  return copyObj;
}
deepCopy2(obj)
```

#### 31、编写一个通用的事件监听函数

```javascript
//
```

#### 32、sessionStorage、localStorage、web端cookie的设置和获取

sessionStorage、localStorage统称Web Storage，仅仅是为了本地存储而产生；

sessionStorage是会话级的数据存储，会话关闭时，数据会随之销毁；

localStorage是持久化的本地存储，没有过期时间，除非手动清除。

而Cookie的大小是受限的，并且不可跨域名，这是由Cookie的隐私安全机制决定的。每发送一次请求都会在请求头中带上cookie，无形中浪费了带宽。

```javascript
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString());
}
```
```javascript
function getCookie(c_name) {
    var that = this;　　　　
    if (document.cookie.length > 0) {
        //检查这个cookie是否存在，不存在就为 -1
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            //获取cookie值的开始位置
            c_start = c_start + c_name.length + 1;
            //通过";"号是否存在来判断结束位置
            c_end = document.cookie.indexOf(";", c_start);

            if (c_end == -1){
                c_end = document.cookie.length;
            }
            //通过substring()得到了值
            return unescape(document.cookie.substring(c_start, c_end))　　 
        }　　　　
    }　　　　
    return ""　　
}
```
#### 33、setTimeout和promise的执行顺序
```javascript
<script type="text/javascript">
    setTimeout(function() {
        console.log(1)
    }, 0);
    new Promise(function(a, b) {
        console.log(2);
        for(var i = 0; i < 10; i++) {
            i == 9 && a();
        }
        console.log(3);
    }).then(function() {
        console.log(4)
    });
    console.log(5)
</script>

////    2   3   5   4   1
```
then和settimeout执行顺序，即setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.then()在本轮“事件循环”结束时执行。因此then 函数先输出，settimeout后输出。

#### 34、JavaScript 的事件流模型都有什么？
- 事件流描述的是从页面中接收事件的顺序
- 捕获流，冒泡流；当事件发生时，事件由捕获过程->冒泡过程，即由捕获阶段->处于目标对象阶段->冒泡阶段组成
- 在冒泡型事件流中click事件传播顺序为<div>—><body>—><html>—>document
- 在捕获型事件流中click事件传播顺序为document—><html>—><body>—><div>
- DOM标准采用捕获+冒泡。两种事件流都会触发DOM的所有对象，从document对象开始，也在document对象结束。
- 事件流的典型应用: 事件代理；把事件处理器添加到父元素，等待子元素事件冒泡，并且父元素能够通过target（IE为srcElement）判断是哪个子元素，从而做相应处理

####  35、JS中的异步运行机制

- 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）；

- 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件；

- 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行；

- 主线程不断重复上面的第三步。

  

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- macro-task(宏任务)：包括整体代码script、setTimeout、setInterval、I/O、UI交互事件，可以理解是每次执行栈执行的代码就是一个宏任务；
- micro-task(微任务)：Promise，process.nextTick，可以理解是在当前 task 执行结束后立即执行的任务；

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。



在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型比较复杂，但关键步骤如下：

1、首先进入整体代码(宏任务)后，开始第一次循环；

2、如果遇到微任务，就将它添加到微任务的任务队列中；

3、宏任务执行完毕后，立即依次执行当前微任务队列中的所有微任务；

4、当前宏任务执行完毕，开始检查渲染，然后开始页面渲染；

5、渲染完成后，开始下一个宏任务。



Promise中的异步体现在`then`和`catch`中，所以写在Promise中的代码是被当做同步任务立即执行的；

promise加入到队列的优先级高于setTimeout；

实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码；

因为async await 本身就是promise+generator的语法糖。所以await后面的代码是microtask。

#### 36、00000 解释下Event-Loop



#### 37、navigator对象，location和history
- Navigator 对象包含有关浏览器的信息
- Location 对象包含有关当前 URL 的信息
- History 对象包含用户（在浏览器窗口中）访问过的 URL

#### 38、js的垃圾回收机制
一旦函数结束，局部变量就不需要了，这时候就可以释放他们的内存。

两种回收机制:

- 引用计数法

跟踪记录每个值被引用的次数。当声明一个变量并将引用类型的值赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次 数加1.相反，如果包含对这个值引用的变量又取得另外一个值，则这个值的引用次数减1.当这个值的引用次数变成0时，则说明没有办法访问这个值了，因此就 可以将其占用的内存空间回收回来

- 标记清除法
标记清除的算法分为两个阶段，标记(mark)和清除(sweep)
第一阶段从引用根节点开始标记所有被引用的对象，第二阶段遍历整个堆，把未标记的对象清除。


#### 39、内存泄漏的原因和场景
内存泄漏指的是浏览器不能正常的回收内存的现象

1. 全局变量引起的内存泄漏
2. 闭包引起的内存泄漏
3. dom清空或删除时，事件未清除导致的内存泄漏

#### 40、四种调用函数的方式

函数调用模式、方法调用模式、构造器模式、apply / call模式

#### 41、DOM事件的绑定的几种方式
1. 在DOM元素中直接绑定；
2. 在JavaScript代码中绑定；
3. 绑定事件监听函数。

#### 42、DOM事件中target和currentTarget的区别
- event.target 返回触发事件的元素 
- event.currentTarget 返回绑定事件的元素

#### 43、js动画和css3动画比较
CSS动画
优点： 
-  (1)浏览器可以对动画进行优化
-  (2)代码相对简单,性能调优方向固定
-  (3)对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码
缺点：
- 1、运行过程控制较弱,无法附加事件绑定回调函数。CSS动画只能暂停,不能在动画中寻找一个特定的时间点，不能在半路反转动画，不能变换时间尺度，不能在特定的位置添加回调函数或是绑定回放事件,无进度报告
- 2、代码冗长。想用 CSS 实现稍微复杂一点动画,最后CSS代码都会变得非常笨重

JS动画 优点：
- (1)JavaScript动画控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。
- (2)动画效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有JavaScript动画才能完成
- (3)CSS3有兼容性问题，而JS大多时候没有兼容性问题
缺点：
- 1JavaScript在浏览器的主线程中运行，而主线程中还有其它需要运行的JavaScript脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况。
- 2代码的复杂度高于CSS动画


#### 44、JavaScript 倒计时（setTimeout）

#### 45、js处理异常

#### 46、js的设计模式知道那些

#### 47、轮播图的实现，以及轮播图组件开发，轮播10000张图片过程

#### 48、websocket的工作原理和机制。
Websocket是一个持久化的协议，是基于HTTP协议的

#### 49、手指点击可以触控的屏幕时，是什么事件？ 什么是函数柯里化？以及说一下JS的API有哪些应用到了函数柯里化的实现？(函数柯里化一些了解，以及在函数式编程的应用，- 最后说了一下JS中bind函数和数组的reduce方法用到了函数柯里化。)

#### 50、如何判断一个对象是否为空

```javascript
1.将json对象转化为json字符串，再判断该字符串是否为"{}"
var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//true


2.for in 循环判断
var obj = {};
var b = function() {
    for(var key in obj) {
        return false;
    }
    return true;
}
alert(b());//true


3、jquery的isEmptyObject方法
此方法是jquery将2方法(for in)进行封装，使用时需要依赖jquery
var data = {};
var b = $.isEmptyObject(data);
alert(b);//true

4.Object.getOwnPropertyNames()方法
此方法是使用Object对象的getOwnPropertyNames方法，
获取到对象中的属性名，存到一个数组中，返回数组对象，
我们可以通过判断数组的length来判断此对象是否为空
注意：此方法不兼容ie8，其余浏览器没有测试
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//true

5.使用ES6的Object.keys()方法
与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组
var data = {};
var arr = Object.keys(data);
alert(arr.length == 0);//true

```

#### 51、检测对象类型
Object.prototype.toString.call(obj) === "[object Object]"

toString方法返回反映这个对象的字符串

> 怎么判断两个对象相等？

```javascript
obj={
    a:1,
    b:2
}
obj2={
    a:1,
    b:2
}
JSON.stringify(obj)==JSON.stringify(obj2);//true
```

#### 52、跨域的几种方式jsonp
- （利用script标签的跨域能力）跨域
- websocket（html5的新特性，是一种新协议）跨域
- 设置代理服务器（由服务器替我们向不同源的服务器请求数据）
- CORS（跨源资源共享，cross origin resource sharing）
- iframe跨域
- postMessage(包含iframe的页面向iframe传递消息)

#### 53、http状态码

http状态码是表示服务器对请求的响应状态，
主要分为以下几个部分
- 1**：这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束
- 2**：表示请求成功
- 3**：表示重定向
- 4**：表示客户端错误
- 5**：表示服务器端错误
- 100（continue），客户端应当继续发送请求。这个临时响应是用来通知客户端它的部分请求已经被服务器接收
- 200（OK），表示请求成功，请求所希望的响应头或数据体将随此响应返回。
- 202（Accepted），服务器已接受请求，但尚未处理。
- 204（No-Content），服务器成功处理了请求，但不需要返回任何实体内容
- 205（Reset-Content），服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。该响应主要是被用于接受用户输入后，立即重置表单，以便用户能够轻松地开始另一次输入。
- 206（Partial-Content），服务器已经成功处理了部分 GET 请求。
- 301（Moved-Permanently），永久性重定向
- 302（Moved-Temporarily），暂时性重定向
- 304（Not-Modified），浏览器端缓存的资源依然有效
- 400（Bad-Reques），请求有误，当前请求无法被服务器理解。
- 401（Unauthorized），当前请求需要用户验证。
- 403（Forbidden），服务器已经理解请求，但是拒绝执行它。
- 404（Not-Found），请求的资源没有被找到
- 500（Interval Server Error），服务器内部错误
- 502（Bad GateWay），网关出错
- 503（Service Unavailable），由于临时的服务器维护或者过载，服务器当前无法处理请求。
- 504（Gateway Timeout），作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。

#### 54、xss，csrf的概念以及防范方法
- xss：跨站脚本攻击，如果不过滤执行了js代码，可能导致cookie泄露等。防止：过滤
- csrf：跨站请求伪造，挟制用户在当前已登录的Web应用程序上执行非本意的操作。防止：设置token、写操作用post、JSON API禁用CORS、禁用跨域请求、检查referrer

#### 55、描述一下this

this，函数执行的上下文，可以通过apply，call，bind改变this的指向。对于匿名函数或者直接调用的函数来说，this指向全局上下文（浏览器为window，nodejs为global），剩下的函数调用，那就是谁调用它，this就指向谁。当然还有es6的箭头函数，箭头函数的指向取决于该箭头函数声明的位置，在哪里声明，this就指向哪里


#### 56、说一下浏览器的缓存机制

浏览器缓存机制有两种，一种为强缓存，一种为协商缓存。
对于强缓存，浏览器在第一次请求的时候，会直接下载资源，然后缓存在本地，第二次请求的时候，直接使用缓存。
对于协商缓存，第一次请求缓存且保存缓存标识与时间，重复请求向服务器发送缓存标识和最后缓存时间，服务端进行校验，如果失效则使用缓存。

- 强缓存方案

Exprires：服务端的响应头，第一次请求的时候，告诉客户端，该资源什么时候会过期。Exprires的缺陷是必须保证服务端时间和客户端时间严格同步。
Cache-control：max-age，表示该资源多少时间后过期，解决了客户端和服务端时间必须同步的问题，

- 协商缓存方案

If-None-Match/ETag：缓存标识，对比缓存时使用它来标识一个缓存，第一次请求的时候，服务端会返回该标识给客户端，客户端在第二次请求的时候会带上该标识与服务端进行对比并返回If-None-Match标识是否表示匹配。
Last-modified/If-Modified-Since：第一次请求的时候服务端返回Last-modified表明请求的资源上次的修改时间，第二次请求的时候客户端带上请求头If-Modified-Since，表示资源上次的修改时间，服务端拿到这两个字段进行对比。


#### 57、进程和线程区别是什么？
进程是分配内存的最小单位，线程是CPU调度的最小单位，进程可以包含多个线程。

#### 58、执行上下文、执行栈？
执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。
- 全局执行上下文：只有一个，浏览器中的全局对象就是 window 对象，this 指向这个全局对象。
- 函数执行上下文：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。
- Eval 函数执行上下文： 指的是运行在 eval 函数中的代码，不用很少用而且不建议使用。









