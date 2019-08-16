/**
 * 接口
 * TypeScript的核心原则之一是对值所具有的结构进行类型检查
 * TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
 */
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var obj = { size: 10, label: 'xyz' };
printLabel(obj);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p = { x: 1, y: 2 };
// p.x = 9 // error
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，
// 只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
var a = [3, 4, 5];
var p1 = a;
console.log(p1); // [3, 4, 5]
// a = p1  // error
// 但是可以用类型断言重写：
a = p1; // [3, 4, 5]
function createSquare1(config) {
    //  
}
// createSquare1({area: '', width: 2})  // error
// 如果 传入的参数 字面量对象中有接口中没有的字段，则会报错
// 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误
// 如何避免去检查这个额外属性呢？
// 1、使用类型断言
createSquare1({ area: '', width: 2 });
// 3、将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错
var squareOptions = { area: '', width: 2 };
createSquare1(squareOptions);
var fn;
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
fn = function (sou, sub) {
    var result = sou.search(sub);
    return result > -1;
};
var myArray;
myArray = ['hello', 'world'];
var myStr = myArray['1'];
console.log(myStr);
