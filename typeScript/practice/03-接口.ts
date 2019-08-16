/**
 * 接口
 * TypeScript的核心原则之一是对值所具有的结构进行类型检查
 * TypeScript里，接口的作用 就是为这些类型命名和为你的代码或第三方代码定义契约
 * 
 * 若一个类要实现一个接口，那么这个类的内部一定要实现这个接口内部的所有的方法
 */

// 包含一个label属性且类型为string
interface LabelledValue {
    label: string
}
function printLabel (labelledObj: LabelledValue): void {
    console.log(labelledObj.label)
}
let obj = {size: 10, label: 'xyz'}
printLabel(obj)


/**
 * 可选属性 
 * 接口里的属性不全都是必需的
 */
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});


/**
 * 只读属性
 */
interface point{
    readonly x: number,
    readonly y: number
}
let p: point = {x: 1, y: 2}
// p.x = 9 // error

// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，
// 只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

let a: number[] = [3, 4, 5]
let p1: ReadonlyArray<number> = a
console.log(p1) // [3, 4, 5]
// a = p1  // error

// 但是可以用类型断言重写：
a = p1 as number[]   // [3, 4, 5]


/**
 * 额外的属性检查
 */
interface SquareConfig1{
    width?: number,
    color?: string
}
function createSquare1 (config: SquareConfig1): void {
    //  
}
// createSquare1({area: '', width: 2})  // error

// 如果 传入的参数 字面量对象中有接口中没有的字段，则会报错
// 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误

// 如何避免去检查这个额外属性呢？
// 1、使用类型断言
createSquare1({area: '', width: 2} as SquareConfig1)
// 2、使用, [propName: string]: any 表示可以有任意数量的属性
interface SquareConfig2{
    width?: number,
    color?: string,
    [propName: string]: any
}
// 3、将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错
let squareOptions = {area: '', width: 2}
createSquare1(squareOptions)



/**
 * 函数类型
 */
interface SearchFunc{
    (souce: string, subString: string): boolean;
}

let fn: SearchFunc
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
fn = function(sou: string, sub: string) {
    let result = sou.search(sub)
    return result > -1
}



/**
 * 可索引的类型
 * TypeScript支持两种索引签名：字符串和数字
 */

/**
 * 定义了StringArray接口，它具有索引签名
 * 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值
 */
interface StringArray{
    [index: number]: string
}
let myArray:StringArray
myArray = ['hello', 'world']

let myStr: string = myArray['1']
console.log(myStr)

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: string]: Animal;
    // [x: string]: Dog;    // error
}

// 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
















