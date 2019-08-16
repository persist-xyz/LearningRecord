// Boolean
let isDone: Boolean = false


// number
// 支持十进制、十六进制、二进制和八进制字面量
let num: Number = 1
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744


// string
let str: string = 'xyz'
let output: string = `${str} is my,,,`


// array
// first 在元素类型后面接上 []，表示由此类型元素组成的一个数组
let arr1: number[] = [1, 2, 3]
// second 使用数组泛型，Array<元素类型>
let arr: Array<number> = [1, 0o744]


// Tuple
let tup: [number, string] = [1, 'hello']
// tup[3] = 'world'; // error


// enum
// 默认情况下，从0开始为元素编号
enum Color {Red, Black, White}
let r: Color = Color.Red

// 也可以手动的指定成员的数值
enum Color2 {Red = 2, Black, White}

// 或者，全部都采用手动赋值
enum Color3 {Red = 6, Black = 3, White = 4}

console.log(Color.Red, Color.White, Color2.Red, Color3.Red)

// 可以通过枚举的值找到它对应的名字
console.log(Color3[3])  // Black


// any 某些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 
// 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
// 那么我们可以使用 any类型来标记这些变量
let notSure: any = 4
notSure = "maybe a string instead"
notSure = false


// void 用于函数没有返回值的情况
// 若声明一个变量类型是void，则只能赋值undefined or null
function a(): void{
    console.log(`my is return void`)
}


// Null 和 Undefined
// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 
// 和 void相似，它们的本身的类型用处不是很大
let u: undefined = undefined;
let n: null = null;

// 默认情况下null和undefined是所有类型的子类型
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自


// Never 表示那些永不存在的值的类型
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
// never类型是任何类型的子类型，也可以赋值给任何类型
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
    return error('somthing error')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while(true) {}
}


// Object 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// 使用object类型，就可以更好的表示像Object.create这样的API。例如：
declare function create(o: object | null): void;

create({})
create(null)


// 类型断言
// 好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用

// first method: “尖括号”语法
let strVal: any = 'one two'
let strLength: number = (<string> strVal).length

// second method: as语法
let strLength1: number = (strVal as string).length

// 然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。



