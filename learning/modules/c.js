
let a = require('./a.js')
let b = require('./b.js')

console.log('c.js-1', '执行完毕', a.done, b.done)


/*  
b.js-1 false
b.js-2 执行完毕
a.js-1 true
a.js-2 执行完毕
c.js-1 执行完毕 true true 
*/