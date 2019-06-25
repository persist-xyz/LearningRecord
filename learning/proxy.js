
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


