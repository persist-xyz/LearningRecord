### 前言 

网上有太多的文章来一步步的介绍该如何实现符合规范的Promise源码了

但是呢

不管看多少篇、多少遍，真的不如自己对照规范一行一行手动敲一遍来的实在～   😂😂😂



### 参考

阮一峰老师的文章  [ Promise对象](http://es6.ruanyifeng.com/#docs/promise)

[Promises/A+规范原文](https://promisesaplus.com/)

[【翻译】Promises/A+规范](http://www.ituring.com.cn/article/66566)



### 完整版

```javascript
/**
 * 根据Promise/A+规范，实现自己的Promise
 * 
 * Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 then 方法，
 * 该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因。
 * 
 * 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）
 * 并且只能由Pending -> Fulfilled 或者 Pending -> Rejected，且必须拥有一个不可变的终值或拒因
 * 
 * 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因。
 */

const PENDING = 'pending'
const FULFILLED = 'fulFilled'
const REJECTED = 'rejected'

function Promise (excutor) {
    const that = this
    that.status = PENDING
    that.value = undefined
    that.reason = undefined
    // 存储fulFilled状态对应的onFulfilled函数
    that.onFulfilledCallbacks = []
    // 存储rejected状态对应的onRejected函数
    that.onRejectedCallbacks = []

    /**
     * @param {*} value 成功态接收的终值
     * 
     * 为什么resolve 加setTimeout?
     * 一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行 
     * (且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
     * 
     * 二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 
     * 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected
     * 
     * onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值），且只允许在执行环境堆栈仅包含平台代码时运行
     * 对应规范中 2.2.4 
     * 
     * 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 
     * 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
     */
    function resolve (value) {
        // 解决resolve方法嵌套返回promise的问题
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (that.status === PENDING) {
                // 只能由 pending -> fulfilled状态 (避免调用多次resolve reject)
                that.status = FULFILLED
                that.value = value
                // 分别执行成功状态订阅器中的回调方法
                that.onFulfilledCallbacks.forEach(cb => cb(that.value))
            }
        })
    }

    /**
     * 为什么reject中不用判断reason类型？
     * @param {*} reason 失败态接收到拒因
     */
    function reject (reason) {
        setTimeout(() => {
            if (that.status === PENDING) {
                // 只能由 pending -> rejected状态 (避免调用多次resolve reject)
                that.status = REJECTED
                that.reason = reason
                // 分别执行订失败状态阅器中的回调方法
                that.onRejectedCallbacks.forEach(cb => cb(that.reason))
            }
        })
    }

    // 捕获excutor执行器中的异常
    try{
        excutor(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

/**
 * 注册fulfilled状态/rejected状态的回调函数
 * @param {Function} onFulfilled    fulfilled状态执行的函数
 * @param {Function} onRejected    rejected状态执行的函数
 * @returns {Function} newPromise   返回一个新的promised
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
    /**
     * 处理参数默认值，保证后续可以继续执行
     * 对应规范中 2.2.1 如果 onFulfilled / onRejected 不是函数，其必须被忽略
     * 
     */
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason;
    };
    
    /**
     * then里面的FULFILLED/REJECTED状态时, 为什么要加setTimeout?
     * 
     */
    let that = this
    let promise2
    if (that.status === FULFILLED) {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onFulfilled(that.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    if (that.status === REJECTED) {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onRejected(that.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    } 
    
    if (that.status === PENDING) {
        // 这里是为了解决异步的问题，采用发布订阅的方式，下面两个数组分别存储成功和失败的回调
        // 返回一个Promise是为了解决可以链式调用的问题

        return promise2 = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value)
                    // 解析promise流程
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })

            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason)
                    // 解析promise流程
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })

        })
    }
}

function resolvePromise (promise2, x, resolve, reject) {
    // console.log(this)
    // 如果 promise 和 x 指向同一对象，会导致循环引用报错，So 以 TypeError 为据因拒绝执行 promise
    // 对应规范中 2.3.1
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }
    // promise2是否已经resolve或者reject，避免重复调用
    let called = false
    // 如果x是一个promise对象，继续resolve
    // 对应规范中 2.3.2
    if (x instanceof Promise) {
        // 如果是等待状态，则需要保持等待态直至 x 被执行 / 被拒绝，并解析y值
        // 对应规范中 2.3.2.1
        if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else {
            // 如果x已经处于执行态 / 拒绝态，则用相同的值 / 拒因 执行promise
            // 对应规范中 2.3.2.2 和 2.3.2.3
            x.then(resolve, reject)
        }
        // 如果 x 为对象或者函数
        // 对应规范中 2.3.3
    } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            /**
             * 这步我们先是存储了一个指向 x.then 的引用，然后测试并调用该引用，以避免多次访问 x.then 属性。
             * 这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。
             * 对应规范中 2.3.3.1
             */
            let then = x.then

            /**
             * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
             * 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
             * 对应规范中 2.3.3.3
             */
            if (typeof then === 'function') {
                then.call(x, y => {
                    /**
                     * 如果 resolvePromise 和 rejectPromise 均被调用，
                     * 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                     * 对应规范中 2.3.3.3.3
                     */
                    if (called) return
                    called = true

                    // 对应规范中 2.3.3.3.1
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true

                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    // 对应规范中 2.3.3.3.2
                    reject(reason)
                })
            } else {
                // 如果 then 不是函数，以 x 为参数执行 promise
                // 对应规范中 2.3.3.4
                resolve(x)
            }
        } catch (e) {
            // 如果调用 then 方法抛出了异常 e
            // 对应规范中 2.3.3.3.4

            // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
            // 对应规范中 2.3.3.3.4.1
            if (called) return
            called = true

            // 否则以 e 为据因拒绝 promise
            // 对应规范中 2.3.3.3.4.2
            reject(e)
        }
    } else {
        // 如果 then 不是函数，是一个普通的值，以 x 为参数执行 promise
        // 对应规范中 2.3.4
        resolve(x)
    }
}

```



### 测试

```javascript
// 在promise实现的代码中，增加以下执行测试用例需要用到的代码
Promise.deferred = function() {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

try {
    module.exports = Promise
} catch (e) {
    console.log(e, '---')
}
```

---

```javascript
// 安装测试脚本
npm i -g promises-aplus-tests

// 测试命令
promises-aplus-tests Promise.js

// 872 passing
```



### Promise其他方法

```javascript
// 立刻返回一个promise，一般用于没有promise对象，需要将一个东西，转为promise
Promise.resolve = function (data) {
    return new Promise(resolve => {
        resolve(data)
    })
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}


// 接收一个promise数组，全部成功之后才往下执行，并返回一个promise
Promise.all = function (promiseArray) {
    return new Promise((resolve, reject) => {
        let resolveArr = []
        promiseArray.forEach(item => {
            item.then(data => {
                resolveArr.push(data)
                console.log(data, '---data')
                if (promiseArray.length === resolveArr.length) {
                    resolve(resolveArr)
                }
            }, reason => {
                reject(reason)
            })
        })
    })
}


// 接收一个promise数组，只要有一个先返回，无论是resolve还是reject，都会往下执行then中的成功或者失败回调，
// 其他的promise也会继续执行，但是不会使用结果
Promise.race = function (promiseArray) {
    return new Promise((resolve, reject) => {
        promiseArray.forEach(item => {
            item.then(data => {
                resolve(data)
            }, reason => {
                reject(reason)
            })
        })
    })
}


// 用于捕获错误的回调，即第一个resolve参数为null的特殊then方法
Promise.prototype.catch = function (reject) {
    return this.then(null, reject)
}


// 无论前面执行结果状态，都会进入该方法中，且会将值原封不动的传给后面的then
Promise.prototype.finally = function (callback) {
    return this.then(value => {
        return new Promise(callback()).then(() => {
            return value
        })
    }, reason => {
        return new Promise(callback()).then(() => {
            throw reason
        })
    })
}

```















