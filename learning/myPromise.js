/**
 * 根据Promise/A+规范，实现自己的Promise
 */

const PENDING = 'pending'
const FULFILLED = 'fulFilled'
const REJECTED = 'rejected'

function Promise (excutor) {
    const that = this
    that.state = PENDING
    that.value = undefined
    that.reason = undefined
    // 存储fulFilled状态对应的onFulfilled函数
    that.onFulfilledCallbacks = []
    // 存储rejected状态对应的onRejected函数
    that.onRejectedCallbacks = []

    function resolve (value) {
        // 解决resolve方法嵌套返回promise的问题
        if (value instanceof Promise) {
            return value.then(resolve, rejected)
        }
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = FULFILLED
                that.value = value
                // 分别执行成功状态订阅器中的回调方法
                that.onFulfilledCallbacks.forEach(cb => cb(that.value))
            }
        })
    }

    function rejected (reason) {
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = REJECTED
                that.reason = reason
                // 分别执行订失败状态阅器中的回调方法
                that.onRejectedCallbacks.forEach(cb => cb(that.reason))
            }
        })
    }

    try{
        excutor(resolve, rejected)
    } catch (err) {
        rejected(err)
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
    }

    let promise2
    if (self.state === FULFILLED) {
        return promise2 = new Promise((resolve, rejected) => {
            setTimeout(() => {
                try{
                    let x = onFulfilled(self.value)
                    self.resolvePromise(promise2, x, resolve, rejected)
                } catch (err) {
                    rejected(err)
                }
            })
        })
    } else if (self.state === REJECTED) {
        return promise2 = new Promise((resolve, rejected) => {
            setTimeout(() => {
                try{
                    let x = onRejected(self.reason)
                    self.resolvePromise(promise2, x, resolve, rejected)
                } catch (err) {
                    rejected(err)
                }
            })
        })
    } else if (self.state === PENDING) {
        // 这里是为了解决异步的问题，采用发布订阅的方式，下面两个数组分别存储成功和失败的回调
        // 返回一个Promise是为了解决可以链式调用的问题

        return promise2 = new Promise((resolve, rejected) => {
            self.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value)
                    // 解析promise流程
                    self.resolvePromise(promise2, x, resolve, rejected)
                } catch (err) {
                    rejected(err)
                }
            })

            self.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason)
                    // 解析promise流程
                    self.resolvePromise(promise2, x, resolve, rejected)
                } catch (err) {
                    rejected(err)
                }
            })

        })
    }
}

function resolvePromise (promise2, x, resolve, rejected) {
    console.log(this)
    if (promise2 === x) {
        return rejected(new TypeError('循环引用'))
    }
    // promise2是否已经resolve或者rejected
    let called = false
    if (x instanceof Promise) {
        if (x.state === PENDING) {
            x.then(y => {
                this.resolvePromise(promise2, y, resolve, rejected)
            }, error => {
                rejected(error)
            })
        } else {
            x.then(resolve, rejected)
        }
    } else if (x) {
        if (x !== null && (typeof x === 'object') || typeof x === 'function') {
            try {
                let then = x.then
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return
                        called = true
                        this.resolvePromise(promise2, y, resolve, rejected)
                    }, err => {
                        if (called) return
                        called = true
                        rejected(err)
                    })
                } else {
                    // 到这里说明x不是一个thenable对象，可以直接当作值resolve promise2就可以
                    resolve(x)
                }
            } catch (err) {
                if (called) return
                called = true
                rejected(err)
            }
        }
    } else {
        // 如果X是一个普通的值，则用x的值去resolve promise2
        resolve(x)
    }
}

/* let a = true
new Promise((resolve, rejected) => {
    setTimeout(() => {
        if (a) {
            resolve('succ')
        } else {
            rejected('fail')
        }
    }, 1000)
}).then(res => {
    console.log(res)
}, err => {
    console.log(err)
}) */

// Promise.defer = Promise.deferred = function () {
//     let dfd = {};
//     dfd.promise = new Promise((resolve, reject) => {
//         dfd.resolve = resolve;
//         dfd.reject = reject;
//     });
//     return dfd;
// }

// 执行测试用例需要用到的代码
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


// 立刻返回一个promise，一般用于
Promise.resolve = function (data) {
    return new Promise(resolve => {
        resolve(data)
    })
}

Promise.rejected = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

// 接收一个promise数组，全部成功之后才往下执行，并返回一个promise
Promise.all = function (promiseArray) {
    return new Promise((resolve, rejected) => {
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

// 接收一个promise数组，只要有一个先返回，无论是resolve还是rejected，都会往下执行then中的成功或者失败回调，
// 其他的promise也会继续执行，但是不会使用结果
Promise.race = function (promiseArray) {
    return new Promise((resolve, rejected) => {
        promiseArray.forEach(item => {
            item.then(data => {
                resolve(data)
            }, reason => {
                rejected(reason)
            })
        })
    })
}

