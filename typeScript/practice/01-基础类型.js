// Boolean
var isDone = false;
// number
// 支持十进制、十六进制、二进制和八进制字面量
var num = 1;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// string
var str = 'xyz';
var output = str + " is my,,,";
// array
// first 在元素类型后面接上 []，表示由此类型元素组成的一个数组
var arr1 = [1, 2, 3];
// second 使用数组泛型，Array<元素类型>
var arr = [1, 484];
// Tuple
var tup = [1, 'hello'];
// tup[3] = 'world'; // error
// enum
// 默认情况下，从0开始为元素编号
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["White"] = 2] = "White";
})(Color || (Color = {}));
var r = Color.Red;
// 也可以手动的指定成员的数值
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 2] = "Red";
    Color2[Color2["Black"] = 3] = "Black";
    Color2[Color2["White"] = 4] = "White";
})(Color2 || (Color2 = {}));
// 或者，全部都采用手动赋值
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 6] = "Red";
    Color3[Color3["Black"] = 3] = "Black";
    Color3[Color3["White"] = 4] = "White";
})(Color3 || (Color3 = {}));
console.log(Color.Red, Color.White, Color2.Red, Color3.Red);
// 可以通过枚举的值找到它对应的名字
console.log(Color3[3]);
