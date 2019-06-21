
// AMD 异步模块定义
// AMD规范是非同步加载模块，允许指定回调函数

// 是 RequireJS 在推广过程中对模块定义的规范化产出，是在浏览器端模块化开发的规范
// 特点 ：异步加载，不阻塞页面加载，能并行加载多个模块，但是不能按需加载，必须提前加载所需依赖
// AMD是提前执行，推崇依赖前置

// 重要的两个API
// define(id?,[]?,callbakc) 定义声明模块  （模块id标识(可选)，数组 依赖的其他模块（可选），回调函数）
// require([module],callback)   加载模块    （数组 指定加载的模块，回调函数）

// 配置属性API require.config()  
// 主入口index.js
require.config({
    baseUrl: '',
    map: {},
    paths: {
        "jquery": "../js/jquery-1.11.1.min",
        "validate": "../js/jquery.validate.min",
        "moduleTest":"test" //自定义AMD 模式的模块
    },   // 对外加载的模块名称
    shim: {
        'jquery.validate': ['jquery'],  // 配置 jquery 依赖
        'validate.form': ['jquery', 'validate']
    }  // 配置非AMD模式的文件
})

// 单个模块 test.js 
define([
    'jquery',
    'validate'
], function(_, _validate) {
    console.log(_)
    return {
        add: function (x, y) {
            return x + y
        }
    }
})

// 加载test模块
require(['moduleTest'], function(test) {
    // 依赖前置 就是依赖必须一开始就写好，即使在最后用到
    // …… doSomething()
    test.add(1, 2)
})



// CMD 可按需加载，不需要开始就加载所有的模块，一个模块就是一个JS文件
// 是 Sea.js 在推广过程中对模块定义的规范化产出，是在浏览器端模块化开发的规范
// CMD是延迟执行 推崇依赖就近

define(function(require, exports, module) {
    let a = require('../a')
    a.doSomething()

    // 依赖就近 就是在使用前一步引入就可以
    let b = require('../b')
    b.doSomething()
})



// CommonJS规范加载模块是同步的，必须先加载完成，才能执行后面的操场

// 注：由于Node.js主要用于服务器编程，文件都在本地，加载都比较快，一般不用考虑非同步的情况，所以CommonJS规范比较适合
// 而在浏览器端，要从服务器加载模块，就必须采用非同步方式，因此一般使用AMD/CMD规范





// CommonJS规范

// 每个文件就是一个模块，有自己的作用域。每个模块内部，module变量代表当前模块，是一个对象，它的exports属性（即module.exports）是对外的接口
// module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量

// 为了方便，Node为每个模块提供一个exports变量，指向module.exports
let exports = module.exports

// require命令用于加载模块文件


// 由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
// 使用require多次加载同一个模块时，只会在加载第一次时执行一次，后面再加载，都是直接取第一次运行的结果，除非手动清除系统缓存
// 循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出


// 模块导出
// 不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系
// 如果一个模块的对外接口，就是一个单一的值，不能使用exports输出，只能使用module.exports输出。

// foo.js

// 一个个导出
let a = 'xyz'
module.exports.foo = function () {}
module.exports.a = a

// 整体导出
module.exports = {
    foo: function () {},
    a: a
}






// ES6的module规范
// 可以取代 CommonJS 和 AMD规范，成为浏览器和服务器通用的模块解决方案
// 模块功能主要由两个命令构成：export 用于规定模块的对外接口 和 import 用于引入其他模块提供的功能

// ES6模块中的值都是只读的，即不允许修改import的值，包括基本数据类型和引用类型
// 输出的是值的引用，即原始值变化，import加载的值也会发生变化
// ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this

// export命令
// export.js
// 变量
export let a = 'xyz'
// 函数
export function fn () {}
// 类
export class class1 {}


// import 命令

// main.js
// 静态加载,只加载export.js 文件中两个变量，其他不加载
import {a, fn} from './export.js'

//import命令要使用as关键字，将输入的变量重命名。
import {fn as fn1} from './export.js'

// 整体加载
import * as all from './export.js'


// export default 命令
// 本质上，export default就是输出一个叫做default的变量或方法
// export-default.js

export default function foo() {}

// or
function foo() {
    console.log('foo');
}
export default foo



// 第一组
// crc32.js
export default function crc32(){}

// 导入crc32.js的默认导出
import crc32 from 'crc32'

///////

// 第二组
export function crc32() {}

// 导入crc32.js的命名导出
import {crc32} from 'crc32'

// 第一组是使用export default时，对应的import语句不需要使用大括号；
// 第二组是不使用export default时，对应的import语句需要使用大括号。










