
/**
 * Set ES6中新的数据结构，类似于数组，但是无序 值不重复
 * Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化
 */
const b = [1,2,3,4,3,2]
let mySet = new Set(b)
mySet.add(6)

for (const i of mySet) {
    console.log(i)  // 1 2 3 4 6
}

mySet.delete(1);
console.log(mySet.size);   // 4

// 去除重复成员
[...new Set(b)]; // 1 2 3 4 6
// 去除重复字符
[...new Set('xyzxyuuz')].join('')   // xyzu


/**
 * WeakSet是一个构造函数，接收数组或者类数组作为参数，任何具有Iteratle接口的对象都可以作为参数
 * 
 * 将a作为WeakSet构造函数的参数，a的成员会自动成为WeakSet的成员
 * 注意：是a的成员，不是a。所以数组的成员只能是对象
 */

const a = [[1,2], [3,4]]
let myWeakSet = new WeakSet(a)

console.log(myWeakSet)  // WeakSet {[1, 2], [3, 4]}

myWeakSet.add(global || window)
console.log(myWeakSet.has(global || window))    // true



/**
 * Map 类似于对象，也是键值对的集合，但是键值可以是任意类型的数据
 */
let myMap = new Map()
const o = {'p': 'hello world'}
myMap.set(o, 'os content')

myMap.get(o)    // "os content"

// 只有对同一个对象的引用，Map 结构才将其视为同一个键
myMap.get({'p': 'hello world'})    // undefined


/**
 * WeakMap与Map结构类似，也是用于生成键值对的集合
 * 但是，WeakMap只接收对象作为键名（不包括null），
 * 再次，WeakMap的键名指向的对象不计入垃圾回收机制
 * 
 * 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。
 * 当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
 * 
 * WeakMap结构有助于防止内存泄漏
 */
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"

// 上面代码中，先新建一个 Weakmap 实例。
// 然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。
// 这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制
// 一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。





