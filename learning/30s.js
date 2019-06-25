
class My30s = {
    constructor: {}
}




/**
 * 给定一个 key 和一个 set 作为参数，给定上下文时调用它们。主要用于函数组合。
 * 使用闭包以存储的参数调用存储的 key 
 * @param {*} key 
 * @param  {...any} args 
 */

const call = (key, ...args) => context => context[key](...args);



/**
 * Proxy
 */
var p = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}`)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receive) {
        console.log(`setting ${key} ${value}`)
        return Reflect.set(target, key, value, receive)
    }
})
p.name = 'xyz'

console.log('------')


/**
 * Generator
 * @param {*} x 
 */
function *foo (x) {
    yield(x + 1)
    yield(x + 3)
    return 99
}

let it = foo(1)
console.log(it)  // Object [Generator] {}

console.log(it.next(2))
console.log(it.next(3))
console.log(it.next(4))



console.log('------')

/**
 * 函数柯里化
 * @param {*} a 
 */
function add (a) {
    let x = a + 4
    return function(b) {
        return x + b
    }
}

let a1 = add(1)
let a2 = a1(2)
console.log(a1)
console.log(a2)

console.log(add(1, 3))



console.log('------')






























