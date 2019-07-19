#### 1、你了解浅拷贝、深拷贝吗？

- 浅拷贝是只复制一层对象的属性，不会进行递归复制，而js存储对象都是存地址的，所以浅拷贝会导致对象中的子对象指向同一块内存地址；
- 深拷贝则是开辟新的栈，不仅将原对象的各个属性逐一复制出去，而且会将属性所包含的对象也依次采用浅拷贝的方式递归复制到新对象中，拷贝了所有层级。



 浅拷贝的实现

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

```



深拷贝的简易版本

```javascript
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

推荐查看 [lodash 的深拷贝函数](https://link.juejin.im/?target=https%3A%2F%2Flodash.com%2Fdocs%23cloneDeep)





#### 2、对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？

- 闭包：闭包就是能够读取其他函数内部变量的函数 
- 闭包的作用及好处：
  - 一个是前面提到的可以读取函数内部的变量
  - 一个就是让这些变量的值始终保持在内存中，不会在外部函数调用后被自动清除
- 使用闭包的注意点：
  - 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。 
  - 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。



常见笔试题：

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

// 1、函数add(1)第一次调用，其实是只声明了var sum 这个变量，然后返回了tmp函数体，用于后面调用tmp函数

//2、函数add(1)(2)第二次调用才真正的把参数传进来使用了，即第一次传的　1　是没地方用的，没意义，第二次传的　2　是给第一次返回的tmp函数体传的参、即用在 sum=sum+x上 ---- sum=1+2

// 3、函数add(1)(2)(3)第三次调用和第二次一样，由于tmp函数体内部　return tmp  返回了本身，所以后面可以继续调用tmp函数，也就是除第一次调用传参无效外，后面可以调用无数次，sum值会不断累加

// 4、toString是tmp函数体附带的属性方法函数，会随着主体函数toString执行一次调用一次
```



#### 3、如何理解原型？如何理解原型链？

1. 每个函数在定义时都会自动带一个prototype属性，该属性是一个指针，指向一个对象，该对象称之为原型对象（通过prototype实现js的继承）。

2. 原型对象上默认有一个属性constructor，指向该原型对象对应的构造函数。

3. 通过调用构造函数创建的实例对象，都有一个内部属性__proto__，指向该构造函数的原型对象。其实例对象可以访问该原型对象上的所有属性和方法。

4. 总结:

   每个构造函数都有一个原型对象，原型对象上包含一个指向构造函数的指针，而实例对象都包含一个指向原型对象的内部指针。

   通俗的说，实例对象通过内部指针__proto__访问到原型对象，原型对象通过constructor找到构造函数。

   Foo.prototype只是一个指针，指向Foo的原型对象，利用这个指针可以实现JS的继承。



原型链的作用：

1. 肯定是为了继承！
2. prototype用来实现基于原型的继承与属性的共享。
3. __proto__就构成了我们常说的原型链访问构造方法中的显示原型，同样用于实现基于原型的继承。



```javascript
// 面试题1:
var F = function () {}
Object.prototype.a = function () {}
Function.prototype.b = function () {}

var f = new F()

// 请问f有方法a  方法b吗
f.a()	// success	
// because:	f.__proto__ === F.prototype  F.prototype.__proto__ === Object.prototype  

f.b()	// f.b is not a function
// 	而f的原型链上没经过Function.prototype

```



```javascript
// 面试题2:
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



#### 4、创建对象有哪些方式？

1、对象字面量方式

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



2、工厂模式

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



3、构造函数（用来初始化新创建的对象的函数就是构造函数）

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



4、原型模式

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



5、组合使用构造模式和原型模式

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



#### 5、实现继承的多种方式和优缺点

1、原型继承

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



2、构造函数实现继承

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



3、组合式继承

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



4、寄生组合式继承

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

ES5的继承 是通过原型或构造函数机制来实现，实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。



5、es6中的class

ES6封装了class，extends关键字来实现继承，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。

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





