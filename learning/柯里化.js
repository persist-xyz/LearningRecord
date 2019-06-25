
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






























