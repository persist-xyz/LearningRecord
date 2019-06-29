/**
 * 根据Promise/A+规范，实现自己的Promise
 */

const PENDING = 'pending'
const FULFILLED = 'fulFilled'
const REJECTED = 'rejected'

const Promise = function (excutor) {
    const that = this
    that.state = PENDING
    that.value = undefined
    that.reason = undefined
    // 存储fulFilled状态对应的onFulfilled函数
    that.onFulfilledCallbacks = []
    // 存储rejected状态对应的onRejected函数
    that.onRejectedCallbacks = []

    // 成功时的回调
    function resolve (value) {
        if (value instanceof Promise) {
            return value.then(resolve, rejected)
        }

        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = FULFILLED
                that.value = value
                that.onFulfilledCallbacks.forEach(cb => cb(that.value))
            }
        })
    }

    //失败时的回调
    function rejected (reason) {
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = REJECTED
                that.reason = reason
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

Promise.prototype.then = function () {

}


Promise.resolve = function () {

}

Promise.rejected = function () {

}


Promise.all = function () {

}

Promise.race = function () {
    
}


