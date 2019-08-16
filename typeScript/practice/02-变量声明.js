/**
 * var let vs const
 */
// 尽量用let替代var
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b;
// 解构
/**
 * 解构数组
 */
var input = [1, 3];
var one = input[0], two = input[1];
// swap variables
_a = [one, two], two = _a[0], one = _a[1];
function f(_a) {
    var one = _a[0], two = _a[1];
    console.log(one, two);
}
f([33, 55]);
/**
 * 对象解构
 */
var o = {
    a: "foo",
    b: 12,
    c: "bar",
    d: 99,
    e: 'eee'
};
var a = o.a, b = o.b;
// 需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块
(_b = { a: 'aaa', b: 22 }, a = _b.a, b = _b.b);
console.log(a, b);
// 可以在对象里使用...语法创建剩余变量
var c = o.c, rest = __rest(o, ["c"]);
console.log(c + rest.e.length); // bar3
/**
 * 属性重命名
 */
// 可以给属性以不同的名字
// let { a: newName1, b: newName2 } = o;
// 指定它的类型
var d = o.d, e = o.e;
/**
 * 默认值 可以让你在属性为 undefined 时使用缺省值
 * @param obj
 */
function keepWholeObject(obj) {
    var a = obj.a, _a = obj.b, b = _a === void 0 ? 100 : _a;
}
function fn(_a) {
    var a = _a.a, b = _a.b;
    //
}
/**
 * 展开
 */
var first = [1, 2];
var second = [3, 4];
var bothPlus = [0].concat(first, second, [5]); // [0, 1, 2, 3, 4, 5]
// 还可以展开对象
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({}, defaults, { food: "rich" }); // { food: "rich", price: "$$", ambiance: "noisy" }
// 对象展开还有其它一些意想不到的限制。 
// 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
var D = /** @class */ (function () {
    function D() {
        this.p = 12;
    }
    D.prototype.m = function () {
    };
    return D;
}());
var dd = new D();
var clone = __assign({}, dd);
clone.p; // 12
// clone.m(); // error!
console.log(clone);
