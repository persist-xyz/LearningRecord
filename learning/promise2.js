/**
 * practice promise
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (excutor) {
    const that = this
    that.status = PENDING
    that.value = undefined
    that.reason = undefined
    that.onFulfilledCallBacks = []
    that.onRejectedCallBacks = []

    function resolve (value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (that.status === PENDING) {
                that.status = FULFILLED
                that.value = value
                that.onFulfilledCallBacks.forEach(cb => cb(that.value))
            }
        })
    }

    function reject (reason) {
        setTimeout(() => {
            if (that.status === PENDING) {
                that.status = REJECTED
                that.reason = reason
                that.onRejectedCallBacks.forEach(cb => cb(that.reason))
            }
        })
    }

    try {
        excutor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
    }

    let that = this
    let promise2
    if (that.status === FULFILLED) {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(that.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (that.status === REJECTED) {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            
        })
    }

    if (that.status === PENDING) {
        return promise2 = new Promise((resolve, reject) => {
            that.onFulfilledCallBacks.push((value) => {
                try {
                    let x = onFulfilled(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })

            that.onRejectedCallBacks.push((reason) => {
                try {
                    let x = onRejected(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })

        })
    }

}

function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环'))
    }

    let called = false
    if (x instanceof Promise) {
        if (x.status === PENDING) {
            x.then((y) => {
                resolvePromise(promise2, y, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else {
            x.then(resolve, reject)
        }
    } else if (x !== null && ((typeof x === 'function') || (typeof x === 'object'))) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true

                    resolvePromise(promise2, y, resolve, reject)
                }, (reason) => {
                    if (called) return
                    called = true

                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true

            reject(e)
        }
    } else {
        resolve(x)
    }
}


Promise.resolve = function (data) {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

Promise.catch = function (reject) {
    return this.then(null, reject)
}

Promise.all = function (arrPre) {
    return new Promise((resolve, reject) => {
        let resolveArr = []
        arrPre.forEach(arr => {
            arr.then(data => {
                resolveArr.push(data)
                if (arrPre.length === resolveArr.length) {
                    resolve(data)
                }
            }, reason => {
                reject(reason)
            })
        })
    })
}

Promise.race = function (arrPre) {
    return new Promise((resolve, reject) => {
        arrPre.forEach(arr => {
            arr.then(data => {
                resolve(data)
            }, reason => {
                reject(reason)
            })
        })
    })
}

Promise.finally = function (callback) {
    return this.than(value => {
        return new Promise(callback()).then(() => {
            return value
        })
    }, reason => {
        return new Promise(callback()).then(() => {
            throw reason
        })
    })
}
