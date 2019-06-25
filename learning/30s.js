
class My30s {
    constructor () {

    }
}



/**
 * 给定一个 key 和一个 set 作为参数，给定上下文时调用它们。主要用于函数组合。
 * 使用闭包以存储的参数调用存储的 key 
 * @param {*} key 
 * @param  {...any} args 
 */

const call = (key, ...args) => context => context[key](...args);

