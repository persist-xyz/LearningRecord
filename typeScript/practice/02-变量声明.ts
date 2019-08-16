
/**
 * var let vs const
 */
// 尽量用let替代var

// 解构

/**
 * 解构数组
 */
let input = [1, 3];
let [one, two] = input;
// swap variables
[two, one] = [one, two];

function f([one, two]: [number, number]) {
    console.log(one, two)
}
f([33, 55])


/**
 * 对象解构
 */
let o = {
    a: "foo",
    b: 12,
    c: "bar",
    d: 99,
    e: 'eee'
};
let { a, b } = o;

// 需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块
({a, b} = {a: 'aaa', b: 22})
console.log(a, b)

// 可以在对象里使用...语法创建剩余变量
let {c, ...rest} = o
console.log(c + (<string> rest.e).length)   // bar3


/**
 * 属性重命名
 */
// 可以给属性以不同的名字
// let { a: newName1, b: newName2 } = o;
// 指定它的类型
let {d, e}: {d: number, e: string} = o


/**
 * 默认值 可以让你在属性为 undefined 时使用缺省值
 * @param obj 
 */
function keepWholeObject (obj: {a: string, b?: number}) {
    let {a, b = 100} = obj
}


/**
 * 函数声明
 */
type C = {a: string, b?: number}
function fn({a, b}: C): void {
    //
}


/**
 * 展开
 */
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5]; // [0, 1, 2, 3, 4, 5]

// 还可以展开对象
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" }; // { food: "rich", price: "$$", ambiance: "noisy" }

// 对象展开还有其它一些意想不到的限制。 
// 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
class D {
    p = 12;
    m() {
    }
}
let dd = new D();
let clone = { ...dd };
clone.p; // 12
// clone.m(); // error!
console.log(clone)